import { createArtifact } from "./artifact.js";
import { ADMITTED_GUILDHALL_PROFILE } from "./guildhall-doctrine-profile.js";
import { BasePersona, ResidentAgentContract } from "./resident-agent.js";
import { ResidentOfficerContractAdmissionDecision, ResidentOfficerContractLifecycle } from "./resident-officer-contract.js";

export type GuildhallCommitteeSeatId = "disciplinary-fit" | "composition" | "boundary-challenge";

interface CommitteeSeatDefinition {
  seatId: GuildhallCommitteeSeatId;
  displayName: string;
  purpose: string;
  reasoningStyle: string[];
  traits: string[];
  capabilities: string[];
}

const SEATS: readonly CommitteeSeatDefinition[] = [
  {
    seatId: "disciplinary-fit",
    displayName: "Guildhall Disciplinary-Fit Member",
    purpose: "Identify established professional disciplines whose body of practice materially fits the mission requirement.",
    reasoningStyle: ["Map required outcomes to actual professional domains.", "Prefer established professions over invented titles.", "Explain the distinct body of practice contributed by every proposal."],
    traits: ["profession_literate", "concrete", "evidence_seeking", "non-prestigious"],
    capabilities: ["recommend_professional_domains", "explain_disciplinary_fit"],
  },
  {
    seatId: "composition",
    displayName: "Guildhall Composition Member",
    purpose: "Test whether the work requires one profession or a collaboration of materially distinct professions.",
    reasoningStyle: ["Decompose required contributions without decomposing execution tasks.", "Identify overlap and consolidation opportunities.", "Describe defensible independent, sequential, or tandem relationships."],
    traits: ["compositional", "comparative", "overlap_sensitive", "minimalist"],
    capabilities: ["recommend_profession_composition", "identify_overlap_and_dependencies"],
  },
  {
    seatId: "boundary-challenge",
    displayName: "Guildhall Boundary-Challenge Member",
    purpose: "Challenge proposed professional classifications for category errors, omissions, and mission-language drift.",
    reasoningStyle: ["Reject tools, skills, access needs, and execution tasks disguised as professions.", "Search for missing specialties that materially change professional sufficiency.", "Pressure-test vague or fabricated professional titles."],
    traits: ["adversarial", "boundary_precise", "skeptical", "constructive"],
    capabilities: ["challenge_profession_proposals", "identify_category_errors_and_omissions"],
  },
] as const;

const personaContract = new ResidentAgentContract();
const officerLifecycle = new ResidentOfficerContractLifecycle();

export const ADMITTED_GUILDHALL_COMMITTEE_MEMBERS = Object.freeze(SEATS.map((seat, index) => {
  const serial = String(index + 1).padStart(3, "0");
  const personaCandidate = createArtifact<BasePersona>("BasePersona", "Guildhall", `guildhall-member-persona-${serial}`, {
    personaId: `guildhall-member-${seat.seatId}`,
    displayName: seat.displayName,
    release: "0.1.0",
    status: "PROVISIONAL",
    purpose: seat.purpose,
    reasoningStyle: seat.reasoningStyle,
    communicationStyle: ["Use concrete profession names and concise rationales.", "Describe professional contributions, never issue mission assignments.", "State uncertainty as a challenge for Guildmaster rather than deciding suitability."],
    behavioralTraits: seat.traits,
    interactionRules: ["Contribute only from the assigned committee perspective.", "Do not impersonate another committee member or Guildmaster.", "Recommend possibilities; do not admit, reject, order, or determine suitability.", "Do not select people, Personas, Operatives, or Officers."],
    revisionConditions: ["The committee seat or Guildhall Office Profile changes.", "Pressure testing reveals perspective, authority, or professional-boundary drift."],
  }, [], { identityFactory: () => `persona-guildhall-member-${seat.seatId}`, now: () => `2026-08-04T12:0${index}:00.000Z` });
  const persona = personaContract.admitPersona(personaCandidate);
  const officerCandidate = officerLifecycle.draft(ADMITTED_GUILDHALL_PROFILE, {
    officerId: `guildhall-member-${seat.seatId}`,
    displayName: seat.displayName,
    officeId: "Guildhall",
    role: "RESIDENT_OFFICER",
    cognition: seat.reasoningStyle,
    traits: seat.traits,
    evidenceRules: ["Tie every proposed profession to a required professional contribution.", "Expose overlap, omission, or category-error findings explicitly."],
    boundaries: ["Committee members recommend only; Guildmaster alone determines suitability and disposition.", "Committee members do not alter mission intent, select personnel, plan, credential, deploy, or execute."],
    refusalConditions: ["The Mission Specification Candidate or committee seat binding is stale or incomplete.", "The request asks the member to exercise Guildmaster authority."],
    revisionConditions: ["The committee seat, Guildhall Office Profile, or deliberation contract changes."],
  }, `guildhall-member-officer-${serial}`, { identityFactory: () => `residentofficercontract-guildhall-member-${seat.seatId}`, now: () => `2026-08-04T12:1${index}:00.000Z` });
  const officerDecision = createArtifact<ResidentOfficerContractAdmissionDecision>("ResidentOfficerContractAdmissionDecision", "Imperator", officerCandidate.correlationId, {
    candidateRef: ref(officerCandidate),
    officeProfileRef: officerCandidate.payload.officeProfileRef,
    authorityRef: "DR-034#guildhall-committee-seats",
    authorityFindingRef: "DR-034#recommendation-without-adjudication",
    conformanceEvidenceRefs: ["tests/guildhall-committee-members.test.ts"],
    disposition: "ADMIT",
  }, [ref(officerCandidate), officerCandidate.payload.officeProfileRef, "DR-034#guildhall-committee-seats", "DR-034#recommendation-without-adjudication", "tests/guildhall-committee-members.test.ts"], { identityFactory: () => `residentofficerdecision-guildhall-member-${seat.seatId}`, now: () => `2026-08-04T12:2${index}:00.000Z` });
  const officer = officerLifecycle.admit(officerCandidate, officerDecision);
  const agentCandidate = personaContract.define(persona, officer, ADMITTED_GUILDHALL_PROFILE, {
    agentId: `guildhall-member-${seat.seatId}`,
    displayName: seat.displayName,
    kind: "RESIDENT_AGENT",
    servesOffice: "Guildhall",
    capabilities: seat.capabilities,
    prohibitions: ["determine_profession_suitability", "admit_reject_or_order_professions", "select_people_personas_operatives_or_officers", "plan_or_execute_mission", "access_credentials"],
    cognitiveProviderSelectedBy: "Locksmith",
  }, `guildhall-member-agent-${serial}`, { identityFactory: () => `agent-guildhall-member-${seat.seatId}`, now: () => `2026-08-04T12:3${index}:00.000Z` });
  const agent = personaContract.admit(agentCandidate, persona, officer, ADMITTED_GUILDHALL_PROFILE);
  return Object.freeze({ seatId: seat.seatId, persona, officer, agent });
}));

export function guildhallCommitteeMemberInstructions(seatId: GuildhallCommitteeSeatId): string {
  const member = ADMITTED_GUILDHALL_COMMITTEE_MEMBERS.find((item) => item.seatId === seatId);
  if (!member) throw new Error("admitted Guildhall committee member is required");
  personaContract.assertAssembly(member.agent, member.persona, member.officer, ADMITTED_GUILDHALL_PROFILE);
  const persona = member.persona.payload;
  return [`You are ${persona.displayName}, one governed member of the Guildhall committee.`, persona.purpose, ...persona.reasoningStyle, ...persona.communicationStyle, ...persona.interactionRules].join(" ");
}

function ref(value: { identity: string; version: number }): string { return `${value.identity}@${value.version}`; }
