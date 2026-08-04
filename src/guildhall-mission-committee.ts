import { ArtifactContext, ArtifactEnvelope, GovernedArtifactEnvelope, createArtifact } from "./artifact.js";
import { MissionSpecificationCandidate } from "./castellan-mission-formation.js";
import { assertArtifactEnvelope } from "./schema.js";
import { ADMITTED_GUILDMASTER_AGENT } from "./guildmaster-agent-definition.js";
import { ADMITTED_GUILDHALL_COMMITTEE_MEMBERS, GuildhallCommitteeSeatId } from "./guildhall-committee-members.js";

export type ProfessionCollaborationMode = "INDEPENDENT" | "SEQUENTIAL" | "TANDEM";

export interface ProfessionPossibility {
  professionIdentity: string;
  contribution: string;
  rationale: string;
  collaborationMode: ProfessionCollaborationMode;
  dependsOn: string[];
}

export interface ProfessionBrainstormDraft {
  possibilities: ProfessionPossibility[];
  overlaps: string[];
  missingSpecialties: string[];
}

export interface CommitteeMemberContributionPacket extends ProfessionBrainstormDraft {
  missionSpecificationCandidateRef: string;
  handoffRef: string;
  committeeSeatId: GuildhallCommitteeSeatId;
  committeeMemberAgentDefinitionRef: string;
  finding: "PROFESSION_POSSIBILITIES_CONTRIBUTED";
  suitabilityDetermined: false;
}

export interface CastellanGuildhallHandoff {
  missionSpecificationCandidateRef: string;
  recipient: "GUILDHALL_COMMITTEE";
  purpose: "PROFESSION_BRAINSTORM";
  authorityCreated: false;
}

export interface ProfessionRecommendationPacket extends ProfessionBrainstormDraft {
  missionSpecificationCandidateRef: string;
  handoffRef: string;
  memberContributionRefs: string[];
  finding: "PROFESSION_POSSIBILITIES_RECORDED";
  peopleSelected: false;
  operativesSelected: false;
  officersSelected: false;
}

export type ProfessionPossibilityDisposition = "ADMIT" | "CONSOLIDATE" | "REJECT";

export interface ProfessionPossibilityDecision {
  professionIdentity: string;
  disposition: ProfessionPossibilityDisposition;
  targetProfessionIdentity?: string;
  rationale: string;
}

export interface AdjudicatedProfessionQueueItem extends ProfessionPossibility {
  position: number;
}

export interface ProfessionAdjudicationDraft {
  decisions: ProfessionPossibilityDecision[];
  queue: AdjudicatedProfessionQueueItem[];
  capabilityRequirements: string[];
  toolOrAccessRequirements: string[];
}

export interface ProfessionAdjudicationPacket extends ProfessionAdjudicationDraft {
  missionSpecificationCandidateRef: string;
  recommendationPacketRef: string;
  finding: "PROFESSION_QUEUE_RECOMMENDED";
  peopleSelected: false;
  operativesSelected: false;
  officersSelected: false;
  suitabilityDetermined: true;
  guildmasterAgentDefinitionRef: string;
}

export class CastellanGuildhallRouter {
  handoff(candidate: GovernedArtifactEnvelope<MissionSpecificationCandidate>, context: ArtifactContext = {}): ArtifactEnvelope<CastellanGuildhallHandoff> {
    assertCandidate(candidate);
    return createArtifact("CastellanGuildhallHandoff", "Castellan", candidate.correlationId, {
      missionSpecificationCandidateRef: ref(candidate),
      recipient: "GUILDHALL_COMMITTEE",
      purpose: "PROFESSION_BRAINSTORM",
      authorityCreated: false,
    }, [ref(candidate)], context);
  }
}

export class GuildhallMissionCommittee {
  recordMemberContribution(
    candidate: GovernedArtifactEnvelope<MissionSpecificationCandidate>,
    handoff: ArtifactEnvelope<CastellanGuildhallHandoff>,
    seatId: GuildhallCommitteeSeatId,
    draft: ProfessionBrainstormDraft,
    context: ArtifactContext = {},
  ): ArtifactEnvelope<CommitteeMemberContributionPacket> {
    assertCandidate(candidate);
    assertHandoff(candidate, handoff);
    const member = ADMITTED_GUILDHALL_COMMITTEE_MEMBERS.find((item) => item.seatId === seatId);
    if (!member) throw new Error("exact admitted Guildhall committee seat is required");
    const possibilities = validatePossibilities(draft.possibilities, "committee member contribution");
    const committeeMemberAgentDefinitionRef = ref(member.agent);
    return createArtifact("CommitteeMemberContributionPacket", member.persona.payload.displayName, candidate.correlationId, {
      missionSpecificationCandidateRef: ref(candidate), handoffRef: ref(handoff), committeeSeatId: seatId,
      committeeMemberAgentDefinitionRef, possibilities, overlaps: cleanList(draft.overlaps), missingSpecialties: cleanList(draft.missingSpecialties),
      finding: "PROFESSION_POSSIBILITIES_CONTRIBUTED", suitabilityDetermined: false,
    }, [ref(candidate), ref(handoff), committeeMemberAgentDefinitionRef], context);
  }

  assembleRecommendation(
    candidate: GovernedArtifactEnvelope<MissionSpecificationCandidate>,
    handoff: ArtifactEnvelope<CastellanGuildhallHandoff>,
    contributions: ArtifactEnvelope<CommitteeMemberContributionPacket>[],
    context: ArtifactContext = {},
  ): ArtifactEnvelope<ProfessionRecommendationPacket> {
    assertCandidate(candidate); assertHandoff(candidate, handoff);
    if (contributions.length !== ADMITTED_GUILDHALL_COMMITTEE_MEMBERS.length) throw new Error("every admitted Guildhall committee member must contribute exactly once");
    const seats = new Set<GuildhallCommitteeSeatId>();
    for (const contribution of contributions) {
      assertArtifactEnvelope(contribution);
      const member = ADMITTED_GUILDHALL_COMMITTEE_MEMBERS.find((item) => item.seatId === contribution.payload.committeeSeatId);
      if (!member || seats.has(member.seatId) || contribution.artifactType !== "CommitteeMemberContributionPacket" || contribution.status !== "CURRENT" || contribution.correlationId !== candidate.correlationId || contribution.payload.missionSpecificationCandidateRef !== ref(candidate) || contribution.payload.handoffRef !== ref(handoff) || contribution.payload.committeeMemberAgentDefinitionRef !== ref(member.agent) || contribution.payload.suitabilityDetermined !== false || !contribution.sourceRefs.includes(ref(member.agent))) throw new Error("exact attributable committee member contribution is required");
      seats.add(member.seatId);
    }
    const possibilities = mergePossibilities(contributions.flatMap((item) => item.payload.possibilities));
    if (!possibilities.length || possibilities.length > 24) throw new Error("assembled Guildhall recommendation requires one to twenty-four distinct profession possibilities");
    const memberContributionRefs = contributions.map(ref);
    return createArtifact("ProfessionRecommendationPacket", "GuildhallCommittee", candidate.correlationId, {
      missionSpecificationCandidateRef: ref(candidate), handoffRef: ref(handoff), memberContributionRefs,
      possibilities, overlaps: cleanList(contributions.flatMap((item) => item.payload.overlaps)), missingSpecialties: cleanList(contributions.flatMap((item) => item.payload.missingSpecialties)),
      finding: "PROFESSION_POSSIBILITIES_RECORDED", peopleSelected: false, operativesSelected: false, officersSelected: false,
    }, [ref(candidate), ref(handoff), ...memberContributionRefs], context);
  }

  adjudicate(
    candidate: GovernedArtifactEnvelope<MissionSpecificationCandidate>,
    recommendation: ArtifactEnvelope<ProfessionRecommendationPacket>,
    draft: ProfessionAdjudicationDraft,
    context: ArtifactContext = {},
  ): ArtifactEnvelope<ProfessionAdjudicationPacket> {
    assertCandidate(candidate);
    assertRecommendation(candidate, recommendation);
    const sourceIdentities = recommendation.payload.possibilities.map((item) => item.professionIdentity);
    const sourceKeys = new Set(sourceIdentities.map(normalizeIdentity));
    if (draft.decisions.length !== sourceIdentities.length) throw new Error("Guildhall adjudication requires exactly one decision for every brainstorm possibility");
    const decisionKeys = new Set<string>();
    const decisions = draft.decisions.map((value) => {
      const decision = cleanDecision(value);
      const key = normalizeIdentity(decision.professionIdentity);
      if (!sourceKeys.has(key) || decisionKeys.has(key)) throw new Error("Guildhall adjudication decisions must uniquely cover the brainstorm possibilities");
      decisionKeys.add(key);
      return decision;
    });
    const queue = draft.queue.map(cleanQueueItem);
    if (queue.length === 0 || queue.length > 8) throw new Error("Guildhall adjudication requires a one-to-eight profession queue");
    const queueKeys = new Set<string>();
    for (const [index, item] of queue.entries()) {
      const key = normalizeIdentity(item.professionIdentity);
      if (item.position !== index + 1 || queueKeys.has(key)) throw new Error("Guildhall adjudicated queue must be ordered and distinct");
      for (const dependency of item.dependsOn) {
        if (!queueKeys.has(normalizeIdentity(dependency))) throw new Error("Guildhall adjudicated dependencies must name an earlier queued profession");
      }
      if (item.collaborationMode === "INDEPENDENT" && item.dependsOn.length) throw new Error("independent professions may not declare dependencies");
      queueKeys.add(key);
    }
    for (const decision of decisions) {
      const sourceKey = normalizeIdentity(decision.professionIdentity);
      const targetKey = decision.targetProfessionIdentity ? normalizeIdentity(decision.targetProfessionIdentity) : undefined;
      if (decision.disposition === "ADMIT" && (!queueKeys.has(sourceKey) || targetKey)) throw new Error("admitted profession decisions must appear directly in the queue");
      if (decision.disposition === "CONSOLIDATE" && (!targetKey || !queueKeys.has(targetKey) || targetKey === sourceKey)) throw new Error("consolidated professions must name a different queued profession");
      if (decision.disposition === "REJECT" && targetKey) throw new Error("rejected profession decisions may not name a queue target");
    }
    for (const queueKey of queueKeys) {
      const justified = decisions.some((decision) => decision.disposition === "ADMIT"
        ? normalizeIdentity(decision.professionIdentity) === queueKey
        : decision.disposition === "CONSOLIDATE" && decision.targetProfessionIdentity !== undefined && normalizeIdentity(decision.targetProfessionIdentity) === queueKey);
      if (!justified) throw new Error("every adjudicated queue profession must be justified by an admission or consolidation decision");
    }
    const guildmasterAgentDefinitionRef = ref(ADMITTED_GUILDMASTER_AGENT);
    return createArtifact("ProfessionAdjudicationPacket", "Guildmaster", candidate.correlationId, {
      missionSpecificationCandidateRef: ref(candidate),
      recommendationPacketRef: ref(recommendation),
      decisions,
      queue,
      capabilityRequirements: cleanList(draft.capabilityRequirements),
      toolOrAccessRequirements: cleanList(draft.toolOrAccessRequirements),
      finding: "PROFESSION_QUEUE_RECOMMENDED",
      peopleSelected: false,
      operativesSelected: false,
      officersSelected: false,
      suitabilityDetermined: true,
      guildmasterAgentDefinitionRef,
    }, [ref(candidate), ref(recommendation), guildmasterAgentDefinitionRef], context);
  }
}

function assertCandidate(candidate: GovernedArtifactEnvelope<MissionSpecificationCandidate>): void {
  assertArtifactEnvelope(candidate);
  if (candidate.artifactType !== "MissionSpecificationCandidate" || candidate.producer !== "Castellan" || candidate.status !== "CURRENT" || candidate.payload.state !== "CANDIDATE" || candidate.payload.authorityCreated !== false || !candidate.payload.purpose.trim() || !candidate.payload.dossierRef.trim()) {
    throw new Error("exact current Castellan Mission Specification Candidate is required");
  }
}

function assertHandoff(candidate: GovernedArtifactEnvelope<MissionSpecificationCandidate>, handoff: ArtifactEnvelope<CastellanGuildhallHandoff>): void {
  assertArtifactEnvelope(handoff);
  if (handoff.artifactType !== "CastellanGuildhallHandoff" || handoff.producer !== "Castellan" || handoff.status !== "CURRENT" || handoff.correlationId !== candidate.correlationId || handoff.payload.missionSpecificationCandidateRef !== ref(candidate) || handoff.payload.recipient !== "GUILDHALL_COMMITTEE" || handoff.payload.purpose !== "PROFESSION_BRAINSTORM" || handoff.payload.authorityCreated !== false || !handoff.sourceRefs.includes(ref(candidate))) {
    throw new Error("exact matching Castellan-to-Guildhall handoff is required");
  }
}

function assertRecommendation(candidate: GovernedArtifactEnvelope<MissionSpecificationCandidate>, recommendation: ArtifactEnvelope<ProfessionRecommendationPacket>): void {
  assertArtifactEnvelope(recommendation);
  if (recommendation.artifactType !== "ProfessionRecommendationPacket" || recommendation.producer !== "GuildhallCommittee" || recommendation.status !== "CURRENT" || recommendation.correlationId !== candidate.correlationId || recommendation.payload.missionSpecificationCandidateRef !== ref(candidate) || recommendation.payload.finding !== "PROFESSION_POSSIBILITIES_RECORDED" || recommendation.payload.peopleSelected !== false || recommendation.payload.operativesSelected !== false || recommendation.payload.officersSelected !== false || recommendation.payload.memberContributionRefs.length !== ADMITTED_GUILDHALL_COMMITTEE_MEMBERS.length || recommendation.payload.memberContributionRefs.some((item) => !recommendation.sourceRefs.includes(item)) || !recommendation.sourceRefs.includes(ref(candidate))) {
    throw new Error("exact current Guildhall profession recommendation packet is required");
  }
}

function validatePossibilities(values: ProfessionPossibility[], label: string): ProfessionPossibility[] {
  const possibilities = values.map(cleanPossibility);
  if (!possibilities.length || possibilities.length > 8) throw new Error(`${label} requires one to eight profession possibilities`);
  const identities = new Set<string>();
  for (const possibility of possibilities) {
    const key = normalizeIdentity(possibility.professionIdentity);
    if (identities.has(key)) throw new Error(`${label} profession possibilities must be distinct`);
    for (const dependency of possibility.dependsOn) if (!identities.has(normalizeIdentity(dependency))) throw new Error(`${label} dependencies must name an earlier profession possibility`);
    if (possibility.collaborationMode === "INDEPENDENT" && possibility.dependsOn.length) throw new Error("independent professions may not declare dependencies");
    identities.add(key);
  }
  return possibilities;
}

function mergePossibilities(values: ProfessionPossibility[]): ProfessionPossibility[] {
  const merged = new Map<string, ProfessionPossibility>();
  for (const value of values.map(cleanPossibility)) {
    const key = normalizeIdentity(value.professionIdentity);
    const prior = merged.get(key);
    if (!prior) merged.set(key, { ...value, collaborationMode: "INDEPENDENT", dependsOn: [] });
    else merged.set(key, { ...prior, rationale: cleanList([prior.rationale, value.rationale]).join(" ") });
  }
  return [...merged.values()];
}

function cleanPossibility(value: ProfessionPossibility): ProfessionPossibility {
  const possibility = { ...value, professionIdentity: value.professionIdentity.trim(), contribution: value.contribution.trim(), rationale: value.rationale.trim(), dependsOn: cleanList(value.dependsOn) };
  if (!possibility.professionIdentity || !possibility.contribution || !possibility.rationale || !["INDEPENDENT", "SEQUENTIAL", "TANDEM"].includes(possibility.collaborationMode)) throw new Error("each Guildhall possibility requires a profession, contribution, rationale, and collaboration mode");
  return possibility;
}
function cleanDecision(value: ProfessionPossibilityDecision): ProfessionPossibilityDecision {
  const targetProfessionIdentity = value.targetProfessionIdentity?.trim() || undefined;
  const decision = { ...value, professionIdentity: value.professionIdentity.trim(), targetProfessionIdentity, rationale: value.rationale.trim() };
  if (!decision.professionIdentity || !decision.rationale || !["ADMIT", "CONSOLIDATE", "REJECT"].includes(decision.disposition)) throw new Error("each Guildhall adjudication decision requires a profession, disposition, and rationale");
  return decision;
}
function cleanQueueItem(value: AdjudicatedProfessionQueueItem): AdjudicatedProfessionQueueItem {
  const item = { ...cleanPossibility(value), position: value.position };
  if (!item.contribution.startsWith("Professional capacity to ")) throw new Error("Guildmaster contributions must describe professional capacity rather than assign mission work");
  return item;
}
function normalizeIdentity(value: string): string { return value.trim().toLowerCase(); }
function cleanList(values: string[]): string[] { return [...new Set(values.map((value) => value.trim()).filter(Boolean))]; }
function ref(value: { identity: string; version: number }): string { return value.identity + "@" + value.version; }
