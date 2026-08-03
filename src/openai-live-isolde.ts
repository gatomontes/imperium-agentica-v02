import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { ArtifactEnvelope, GovernedArtifactEnvelope } from "./artifact.js";
import { IsoldeSecretariatOfficer } from "./isolde-secretariat-officer.js";
import { isoldeTransportInstructions } from "./isolde-agent-definition.js";
import { MissionSpecificationCandidate, PredicateDetermination } from "./castellan-mission-formation.js";
import { CastellanGuildhallRouter, GuildhallMissionCommittee, ProfessionAdjudicationDraft, ProfessionAdjudicationPacket, ProfessionBrainstormDraft, ProfessionRecommendationPacket } from "./guildhall-mission-committee.js";
import { RectorCastellanOfficer, RectorCognitiveDraft } from "./rector-castellan-officer.js";
import { rectorAssessmentInstructions } from "./rector-agent-definition.js";
import { CastellanInquiry, CastellanTurnDisposition, IsoldeQuestionPresentation, MissionDossier } from "./secretariat-mission-dossier.js";

export interface LiveIsoldeAuditEvent {
  stage: "LOCKSMITH_READY" | "MASTER_MASON_OPENED" | "ISOLDE_PRESENTED" | "CASTELLAN_EVALUATED" | "MISSION_INTAKE_COMPLETE" | "MASTER_MASON_CLOSED";
  correlationId: string;
  credentialPresent: boolean;
  credentialExposedToIsolde: false;
  providerCalled: boolean;
  missionExecuted: false;
  responseEvaluated: boolean;
}

export interface OpenAITransportRequest {
  correlationId: string;
  operatorText: string;
  exactCastellanQuestion: string;
}

export interface OpenAITransportResult {
  responseId: string;
  provider: "openai" | "deepseek";
  model: string;
  exactQuestion: string;
}

export interface LocksmithOpenAIAccessPort {
  readonly configured: true;
  transportQuestion(request: OpenAITransportRequest): Promise<OpenAITransportResult>;
  assessAnswer(request: LiveAnswerAssessmentRequest): Promise<LiveAnswerAssessmentResult>;
  brainstormProfessions?(request: LiveProfessionBrainstormRequest): Promise<LiveProfessionBrainstormResult>;
  adjudicateProfessions?(request: LiveProfessionAdjudicationRequest): Promise<LiveProfessionAdjudicationResult>;
}

export interface LiveProfessionBrainstormRequest { correlationId: string; candidate: MissionSpecificationCandidate; }
export interface LiveProfessionBrainstormResult { responseId: string; provider: "openai" | "deepseek"; model: string; draft: ProfessionBrainstormDraft; }
export interface LiveGuildhallResult { packet: ArtifactEnvelope<ProfessionRecommendationPacket>; provider: "openai" | "deepseek"; model: string; providerResponseId: string; }
export interface LiveProfessionAdjudicationRequest { correlationId: string; candidate: MissionSpecificationCandidate; recommendation: ProfessionRecommendationPacket; }
export interface LiveProfessionAdjudicationResult { responseId: string; provider: "openai" | "deepseek"; model: string; draft: ProfessionAdjudicationDraft; }
export interface LiveGuildhallAdjudicationResult { packet: ArtifactEnvelope<ProfessionAdjudicationPacket>; provider: "openai" | "deepseek"; model: string; providerResponseId: string; }

export interface LiveAnswerAssessmentRequest {
  correlationId: string;
  questionId: string;
  predicate: MissionDossier["presentedQuestions"][number]["predicate"];
  exactQuestion: string;
  rawAnswer: string;
  sourceAnswerRef: string;
}

export interface LiveAnswerAssessmentResult {
  responseId: string;
  provider: "openai" | "deepseek";
  model: string;
  draft: RectorCognitiveDraft;
}

export interface LiveIsoldeResult {
  dossier: GovernedArtifactEnvelope<MissionDossier>;
  inquiry: GovernedArtifactEnvelope<CastellanInquiry>;
  presentation: GovernedArtifactEnvelope<IsoldeQuestionPresentation>;
  exactQuestion: string;
  providerResponseId: string;
  provider: "openai" | "deepseek";
  model: string;
  audit: LiveIsoldeAuditEvent[];
}

export interface LiveIsoldeConversationResult {
  dossier: GovernedArtifactEnvelope<MissionDossier>;
  candidate: GovernedArtifactEnvelope<MissionSpecificationCandidate>;
  provider: "openai" | "deepseek";
  model: string;
  turns: number;
  audit: LiveIsoldeAuditEvent[];
}

type FetchLike = (input: string | URL | Request, init?: RequestInit) => Promise<Response>;

export async function openLocksmithOpenAIAccess({
  directory = process.cwd(),
  environment = process.env,
  fetchImplementation = fetch,
  model = environment.OPENAI_MODEL?.trim() || "gpt-5.6",
}: {
  directory?: string;
  environment?: NodeJS.ProcessEnv;
  fetchImplementation?: FetchLike;
  model?: string;
} = {}): Promise<LocksmithOpenAIAccessPort> {
  const credential = await readCredential(directory, environment);
  if (!credential) throw new Error("OpenAI credential is not configured; run npm run setup");

  return Object.freeze({
    configured: true as const,
    async transportQuestion(request: OpenAITransportRequest): Promise<OpenAITransportResult> {
      const response = await fetchImplementation("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: { Authorization: `Bearer ${credential}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          store: false,
          max_output_tokens: 256,
          instructions: isoldeTransportInstructions(),
          input: JSON.stringify({ operator_text: request.operatorText, exact_castellan_question: request.exactCastellanQuestion }),
          text: {
            format: {
              type: "json_schema",
              name: "isolde_exact_question_transport",
              strict: true,
              schema: {
                type: "object",
                properties: { exact_question: { type: "string", enum: [request.exactCastellanQuestion] } },
                required: ["exact_question"],
                additionalProperties: false,
              },
            },
          },
        }),
      });
      const payload = await response.json() as Record<string, unknown>;
      if (!response.ok) throw new Error(`OpenAI transport failed (${response.status})`);
      if (payload.status !== "completed") throw new Error("OpenAI transport did not complete");
      const outputText = extractOutputText(payload);
      const parsed = JSON.parse(outputText) as { exact_question?: unknown };
      if (parsed.exact_question !== request.exactCastellanQuestion) throw new Error("OpenAI altered the exact Castellan question");
      if (typeof payload.id !== "string" || !payload.id.trim()) throw new Error("OpenAI response identity is missing");
      return { responseId: payload.id, provider: "openai", model, exactQuestion: parsed.exact_question };
    },
    async assessAnswer(request: LiveAnswerAssessmentRequest): Promise<LiveAnswerAssessmentResult> {
      const response = await fetchImplementation("https://api.openai.com/v1/responses", {
        method: "POST", headers: { Authorization: `Bearer ${credential}`, "Content-Type": "application/json" },
        body: JSON.stringify({ model, store: false, max_output_tokens: 512, instructions: assessmentInstructions(), input: JSON.stringify(request), text: { format: { type: "json_schema", name: "rector_predicate_assessment", strict: true, schema: assessmentSchema() } } }),
      });
      const payload = await response.json() as Record<string, unknown>;
      if (!response.ok) throw providerFailure("OpenAI", response, payload);
      if (payload.status !== "completed") throw new Error("OpenAI assessment did not complete");
      return assessmentResult(payload.id, extractOutputText(payload), "openai", model, request);
    },
    async brainstormProfessions(request: LiveProfessionBrainstormRequest): Promise<LiveProfessionBrainstormResult> {
      const response = await fetchImplementation("https://api.openai.com/v1/responses", {
        method: "POST", headers: { Authorization: `Bearer ${credential}`, "Content-Type": "application/json" },
        body: JSON.stringify({ model, store: false, max_output_tokens: 1600, instructions: professionBrainstormInstructions(), input: JSON.stringify(request.candidate), text: { format: { type: "json_schema", name: "guildhall_profession_brainstorm", strict: true, schema: professionBrainstormSchema() } } }),
      });
      const payload = await response.json() as Record<string, unknown>;
      if (!response.ok) throw providerFailure("OpenAI", response, payload);
      if (payload.status !== "completed") throw new Error("OpenAI Guildhall brainstorm did not complete");
      return { responseId: responseId(payload), provider: "openai", model, draft: parseProfessionBrainstorm(extractOutputText(payload), "OpenAI") };
    },
    async adjudicateProfessions(request: LiveProfessionAdjudicationRequest): Promise<LiveProfessionAdjudicationResult> {
      const response = await fetchImplementation("https://api.openai.com/v1/responses", {
        method: "POST", headers: { Authorization: `Bearer ${credential}`, "Content-Type": "application/json" },
        body: JSON.stringify({ model, store: false, max_output_tokens: 2400, instructions: professionAdjudicationInstructions(), input: JSON.stringify({ candidate: request.candidate, recommendation: request.recommendation }), text: { format: { type: "json_schema", name: "guildhall_profession_adjudication", strict: true, schema: professionAdjudicationSchema() } } }),
      });
      const payload = await response.json() as Record<string, unknown>;
      if (!response.ok) throw providerFailure("OpenAI", response, payload);
      if (payload.status !== "completed") throw new Error("OpenAI Guildhall adjudication did not complete");
      return { responseId: responseId(payload), provider: "openai", model, draft: parseProfessionAdjudication(extractOutputText(payload), "OpenAI") };
    },
  });
}

export async function openLocksmithDeepSeekAccess({
  directory = process.cwd(),
  environment = process.env,
  fetchImplementation = fetch,
  model = environment.DEEPSEEK_MODEL?.trim() || "deepseek-v4-flash",
}: {
  directory?: string;
  environment?: NodeJS.ProcessEnv;
  fetchImplementation?: FetchLike;
  model?: string;
} = {}): Promise<LocksmithOpenAIAccessPort> {
  const credential = await readCredential(directory, environment, "DEEPSEEK_API_KEY");
  if (!credential) throw new Error("DeepSeek credential is not configured; run npm run setup -- deepseek");

  return Object.freeze({
    configured: true as const,
    async transportQuestion(request: OpenAITransportRequest): Promise<OpenAITransportResult> {
      const response = await fetchImplementation("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${credential}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: "system",
              content: isoldeTransportInstructions() + " Return JSON only, exactly in this form: {\"exact_question\":\"the exact Castellan question\"}.",
            },
            {
              role: "user",
              content: JSON.stringify({ operator_text: request.operatorText, exact_castellan_question: request.exactCastellanQuestion }),
            },
          ],
          thinking: { type: "disabled" },
          temperature: 0,
          max_tokens: 256,
          response_format: { type: "json_object" },
        }),
      });
      const payload = await response.json() as Record<string, unknown>;
      if (!response.ok) throw providerFailure("DeepSeek", response, payload);
      const choice = Array.isArray(payload.choices) ? payload.choices[0] : undefined;
      const message = choice && typeof choice === "object" ? (choice as { message?: unknown }).message : undefined;
      const content = message && typeof message === "object" ? (message as { content?: unknown }).content : undefined;
      if (typeof content !== "string" || !content.trim()) throw new Error("DeepSeek response has no text output");
      const parsed = JSON.parse(content) as { exact_question?: unknown };
      if (parsed.exact_question !== request.exactCastellanQuestion) throw new Error("DeepSeek altered the exact Castellan question");
      if (typeof payload.id !== "string" || !payload.id.trim()) throw new Error("DeepSeek response identity is missing");
      return { responseId: payload.id, provider: "deepseek", model, exactQuestion: parsed.exact_question };
    },
    async assessAnswer(request: LiveAnswerAssessmentRequest): Promise<LiveAnswerAssessmentResult> {
      const response = await fetchImplementation("https://api.deepseek.com/chat/completions", {
        method: "POST", headers: { Authorization: `Bearer ${credential}`, "Content-Type": "application/json" },
        body: JSON.stringify({ model, messages: [{ role: "system", content: assessmentInstructions() }, { role: "user", content: JSON.stringify(request) }], thinking: { type: "disabled" }, temperature: 0, max_tokens: 512, response_format: { type: "json_object" } }),
      });
      const payload = await response.json() as Record<string, unknown>;
      if (!response.ok) throw providerFailure("DeepSeek", response, payload);
      const content = deepSeekContent(payload);
      return assessmentResult(payload.id, content, "deepseek", model, request);
    },
    async brainstormProfessions(request: LiveProfessionBrainstormRequest): Promise<LiveProfessionBrainstormResult> {
      let repairEmptyResult = false;
      for (let attempt = 0; attempt < 2; attempt++) {
        const messages = [
          { role: "system", content: professionBrainstormInstructions() },
          { role: "user", content: JSON.stringify(request.candidate) },
        ];
        if (repairEmptyResult) messages.push({ role: "user", content: "Your previous response violated the Guildhall contract because possibilities was empty. Return 1 to 8 concrete profession possibilities for this admitted brainstorm. Do not abstain and do not return an empty list." });
        const response = await fetchImplementation("https://api.deepseek.com/chat/completions", {
          method: "POST", headers: { Authorization: `Bearer ${credential}`, "Content-Type": "application/json" },
          body: JSON.stringify({ model, messages, thinking: { type: "disabled" }, temperature: 0.2, max_tokens: 1600, response_format: { type: "json_object" } }),
        });
        const payload = await response.json() as Record<string, unknown>;
        if (!response.ok) throw providerFailure("DeepSeek", response, payload);
        const draft = parseProfessionBrainstorm(deepSeekContent(payload), "DeepSeek");
        if (draft.possibilities.length > 0) return { responseId: responseId(payload), provider: "deepseek", model, draft };
        repairEmptyResult = true;
      }
      throw new Error("DeepSeek Guildhall brainstorm returned no profession possibilities after one bounded repair attempt");
    },
    async adjudicateProfessions(request: LiveProfessionAdjudicationRequest): Promise<LiveProfessionAdjudicationResult> {
      const response = await fetchImplementation("https://api.deepseek.com/chat/completions", {
        method: "POST", headers: { Authorization: `Bearer ${credential}`, "Content-Type": "application/json" },
        body: JSON.stringify({ model, messages: [{ role: "system", content: professionAdjudicationInstructions() }, { role: "user", content: JSON.stringify({ candidate: request.candidate, recommendation: request.recommendation }) }], thinking: { type: "disabled" }, temperature: 0, max_tokens: 2400, response_format: { type: "json_object" } }),
      });
      const payload = await response.json() as Record<string, unknown>;
      if (!response.ok) throw providerFailure("DeepSeek", response, payload);
      return { responseId: responseId(payload), provider: "deepseek", model, draft: parseProfessionAdjudication(deepSeekContent(payload), "DeepSeek") };
    },
  });
}

export async function runLiveGuildhallBrainstorm(access: LocksmithOpenAIAccessPort, candidate: GovernedArtifactEnvelope<MissionSpecificationCandidate>): Promise<LiveGuildhallResult> {
  if (!access.brainstormProfessions) throw new Error("Locksmith provider does not expose the bounded Guildhall brainstorm port");
  const handoff = new CastellanGuildhallRouter().handoff(candidate);
  const result = await access.brainstormProfessions({ correlationId: candidate.correlationId, candidate: structuredClone(candidate.payload) });
  const packet = new GuildhallMissionCommittee().recordBrainstorm(candidate, handoff, result.draft);
  return { packet, provider: result.provider, model: result.model, providerResponseId: result.responseId };
}

export async function runLiveGuildhallAdjudication(access: LocksmithOpenAIAccessPort, candidate: GovernedArtifactEnvelope<MissionSpecificationCandidate>, recommendation: ArtifactEnvelope<ProfessionRecommendationPacket>): Promise<LiveGuildhallAdjudicationResult> {
  if (!access.adjudicateProfessions) throw new Error("Locksmith provider does not expose the bounded Guildhall adjudication port");
  const result = await access.adjudicateProfessions({ correlationId: candidate.correlationId, candidate: structuredClone(candidate.payload), recommendation: structuredClone(recommendation.payload) });
  const packet = new GuildhallMissionCommittee().adjudicate(candidate, recommendation, result.draft);
  return { packet, provider: result.provider, model: result.model, providerResponseId: result.responseId };
}

export async function openLocksmithLiveIsoldeAccess(options: {
  directory?: string;
  environment?: NodeJS.ProcessEnv;
  fetchImplementation?: FetchLike;
} = {}): Promise<LocksmithOpenAIAccessPort> {
  const directory = options.directory ?? process.cwd();
  const environment = options.environment ?? process.env;
  const provider = (environment.IMPERIUM_LIVE_PROVIDER?.trim().toLowerCase()
    || await readSetting(directory, "IMPERIUM_LIVE_PROVIDER")) ?? "openai";
  if (provider === "deepseek") return openLocksmithDeepSeekAccess({ ...options, directory, environment });
  if (provider === "openai") return openLocksmithOpenAIAccess({ ...options, directory, environment });
  throw new Error(`Unsupported live provider: ${provider}`);
}

export class MasterMasonLiveIsoldeSession {
  constructor(
    private readonly access: LocksmithOpenAIAccessPort,
    private readonly isolde: IsoldeSecretariatOfficer,
    private readonly rector: RectorCastellanOfficer,
  ) {}

  async runOneQuestion(operatorRef: string, operatorText: string, correlationId: string): Promise<LiveIsoldeResult> {
    if (!operatorRef.trim() || !operatorText.trim() || !correlationId.trim()) throw new Error("one authenticated Operator input and correlation identity are required");
    const audit: LiveIsoldeAuditEvent[] = [event("LOCKSMITH_READY", correlationId, true, false)];
    audit.push(event("MASTER_MASON_OPENED", correlationId, true, false));
    const dossier = this.isolde.openMission(operatorRef, operatorText, correlationId);
    const evaluated = this.rector.initiateInquiry(dossier);
    if (evaluated.artifactType !== "CastellanInquiry") throw new Error("bounded live slice requires exactly one Castellan inquiry");
    const inquiry = evaluated as GovernedArtifactEnvelope<CastellanInquiry>;
    const transported = await this.access.transportQuestion({ correlationId, operatorText, exactCastellanQuestion: inquiry.payload.question.exactQuestion });
    const presented = this.isolde.presentQuestion(dossier, inquiry);
    if (presented.presentation.payload.exactQuestion !== transported.exactQuestion) throw new Error("Isolde presentation diverged from Castellan inquiry");
    audit.push(event("ISOLDE_PRESENTED", correlationId, true, true));
    audit.push(event("MASTER_MASON_CLOSED", correlationId, true, true));
    return { dossier: presented.dossier, inquiry, presentation: presented.presentation, exactQuestion: transported.exactQuestion, providerResponseId: transported.responseId, provider: transported.provider, model: transported.model, audit };
  }

  async runConversation(operatorRef: string, operatorText: string, correlationId: string, receiveAnswer: (question: string) => Promise<string>): Promise<LiveIsoldeConversationResult> {
    if (!operatorRef.trim() || !operatorText.trim() || !correlationId.trim()) throw new Error("one authenticated Operator input and correlation identity are required");
    const audit: LiveIsoldeAuditEvent[] = [event("LOCKSMITH_READY", correlationId, true, false), event("MASTER_MASON_OPENED", correlationId, true, false)];
    let dossier = this.isolde.openMission(operatorRef, operatorText, correlationId);
    let turns = 0;
    let provider: "openai" | "deepseek" | undefined;
    let model: string | undefined;
    while (true) {
      const next = turns === 0 ? this.rector.formFromAuthenticatedIntent(dossier) : this.rector.initiateInquiry(dossier);
      if (next.artifactType === "MissionSpecificationCandidate") {
        audit.push(event("MISSION_INTAKE_COMPLETE", correlationId, true, provider !== undefined, turns > 0));
        audit.push(event("MASTER_MASON_CLOSED", correlationId, true, provider !== undefined, turns > 0));
        return { dossier, candidate: next as GovernedArtifactEnvelope<MissionSpecificationCandidate>, provider: provider ?? "deepseek", model: model ?? "not-invoked", turns, audit };
      }
      if (next.artifactType !== "CastellanInquiry") throw new Error("Castellan returned an invalid conversation state");
      const inquiry = next as GovernedArtifactEnvelope<CastellanInquiry>;
      const transported = await this.access.transportQuestion({ correlationId, operatorText, exactCastellanQuestion: inquiry.payload.question.exactQuestion });
      provider = transported.provider; model = transported.model;
      const presented = this.isolde.presentQuestion(dossier, inquiry);
      dossier = presented.dossier; turns++;
      audit.push(event("ISOLDE_PRESENTED", correlationId, true, true));
      const rawAnswer = await receiveAnswer(transported.exactQuestion);
      const response = this.isolde.recordResponse(dossier, rawAnswer);
      const sourceAnswerRef = `${response.dossier.identity}@${response.dossier.version}#answer:${inquiry.payload.question.questionId}`;
      const assessed = await this.access.assessAnswer({ correlationId, questionId: inquiry.payload.question.questionId, predicate: inquiry.payload.question.predicate, exactQuestion: inquiry.payload.question.exactQuestion, rawAnswer, sourceAnswerRef });
      const rector = new RectorCastellanOfficer({ assessMissionPredicates: () => assessed.draft });
      const evaluated = rector.evaluateHandoff(response.dossier, response.handoff);
      if (evaluated.result.artifactType !== "CastellanTurnDisposition") throw new Error("Castellan must dispose exactly one answered turn");
      dossier = this.isolde.relayDisposition(response.dossier, evaluated.result as GovernedArtifactEnvelope<CastellanTurnDisposition>).dossier;
      audit.push(event("CASTELLAN_EVALUATED", correlationId, true, true, true));
    }
  }
}

function event(stage: LiveIsoldeAuditEvent["stage"], correlationId: string, credentialPresent: boolean, providerCalled: boolean, responseEvaluated = false): LiveIsoldeAuditEvent {
  return { stage, correlationId, credentialPresent, credentialExposedToIsolde: false, providerCalled, missionExecuted: false, responseEvaluated };
}

function assessmentInstructions(): string { return rectorAssessmentInstructions(); }
function assessmentSchema(): Record<string, unknown> { return { type: "object", properties: { disposition: { type: "string", enum: ["RESOLVED", "DECLARED_NONE", "AMBIGUOUS", "CONTRADICTORY", "UNUSABLE"] }, rationale: { type: "string" } }, required: ["disposition", "rationale"], additionalProperties: false }; }
function assessmentResult(id: unknown, content: string, provider: "openai" | "deepseek", model: string, request: LiveAnswerAssessmentRequest): LiveAnswerAssessmentResult {
  if (typeof id !== "string" || !id.trim()) throw new Error(`${provider} assessment response identity is missing`);
  const parsed = JSON.parse(content) as { disposition?: PredicateDetermination["disposition"]; rationale?: string };
  const allowed = new Set(["RESOLVED", "DECLARED_NONE", "AMBIGUOUS", "CONTRADICTORY", "UNUSABLE"]);
  if (!parsed.disposition || !allowed.has(parsed.disposition) || typeof parsed.rationale !== "string" || !parsed.rationale.trim()) throw new Error(`${provider} returned an invalid Rector assessment`);
  const hasValue = parsed.disposition === "RESOLVED";
  const determination: PredicateDetermination = { questionId: request.questionId, predicate: request.predicate, disposition: parsed.disposition, values: hasValue ? [request.rawAnswer] : [], rationale: parsed.rationale, sourceAnswerRef: request.sourceAnswerRef, evidence: [{ exactExcerpt: request.rawAnswer, derivation: "QUOTED", value: hasValue ? request.rawAnswer : undefined, rationale: parsed.rationale }] };
  return { responseId: id, provider, model, draft: { determinations: [determination] } };
}
function deepSeekContent(payload: Record<string, unknown>): string { const choice = Array.isArray(payload.choices) ? payload.choices[0] : undefined; const message = choice && typeof choice === "object" ? (choice as { message?: unknown }).message : undefined; const content = message && typeof message === "object" ? (message as { content?: unknown }).content : undefined; if (typeof content !== "string" || !content.trim()) throw new Error("DeepSeek response has no text output"); return content; }
function responseId(payload: Record<string, unknown>): string { if (typeof payload.id !== "string" || !payload.id.trim()) throw new Error("provider response identity is missing"); return payload.id; }
function professionBrainstormInstructions(): string { return "You are the Guildhall profession committee. Brainstorm professions that could contribute to the supplied Mission Specification Candidate. Return one JSON object with exactly this shape: {\"possibilities\":[{\"professionIdentity\":\"string\",\"contribution\":\"string\",\"rationale\":\"string\",\"collaborationMode\":\"INDEPENDENT|SEQUENTIAL|TANDEM\",\"dependsOn\":[\"earlier professionIdentity\"]}],\"overlaps\":[\"string\"],\"missingSpecialties\":[\"string\"]}. Include every field; use [] only for overlaps, missingSpecialties, or dependsOn when those lists are empty. possibilities MUST contain 1 to 8 concrete professions; abstention and an empty possibilities list are invalid. Explore alternatives, overlaps, combinations, and missing specialties. Recommend one or several professions as the work requires. dependsOn may name only professions listed earlier in the possibilities array. Do not select, identify, or invent people, Personas, Operatives, or Officers. Do not plan execution, choose tools, or perform the mission."; }
function professionBrainstormSchema(): Record<string, unknown> { return { type: "object", properties: { possibilities: { type: "array", minItems: 1, maxItems: 8, items: { type: "object", properties: { professionIdentity: { type: "string" }, contribution: { type: "string" }, rationale: { type: "string" }, collaborationMode: { type: "string", enum: ["INDEPENDENT", "SEQUENTIAL", "TANDEM"] }, dependsOn: { type: "array", items: { type: "string" } } }, required: ["professionIdentity", "contribution", "rationale", "collaborationMode", "dependsOn"], additionalProperties: false } }, overlaps: { type: "array", items: { type: "string" } }, missingSpecialties: { type: "array", items: { type: "string" } } }, required: ["possibilities", "overlaps", "missingSpecialties"], additionalProperties: false }; }

function professionAdjudicationInstructions(): string { return "You are the Guildhall profession committee adjudicating an admitted brainstorm. Return JSON only. For every brainstorm possibility, record exactly one decision: ADMIT it directly, CONSOLIDATE it into a different profession that appears in the final queue, or REJECT it as irrelevant/non-professional/duplicative, with a concrete rationale. Produce an ordered queue of 1 to 8 actual professions. Separate skills or expertise into capabilityRequirements, and tools, APIs, credentials, data access, or websites into toolOrAccessRequirements. Do not turn a capability or tool into a profession. Preserve only mission-relevant professions; consolidate overlaps. Queue dependencies may name only earlier queued professions. Do not select people, Personas, Operatives, or Officers. Do not determine Castellan suitability/usefulness and do not plan or execute the mission. Shape: {\"decisions\":[{\"professionIdentity\":\"exact brainstorm identity\",\"disposition\":\"ADMIT|CONSOLIDATE|REJECT\",\"targetProfessionIdentity\":\"queued profession or empty string\",\"rationale\":\"string\"}],\"queue\":[{\"position\":1,\"professionIdentity\":\"string\",\"contribution\":\"string\",\"rationale\":\"string\",\"collaborationMode\":\"INDEPENDENT|SEQUENTIAL|TANDEM\",\"dependsOn\":[]}],\"capabilityRequirements\":[\"string\"],\"toolOrAccessRequirements\":[\"string\"]}."; }
function professionAdjudicationSchema(): Record<string, unknown> { const possibility = { type: "object", properties: { position: { type: "integer", minimum: 1, maximum: 8 }, professionIdentity: { type: "string" }, contribution: { type: "string" }, rationale: { type: "string" }, collaborationMode: { type: "string", enum: ["INDEPENDENT", "SEQUENTIAL", "TANDEM"] }, dependsOn: { type: "array", items: { type: "string" } } }, required: ["position", "professionIdentity", "contribution", "rationale", "collaborationMode", "dependsOn"], additionalProperties: false }; return { type: "object", properties: { decisions: { type: "array", items: { type: "object", properties: { professionIdentity: { type: "string" }, disposition: { type: "string", enum: ["ADMIT", "CONSOLIDATE", "REJECT"] }, targetProfessionIdentity: { type: "string" }, rationale: { type: "string" } }, required: ["professionIdentity", "disposition", "targetProfessionIdentity", "rationale"], additionalProperties: false } }, queue: { type: "array", minItems: 1, maxItems: 8, items: possibility }, capabilityRequirements: { type: "array", items: { type: "string" } }, toolOrAccessRequirements: { type: "array", items: { type: "string" } } }, required: ["decisions", "queue", "capabilityRequirements", "toolOrAccessRequirements"], additionalProperties: false }; }

function parseProfessionBrainstorm(content: string, provider: string): ProfessionBrainstormDraft {
  let value: unknown;
  try { value = JSON.parse(content); } catch { throw new Error(`${provider} returned invalid Guildhall JSON`); }
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(`${provider} returned an invalid Guildhall brainstorm`);
  const draft = value as Record<string, unknown>;
  if (!Array.isArray(draft.possibilities)) throw new Error(`${provider} Guildhall brainstorm omitted profession possibilities`);
  const possibilities = draft.possibilities.map((item) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) throw new Error(`${provider} returned a malformed Guildhall profession possibility`);
    const possibility = item as Record<string, unknown>;
    if (typeof possibility.professionIdentity !== "string" || typeof possibility.contribution !== "string" || typeof possibility.rationale !== "string" || typeof possibility.collaborationMode !== "string") throw new Error(`${provider} returned an incomplete Guildhall profession possibility`);
    const rawDependsOn = possibility.dependsOn;
    if (rawDependsOn !== undefined && !isStringArray(rawDependsOn)) throw new Error(`${provider} returned invalid Guildhall profession dependencies`);
    const dependsOn: string[] = rawDependsOn === undefined ? [] : rawDependsOn as string[];
    return { professionIdentity: possibility.professionIdentity, contribution: possibility.contribution, rationale: possibility.rationale, collaborationMode: possibility.collaborationMode as ProfessionBrainstormDraft["possibilities"][number]["collaborationMode"], dependsOn };
  });
  if (draft.overlaps !== undefined && !isStringArray(draft.overlaps)) throw new Error(`${provider} returned invalid Guildhall overlaps`);
  if (draft.missingSpecialties !== undefined && !isStringArray(draft.missingSpecialties)) throw new Error(`${provider} returned invalid Guildhall missing specialties`);
  const overlaps = draft.overlaps;
  const missingSpecialties = draft.missingSpecialties;
  return { possibilities, overlaps: overlaps === undefined ? [] : overlaps as string[], missingSpecialties: missingSpecialties === undefined ? [] : missingSpecialties as string[] };
}

function parseProfessionAdjudication(content: string, provider: string): ProfessionAdjudicationDraft {
  let value: unknown;
  try { value = JSON.parse(content); } catch { throw new Error(`${provider} returned invalid Guildhall adjudication JSON`); }
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(`${provider} returned an invalid Guildhall adjudication`);
  const draft = value as Record<string, unknown>;
  if (!Array.isArray(draft.decisions) || !Array.isArray(draft.queue) || !isStringArray(draft.capabilityRequirements) || !isStringArray(draft.toolOrAccessRequirements)) throw new Error(`${provider} returned an incomplete Guildhall adjudication`);
  const decisions = draft.decisions.map((item) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) throw new Error(`${provider} returned a malformed Guildhall adjudication decision`);
    const decision = item as Record<string, unknown>;
    if (typeof decision.professionIdentity !== "string" || typeof decision.disposition !== "string" || typeof decision.rationale !== "string" || (decision.targetProfessionIdentity !== undefined && typeof decision.targetProfessionIdentity !== "string")) throw new Error(`${provider} returned an incomplete Guildhall adjudication decision`);
    return { professionIdentity: decision.professionIdentity, disposition: decision.disposition as ProfessionAdjudicationDraft["decisions"][number]["disposition"], targetProfessionIdentity: decision.targetProfessionIdentity as string | undefined, rationale: decision.rationale };
  });
  const queue = draft.queue.map((item) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) throw new Error(`${provider} returned a malformed Guildhall adjudicated profession`);
    const profession = item as Record<string, unknown>;
    if (typeof profession.position !== "number" || typeof profession.professionIdentity !== "string" || typeof profession.contribution !== "string" || typeof profession.rationale !== "string" || typeof profession.collaborationMode !== "string" || !isStringArray(profession.dependsOn)) throw new Error(`${provider} returned an incomplete Guildhall adjudicated profession`);
    return profession as unknown as ProfessionAdjudicationDraft["queue"][number];
  });
  return { decisions, queue, capabilityRequirements: draft.capabilityRequirements, toolOrAccessRequirements: draft.toolOrAccessRequirements } as ProfessionAdjudicationDraft;
}

function isStringArray(value: unknown): value is string[] { return Array.isArray(value) && value.every((item) => typeof item === "string"); }

async function readCredential(directory: string, environment: NodeJS.ProcessEnv, keyName = "OPENAI_API_KEY"): Promise<string | undefined> {
  const injected = environment[keyName]?.trim();
  if (injected) return injected;
  try {
    const contents = await readFile(resolve(directory, ".env.local"), "utf8");
    for (const line of contents.split(/\r?\n/u)) {
      const match = line.match(new RegExp(`^\\s*(?:export\\s+)?${keyName}\\s*=\\s*(.*)\\s*$`, "u"));
      if (!match) continue;
      const value = unquote(match[1]).trim();
      if (value) return value;
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }
  return undefined;
}

async function readSetting(directory: string, name: string): Promise<string | undefined> {
  try {
    const contents = await readFile(resolve(directory, ".env.local"), "utf8");
    for (const line of contents.split(/\r?\n/u)) {
      const match = line.match(new RegExp(`^\\s*(?:export\\s+)?${name}\\s*=\\s*(.*)\\s*$`, "u"));
      if (match) return unquote(match[1]).trim().toLowerCase() || undefined;
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }
  return undefined;
}

function providerFailure(provider: string, response: Response, payload: Record<string, unknown>): Error {
  const error = payload.error && typeof payload.error === "object" ? payload.error as Record<string, unknown> : {};
  const code = typeof error.code === "string" && error.code.trim() ? `; code=${error.code}` : "";
  const requestId = response.headers.get("x-request-id");
  return new Error(`${provider} transport failed (${response.status}${code}${requestId ? `; request_id=${requestId}` : ""})`);
}

function unquote(value: string): string {
  return ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) ? value.slice(1, -1) : value;
}

function extractOutputText(payload: Record<string, unknown>): string {
  if (typeof payload.output_text === "string" && payload.output_text.trim()) return payload.output_text;
  if (!Array.isArray(payload.output)) throw new Error("OpenAI response has no output");
  for (const item of payload.output) {
    if (!item || typeof item !== "object" || !Array.isArray((item as { content?: unknown }).content)) continue;
    for (const content of (item as { content: unknown[] }).content) {
      if (content && typeof content === "object" && (content as { type?: unknown }).type === "output_text" && typeof (content as { text?: unknown }).text === "string") return (content as { text: string }).text;
      if (content && typeof content === "object" && (content as { type?: unknown }).type === "refusal") throw new Error("OpenAI refused the bounded transport request");
    }
  }
  throw new Error("OpenAI response has no text output");
}
