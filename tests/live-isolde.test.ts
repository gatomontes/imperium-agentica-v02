import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it, vi } from "vitest";
import { IsoldeSecretariatOfficer } from "../src/isolde-secretariat-officer.js";
import { LocksmithOpenAIAccessPort, MasterMasonLiveIsoldeSession, openLocksmithDeepSeekAccess, openLocksmithLiveIsoldeAccess, openLocksmithOpenAIAccess, runLiveGuildhallBrainstorm } from "../src/openai-live-isolde.js";
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
    expect(Object.keys(access)).toEqual(["configured", "transportQuestion", "assessAnswer", "brainstormProfessions"]);
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

describe("DeepSeek live Isolde provider", () => {
  it("uses the selected DeepSeek profile without exposing its credential", async () => {
    const calls: Array<{ url: string; init?: RequestInit }> = [];
    const fakeFetch = vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
      calls.push({ url: String(input), init });
      const body = JSON.parse(String(init?.body)) as { messages: Array<{ role: string; content: string }>; response_format: unknown; thinking: unknown; tools?: unknown };
      const request = JSON.parse(body.messages[1].content) as { exact_castellan_question: string };
      expect(body.response_format).toEqual({ type: "json_object" });
      expect(body.thinking).toEqual({ type: "disabled" });
      expect(body.tools).toBeUndefined();
      return new Response(JSON.stringify({
        id: "deepseek-live-fixture",
        choices: [{ message: { content: JSON.stringify({ exact_question: request.exact_castellan_question }) } }],
      }), { status: 200, headers: { "Content-Type": "application/json" } });
    });
    const access = await openLocksmithDeepSeekAccess({ environment: { DEEPSEEK_API_KEY: "deepseek-fixture-secret" }, fetchImplementation: fakeFetch });
    const session = new MasterMasonLiveIsoldeSession(access, new IsoldeSecretariatOfficer(), new RectorCastellanOfficer(noEvaluation));
    const result = await session.runOneQuestion("operator@1", "Build a test mission", "deepseek-live-one");
    expect(result.provider).toBe("deepseek");
    expect(result.model).toBe("deepseek-v4-flash");
    expect(result.exactQuestion).toBe("What precise outcome should this mission accomplish?");
    expect(calls[0].url).toBe("https://api.deepseek.com/chat/completions");
    expect(calls[0].init?.headers).toMatchObject({ Authorization: "Bearer deepseek-fixture-secret" });
    expect(JSON.stringify(result)).not.toContain("deepseek-fixture-secret");
  });

  it("selects DeepSeek from local provider configuration", async () => {
    const directory = await mkdtemp(join(tmpdir(), "imperium-live-deepseek-"));
    await writeFile(join(directory, ".env.local"), "IMPERIUM_LIVE_PROVIDER=deepseek\nDEEPSEEK_API_KEY=fixture-secret\n", { mode: 0o600 });
    const access = await openLocksmithLiveIsoldeAccess({
      directory,
      environment: {},
      fetchImplementation: async () => new Response(JSON.stringify({ id: "fixture", choices: [{ message: { content: "{}" } }] }), { status: 200 }),
    });
    expect(access.configured).toBe(true);
    expect(JSON.stringify(access)).not.toContain("fixture-secret");
  });

  it("normalizes omitted empty Guildhall lists instead of crashing on trim", async () => {
    const access = await openLocksmithDeepSeekAccess({
      environment: { DEEPSEEK_API_KEY: "fixture-secret" },
      fetchImplementation: async () => new Response(JSON.stringify({
        id: "guildhall-shape-fixture",
        choices: [{ message: { content: JSON.stringify({ possibilities: [{ professionIdentity: "Audience Researcher", contribution: "identify pain points", rationale: "the mission studies an audience", collaborationMode: "INDEPENDENT" }] }) } }],
      }), { status: 200 }),
    });
    const result = await access.brainstormProfessions!({ correlationId: "shape", candidate: {} as never });
    expect(result.draft).toEqual({
      possibilities: [{ professionIdentity: "Audience Researcher", contribution: "identify pain points", rationale: "the mission studies an audience", collaborationMode: "INDEPENDENT", dependsOn: [] }],
      overlaps: [],
      missingSpecialties: [],
    });
  });

  it("reports malformed Guildhall content at the provider boundary", async () => {
    const access = await openLocksmithDeepSeekAccess({
      environment: { DEEPSEEK_API_KEY: "fixture-secret" },
      fetchImplementation: async () => new Response(JSON.stringify({ id: "bad-guildhall", choices: [{ message: { content: JSON.stringify({ possibilities: [{ professionIdentity: "Researcher" }] }) } }] }), { status: 200 }),
    });
    await expect(access.brainstormProfessions!({ correlationId: "bad-shape", candidate: {} as never })).rejects.toThrow("incomplete Guildhall profession possibility");
  });

  it("reports safe DeepSeek failure metadata without provider messages or credentials", async () => {
    const access = await openLocksmithDeepSeekAccess({
      environment: { DEEPSEEK_API_KEY: "fixture-secret" },
      fetchImplementation: async () => new Response(JSON.stringify({ error: { code: "insufficient_balance", message: "sensitive provider text" } }), { status: 402, headers: { "x-request-id": "req-safe" } }),
    });
    await expect(access.transportQuestion({ correlationId: "one", operatorText: "mission", exactCastellanQuestion: "Question?" }))
      .rejects.toThrow("DeepSeek transport failed (402; code=insufficient_balance; request_id=req-safe)");
  });
});

describe("live Isolde controlled reply loop", () => {
  function loopAccess(dispositions: Array<"RESOLVED" | "DECLARED_NONE" | "UNUSABLE"> = []): LocksmithOpenAIAccessPort {
    let assessment = 0;
    return {
      configured: true,
      async transportQuestion(request) { return { responseId: `q-${assessment}`, provider: "deepseek", model: "fixture-model", exactQuestion: request.exactCastellanQuestion }; },
      async assessAnswer(request) {
        const disposition = dispositions[assessment++] ?? (["constraints", "unknowns", "material_contradictions", "resource_requirements"].includes(request.predicate) ? "DECLARED_NONE" : "RESOLVED");
        return { responseId: `a-${assessment}`, provider: "deepseek", model: "fixture-model", draft: { determinations: [{ questionId: request.questionId, predicate: request.predicate, disposition, values: disposition === "RESOLVED" ? [request.rawAnswer] : [], rationale: "Exact bounded assessment.", sourceAnswerRef: request.sourceAnswerRef, evidence: [{ exactExcerpt: request.rawAnswer, derivation: "QUOTED", value: disposition === "RESOLVED" ? request.rawAnswer : undefined, rationale: "Exact Operator wording." }] }] } };
      },
    };
  }

  it("forms from clear intent without exposing the eight internal predicates as questions", async () => {
    const initialOnly: RectorCognitivePort = { assessMissionPredicates: () => { throw new Error("not used"); } };
    const session = new MasterMasonLiveIsoldeSession(loopAccess(), new IsoldeSecretariatOfficer(), new RectorCastellanOfficer(initialOnly));
    const questions: string[] = [];
    const intent = "Research the top ten audience pain points from YouTube comments";
    const result = await session.runConversation("operator@1", intent, "live-loop", async (question) => { questions.push(question); return "unexpected"; });
    expect(result.turns).toBe(0);
    expect(questions).toHaveLength(0);
    expect(result.dossier.payload.acceptedDeterminations).toHaveLength(0);
    expect(result.candidate).toMatchObject({ artifactType: "MissionSpecificationCandidate", payload: { state: "CANDIDATE", purpose: intent, requestedOutputs: [intent], unresolvedPredicates: expect.arrayContaining(["scope", "unknowns", "resource_requirements"]), authorityCreated: false } });
    expect(result.audit.filter((entry) => entry.stage === "CASTELLAN_EVALUATED")).toHaveLength(0);
    expect(result.audit.every((entry) => !entry.credentialExposedToIsolde && !entry.missionExecuted)).toBe(true);
  });

  it("keeps the exact Operator answer as evidence without asking the provider to reproduce it", async () => {
    const requests: Record<string, unknown>[] = [];
    const access = await openLocksmithDeepSeekAccess({
      environment: { DEEPSEEK_API_KEY: "fixture-secret" },
      fetchImplementation: async (_input, init) => {
        const body = JSON.parse(String(init?.body)) as Record<string, unknown>;
        requests.push(body);
        return new Response(JSON.stringify({ id: "assessment", choices: [{ message: { content: JSON.stringify({ disposition: "RESOLVED", rationale: "The answer directly states the requested outcome." }) } }] }), { status: 200 });
      },
    });
    const rawAnswer = "A list of the top 10 pain points of sadcore listeners in Youtube";
    const assessed = await access.assessAnswer({ correlationId: "evidence", questionId: "purpose", predicate: "purpose", exactQuestion: "What precise outcome should this mission accomplish?", rawAnswer, sourceAnswerRef: "answer@1" });
    expect(assessed.draft.determinations[0]).toMatchObject({ values: [rawAnswer], evidence: [{ exactExcerpt: rawAnswer, value: rawAnswer }] });
    const messages = requests[0].messages as Array<{ content: string }>;
    expect(messages[0].content).toContain("Imperium, not you, preserves the exact raw answer as evidence");
  });

  it("continues the formed candidate into bounded Guildhall profession brainstorming", async () => {
    const access: LocksmithOpenAIAccessPort = {
      configured: true,
      transportQuestion: async () => { throw new Error("not used"); },
      assessAnswer: async () => { throw new Error("not used"); },
      brainstormProfessions: async () => ({ responseId: "guildhall-1", provider: "deepseek", model: "fixture-model", draft: {
        possibilities: [
          { professionIdentity: "YouTube Comment Researcher", contribution: "collect comments", rationale: "source-specific collection", collaborationMode: "INDEPENDENT", dependsOn: [] },
          { professionIdentity: "Qualitative Data Analyst", contribution: "rank themes", rationale: "thematic analysis", collaborationMode: "SEQUENTIAL", dependsOn: ["YouTube Comment Researcher"] },
        ], overlaps: [], missingSpecialties: [],
      } }),
    };
    const session = new MasterMasonLiveIsoldeSession(access, new IsoldeSecretariatOfficer(), new RectorCastellanOfficer(noEvaluation));
    const intake = await session.runConversation("operator@1", "Research the top ten sadcore audience pain points from YouTube comments", "guildhall-live", async () => "unused");
    const guildhall = await runLiveGuildhallBrainstorm(access, intake.candidate);
    expect(guildhall.packet.payload.possibilities).toHaveLength(2);
    expect(guildhall.packet.payload).toMatchObject({ peopleSelected: false, operativesSelected: false, officersSelected: false });
  });
});
