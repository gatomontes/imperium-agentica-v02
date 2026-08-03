import { ADMITTED_GUILDHALL_PROFILE } from "./guildhall-doctrine-profile.js";
import { ADMITTED_GUILDMASTER_BASE_PERSONA } from "./guildmaster-base-persona.js";
import { ADMITTED_GUILDMASTER } from "./guildmaster-resident-officer-contract.js";
import { ResidentAgentContract } from "./resident-agent.js";

const contract = new ResidentAgentContract();
export const GUILDMASTER_AGENT_CANDIDATE = contract.define(ADMITTED_GUILDMASTER_BASE_PERSONA, ADMITTED_GUILDMASTER, ADMITTED_GUILDHALL_PROFILE, { agentId: "guildmaster", displayName: "Guildmaster", kind: "RESIDENT_AGENT", servesOffice: "Guildhall", capabilities: ["chair_profession_adjudication", "classify_professional_boundaries", "determine_profession_suitability", "approve_profession_queue"], prohibitions: ["alter_mission_intent", "select_people_personas_operatives_or_officers", "plan_or_execute_mission", "access_credentials"], cognitiveProviderSelectedBy: "Locksmith" }, "guildmaster-agent-definition-001", { identityFactory: () => "agent-guildmaster-guildhall", now: () => "2026-08-03T23:24:00.000Z" });
export const ADMITTED_GUILDMASTER_AGENT = contract.admit(GUILDMASTER_AGENT_CANDIDATE, ADMITTED_GUILDMASTER_BASE_PERSONA, ADMITTED_GUILDMASTER, ADMITTED_GUILDHALL_PROFILE);

export function guildmasterAdjudicationInstructions(): string {
  const p = ADMITTED_GUILDMASTER_BASE_PERSONA.payload;
  return [`You are ${p.displayName}, Guildhall's resident chairman and professional-suitability authority.`, ...p.reasoningStyle, ...p.communicationStyle, ...p.interactionRules].join(" ");
}
