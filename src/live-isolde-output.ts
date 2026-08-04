import { MissionSpecificationCandidate } from "./castellan-mission-formation.js";
import { ProfessionAdjudicationPacket, ProfessionRecommendationPacket } from "./guildhall-mission-committee.js";
import { ProfessionResolutionPacket } from "./profession-resolution.js";

export function parseLiveIsoldeFlags(args: readonly string[]): { debug: boolean } {
  const unknown = args.filter((arg) => arg !== "--debug");
  if (unknown.length) throw new Error(`unknown option: ${unknown.join(", ")}`);
  return { debug: args.includes("--debug") };
}

export function summarizeCandidate(candidate: MissionSpecificationCandidate): string {
  return `Mission intake complete: ${candidate.unresolvedPredicates.length} unresolved predicate(s).`;
}

export function summarizeBrainstorm(packet: ProfessionRecommendationPacket): string {
  return `Guildhall brainstorm complete: ${packet.possibilities.length} profession possibility(ies).`;
}

export function summarizeAdjudication(packet: ProfessionAdjudicationPacket): string {
  return `Guildmaster adjudication complete: ${packet.queue.length} profession(s) approved — ${packet.queue.map((item) => item.professionIdentity).join(", ")}.`;
}

export function summarizeResolution(packet: ProfessionResolutionPacket): string {
  const reused = packet.items.filter((item) => item.disposition === "REUSED_ADMITTED_PROFSPEC").length;
  const missing = packet.items.length - reused;
  const statuses = packet.items.map((item) => `${item.professionIdentity}: ${item.disposition === "REUSED_ADMITTED_PROFSPEC" ? "reused" : "creation required"}`).join("; ");
  return `Profession resolution complete: ${reused} reused, ${missing} require creation. ${statuses}`;
}

export function debugPacket(label: string, payload: unknown): string {
  return `[debug] ${label}: ${JSON.stringify(payload, null, 2)}`;
}
