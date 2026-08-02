import { mkdtemp, readFile, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { DEEPSEEK_KEY_NAME, inspectOpenAIKey, inspectProviderKey, parseLocalEnvironment, runInitialSetup, selectProvider, storeOpenAIKey, storeProviderKey } from "../scripts/initial-setup.mjs";

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

describe("initial DeepSeek setup", () => {
  it("enumerates supported providers and accepts a numbered selection", async () => {
    let output = "";
    const provider = await selectProvider({
      readSelection: async (prompt) => {
        output += prompt;
        return "2";
      },
      write: (value) => { output += value; },
    });
    expect(provider).toBe("deepseek");
    expect(output).toContain("1) OpenAI API");
    expect(output).toContain("2) DeepSeek API");
  });

  it("does not silently default when provider selection is invalid", async () => {
    await expect(selectProvider({ readSelection: async () => "", write: () => undefined }))
      .rejects.toThrow("Provider selection must be 1");
  });

  it("detects DeepSeek without returning credential material", async () => {
    await expect(inspectProviderKey(DEEPSEEK_KEY_NAME, { environment: { DEEPSEEK_API_KEY: "fixture-secret" }, directory: "/missing" }))
      .resolves.toEqual({ configured: true, source: "process-environment" });
  });

  it("stores DeepSeek and selects it while preserving OpenAI", async () => {
    const directory = await mkdtemp(join(tmpdir(), "imperium-deepseek-setup-"));
    await writeFile(join(directory, ".env.local"), "OPENAI_API_KEY=openai-fixture\n", "utf8");
    await storeProviderKey(DEEPSEEK_KEY_NAME, "deepseek-fixture", { directory, provider: "deepseek" });
    const local = parseLocalEnvironment(await readFile(join(directory, ".env.local"), "utf8"));
    expect(local.get("OPENAI_API_KEY")).toBe("openai-fixture");
    expect(local.get("DEEPSEEK_API_KEY")).toBe("deepseek-fixture");
    expect(local.get("IMPERIUM_LIVE_PROVIDER")).toBe("deepseek");
  });

  it("selects an already-configured DeepSeek profile without rewriting its key", async () => {
    const directory = await mkdtemp(join(tmpdir(), "imperium-deepseek-select-"));
    await writeFile(join(directory, ".env.local"), "DEEPSEEK_API_KEY=deepseek-fixture\n", "utf8");
    await runInitialSetup({ directory, provider: "deepseek" });
    const local = parseLocalEnvironment(await readFile(join(directory, ".env.local"), "utf8"));
    expect(local.get("DEEPSEEK_API_KEY")).toBe("deepseek-fixture");
    expect(local.get("IMPERIUM_LIVE_PROVIDER")).toBe("deepseek");
  });

  it("uses the enumerated provider selection when no command-line provider is supplied", async () => {
    const directory = await mkdtemp(join(tmpdir(), "imperium-deepseek-choice-"));
    await writeFile(join(directory, ".env.local"), "DEEPSEEK_API_KEY=deepseek-fixture\n", "utf8");
    await runInitialSetup({ directory, chooseProvider: async () => "deepseek" });
    const local = parseLocalEnvironment(await readFile(join(directory, ".env.local"), "utf8"));
    expect(local.get("IMPERIUM_LIVE_PROVIDER")).toBe("deepseek");
  });
});
