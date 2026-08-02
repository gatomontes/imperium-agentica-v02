import { mkdtemp, readFile, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { inspectOpenAIKey, parseLocalEnvironment, storeOpenAIKey } from "../scripts/initial-setup.mjs";

describe("initial OpenAI setup", () => {
  it("reports process configuration without returning credential material", async () => {
    await expect(inspectOpenAIKey({ environment: { OPENAI_API_KEY: "fixture-secret" }, directory: "/missing" }))
      .resolves.toEqual({ configured: true, source: "process-environment" });
  });

  it("detects a local credential without returning it", async () => {
    const directory = await mkdtemp(join(tmpdir(), "imperium-setup-"));
    await writeFile(join(directory, ".env.local"), "OPENAI_API_KEY=fixture-secret\n", "utf8");
    await expect(inspectOpenAIKey({ environment: {}, directory }))
      .resolves.toEqual({ configured: true, source: "env-local" });
  });

  it("stores the credential locally with owner-only permissions and preserves other settings", async () => {
    const directory = await mkdtemp(join(tmpdir(), "imperium-setup-"));
    await writeFile(join(directory, ".env.local"), "EXISTING=value\nOPENAI_API_KEY=old-fixture\n", "utf8");
    await storeOpenAIKey("new-fixture", { directory });
    const path = join(directory, ".env.local");
    const contents = await readFile(path, "utf8");
    expect(parseLocalEnvironment(contents).get("EXISTING")).toBe("value");
    expect(parseLocalEnvironment(contents).get("OPENAI_API_KEY")).toBe("new-fixture");
    expect((await stat(path)).mode & 0o777).toBe(0o600);
  });

  it("rejects empty and multiline credential input", async () => {
    const directory = await mkdtemp(join(tmpdir(), "imperium-setup-"));
    await expect(storeOpenAIKey("", { directory })).rejects.toThrow("one non-empty line");
    await expect(storeOpenAIKey("first\nsecond", { directory })).rejects.toThrow("one non-empty line");
  });
});
