import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it, vi } from "vitest";
import { IsoldeSecretariatOfficer } from "../src/isolde-secretariat-officer.js";
import { MasterMasonLiveIsoldeSession, openLocksmithOpenAIAccess } from "../src/openai-live-isolde.js";
import { RectorCastellanOfficer, RectorCognitivePort } from "../src/rector-castellan-officer.js";

const noEvaluation: RectorCognitivePort = { assessMissionPredicates: () => { throw new Error("response evaluation is outside this slice"); } };

function providerResponse(question: string, overrides: Record<string, unknown> = {}): Response {
  return new Response(JSON.stringify({ id: "resp_live_fixture", status: "completed", output: [{ type: "message", content: [{ type: "output_text", text: JSON.stringify({ exact_question: question }) }] }], ...overrides }), { status: 200, headers: { "Content-Type": "application/json" } });
}

describe("OpenAI live Isolde one-question slice", () => {
  it("keeps credential injection inside Locksmith and presents exactly one Castellan question", async () => {
    const calls: Array<{ url: string; init?: RequestInit }> = [];
    const fakeFetch = vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
      calls.push({ url: String(input), init });
      const body = JSON.parse(String(init?.body)) as { input: string; text: { format: { schema: { properties: { exact_question: { enum: string[] } } } } } };
      const question = body.text.format.schema.properties.exact_question.enum[0];
      expect(body.input).toContain("Build a test mission");
      return providerResponse(question);
    });
    const access = await openLocksmithOpenAIAccess({ environment: { OPENAI_API_KEY: "fixture-secret" }, fetchImplementation: fakeFetch, model: "fixture-model" });
    expect(Object.keys(access)).toEqual(["configured", "transportQuestion"]);
    const session = new MasterMasonLiveIsoldeSession(access, new IsoldeSecretariatOfficer(), new RectorCastellanOfficer(noEvaluation));
    const result = await session.runOneQuestion("operator@1", "Build a test mission", "live-one");
    expect(result.exactQuestion).toBe("What precise outcome should this mission accomplish?");
    expect(result.dossier.payload.presentedQuestions).toHaveLength(1);
    expect(result.dossier.payload.answers).toHaveLength(0);
    expect(result.audit.every((entry) => !entry.credentialExposedToIsolde && !entry.responseEvaluated && !entry.missionExecuted)).toBe(true);
    expect(JSON.stringify(result)).not.toContain("fixture-secret");
    expect(calls[0].init?.headers).toMatchObject({ Authorization: "Bearer fixture-secret" });
  });

  it("loads the local credential without returning it", async () => {
    const directory = await mkdtemp(join(tmpdir(), "imperium-live-isolde-"));
    const fixtureCredential = "local-fixture-secret";
    await writeFile(join(directory, ".env.local"), `OPENAI_API_KEY=${fixtureCredential}\n`, { mode: 0o600 });
    const access = await openLocksmithOpenAIAccess({ directory, environment: {}, fetchImplementation: async () => providerResponse("Question"), model: "fixture-model" });
    expect(access.configured).toBe(true);
    expect(JSON.stringify(access)).not.toContain("local-fixture-secret");
  });

  it("blocks the live session when no credential is configured", async () => {
    const directory = await mkdtemp(join(tmpdir(), "imperium-live-isolde-empty-"));
    await expect(openLocksmithOpenAIAccess({ directory, environment: {} })).rejects.toThrow("npm run setup");
  });

  it("refuses provider output that differs from Castellan's exact question", async () => {
    const access = await openLocksmithOpenAIAccess({ environment: { OPENAI_API_KEY: "fixture-secret" }, fetchImplementation: async () => providerResponse("rewritten question"), model: "fixture-model" });
    const session = new MasterMasonLiveIsoldeSession(access, new IsoldeSecretariatOfficer(), new RectorCastellanOfficer(noEvaluation));
    await expect(session.runOneQuestion("operator@1", "Build mission", "live-altered")).rejects.toThrow("altered the exact Castellan question");
  });

  it("sends no tools and disables provider-side response storage", async () => {
    const fakeFetch = vi.fn(async (_input: string | URL | Request, init?: RequestInit) => {
      const body = JSON.parse(String(init?.body)) as Record<string, unknown>;
      expect(body.store).toBe(false);
      expect(body.max_output_tokens).toBe(256);
      expect(body.tools).toBeUndefined();
      const schema = ((body.text as { format: { schema: { properties: { exact_question: { enum: string[] } } } } }).format.schema);
      return providerResponse(schema.properties.exact_question.enum[0]);
    });
    const access = await openLocksmithOpenAIAccess({ environment: { OPENAI_API_KEY: "fixture-secret" }, fetchImplementation: fakeFetch, model: "fixture-model" });
    const session = new MasterMasonLiveIsoldeSession(access, new IsoldeSecretariatOfficer(), new RectorCastellanOfficer(noEvaluation));
    await session.runOneQuestion("operator@1", "Build mission", "live-no-tools");
    expect(fakeFetch).toHaveBeenCalledOnce();
  });
});
