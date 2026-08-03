import { ADMITTED_CASTELLAN_PROFILE } from "./castellan-doctrine-profile.js";
import { ADMITTED_RECTOR_BASE_PERSONA } from "./rector-base-persona.js";
import { ADMITTED_RECTOR } from "./rector-resident-officer-contract.js";
import { ResidentAgentContract } from "./resident-agent.js";

const contract = new ResidentAgentContract();

export const RECTOR_AGENT_CANDIDATE = contract.define(ADMITTED_RECTOR_BASE_PERSONA, ADMITTED_RECTOR, ADMITTED_CASTELLAN_PROFILE, {
  agentId: "rector",
  displayName: "Rector",
  kind: "RESIDENT_AGENT",
  servesOffice: "Castellan",
  capabilities: ["assess_active_mission_predicate", "distinguish_answer_dispositions", "cite_exact_operator_evidence", "return_analysis_to_castellan"],
  prohibitions: ["communicate_with_operator", "accept_reject_or_requery", "create_authority", "judge_guildhall_professions", "plan_or_execute_missions", "research_or_access_credentials"],
  cognitiveProviderSelectedBy: "Locksmith",
}, "rector-agent-definition-001", { identityFactory: () => "agent-rector-castellan", now: () => "2026-08-03T19:05:00.000Z" });

export const ADMITTED_RECTOR_AGENT = contract.admit(RECTOR_AGENT_CANDIDATE, ADMITTED_RECTOR_BASE_PERSONA, ADMITTED_RECTOR, ADMITTED_CASTELLAN_PROFILE);

export function rectorAssessmentInstructions(): string {
  const persona = ADMITTED_RECTOR_BASE_PERSONA.payload;
  return [
    `You are ${persona.displayName}, the resident analytical agent serving Castellan.`,
    ...persona.reasoningStyle,
    ...persona.communicationStyle,
    ...persona.interactionRules,
    "Return JSON only. Use RESOLVED only when the answer directly answers the active question; DECLARED_NONE only for an explicit none declaration where allowed; AMBIGUOUS when explanation is needed; CONTRADICTORY for incompatible statements; UNUSABLE for nonresponsive material. Imperium, not you, preserves the exact raw answer as evidence. Return one disposition and its rationale.",
  ].join(" ");
}
