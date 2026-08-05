import { createHash } from "node:crypto";
import type { ArtifactEnvelope } from "./artifact.js";
import type { InProgressPersonaCandidate } from "./persona-production-intake.js";

export function personaCandidateDigest(candidate: ArtifactEnvelope<InProgressPersonaCandidate>): string {
  return "sha256:" + createHash("sha256").update(canonicalJson(candidate.payload)).digest("hex");
}

function canonicalJson(value: unknown): string {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return "[" + value.map(canonicalJson).join(",") + "]";
  const record = value as Record<string, unknown>;
  return "{" + Object.keys(record).sort().map((key) => JSON.stringify(key) + ":" + canonicalJson(record[key])).join(",") + "}";
}
