import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { GovernedArtifactEnvelope } from "./artifact.js";
import { IsoldeSecretariatOfficer } from "./isolde-secretariat-officer.js";
import { RectorCastellanOfficer } from "./rector-castellan-officer.js";
import { CastellanInquiry, IsoldeQuestionPresentation, MissionDossier } from "./secretariat-mission-dossier.js";

export interface LiveIsoldeAuditEvent {
  stage: "LOCKSMITH_READY" | "MASTER_MASON_OPENED" | "ISOLDE_PRESENTED" | "MASTER_MASON_CLOSED";
  correlationId: string;
  credentialPresent: boolean;
  credentialExposedToIsolde: false;
  providerCalled: boolean;
  missionExecuted: false;
  responseEvaluated: false;
}

export interface OpenAITransportRequest {
  correlationId: string;
  operatorText: string;
  exactCastellanQuestion: string;
}

export interface OpenAITransportResult {
  responseId: string;
  model: string;
  exactQuestion: string;
}

export interface LocksmithOpenAIAccessPort {
  readonly configured: true;
  transportQuestion(request: OpenAITransportRequest): Promise<OpenAITransportResult>;
}

export interface LiveIsoldeResult {
  dossier: GovernedArtifactEnvelope<MissionDossier>;
  inquiry: GovernedArtifactEnvelope<CastellanInquiry>;
  presentation: GovernedArtifactEnvelope<IsoldeQuestionPresentation>;
  exactQuestion: string;
  providerResponseId: string;
  model: string;
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
          instructions: "You are Isolde, the Secretariat transport officer. Do not interpret, evaluate, answer, summarize, or rewrite Operator text. Return only the exact Castellan-provided question in the required JSON structure.",
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
      return { responseId: payload.id, model, exactQuestion: parsed.exact_question };
    },
  });
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
    return { dossier: presented.dossier, inquiry, presentation: presented.presentation, exactQuestion: transported.exactQuestion, providerResponseId: transported.responseId, model: transported.model, audit };
  }
}

function event(stage: LiveIsoldeAuditEvent["stage"], correlationId: string, credentialPresent: boolean, providerCalled: boolean): LiveIsoldeAuditEvent {
  return { stage, correlationId, credentialPresent, credentialExposedToIsolde: false, providerCalled, missionExecuted: false, responseEvaluated: false };
}

async function readCredential(directory: string, environment: NodeJS.ProcessEnv): Promise<string | undefined> {
  const injected = environment.OPENAI_API_KEY?.trim();
  if (injected) return injected;
  try {
    const contents = await readFile(resolve(directory, ".env.local"), "utf8");
    for (const line of contents.split(/\r?\n/u)) {
      const match = line.match(/^\s*(?:export\s+)?OPENAI_API_KEY\s*=\s*(.*)\s*$/u);
      if (!match) continue;
      const value = unquote(match[1]).trim();
      if (value) return value;
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }
  return undefined;
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
