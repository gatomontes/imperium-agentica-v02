import { ArtifactContext, ArtifactEnvelope, GovernedArtifactEnvelope, createArtifact } from "./artifact.js";
import { MissionSpecificationCandidate } from "./castellan-mission-formation.js";
import { assertArtifactEnvelope } from "./schema.js";

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

export interface CastellanGuildhallHandoff {
  missionSpecificationCandidateRef: string;
  recipient: "GUILDHALL_COMMITTEE";
  purpose: "PROFESSION_BRAINSTORM";
  authorityCreated: false;
}

export interface ProfessionRecommendationPacket extends ProfessionBrainstormDraft {
  missionSpecificationCandidateRef: string;
  handoffRef: string;
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
  suitabilityDetermined: false;
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
  recordBrainstorm(
    candidate: GovernedArtifactEnvelope<MissionSpecificationCandidate>,
    handoff: ArtifactEnvelope<CastellanGuildhallHandoff>,
    draft: ProfessionBrainstormDraft,
    context: ArtifactContext = {},
  ): ArtifactEnvelope<ProfessionRecommendationPacket> {
    assertCandidate(candidate);
    assertHandoff(candidate, handoff);
    const possibilities = draft.possibilities.map(cleanPossibility);
    if (possibilities.length === 0 || possibilities.length > 8) throw new Error("Guildhall brainstorm requires one to eight profession possibilities");
    const identities = new Set<string>();
    for (const possibility of possibilities) {
      const key = possibility.professionIdentity.toLowerCase();
      if (identities.has(key)) throw new Error("Guildhall profession possibilities must be distinct");
      for (const dependency of possibility.dependsOn) {
        if (!identities.has(dependency.toLowerCase())) throw new Error("Guildhall dependencies must name an earlier profession possibility");
      }
      if (possibility.collaborationMode === "INDEPENDENT" && possibility.dependsOn.length) throw new Error("independent professions may not declare dependencies");
      identities.add(key);
    }
    return createArtifact("ProfessionRecommendationPacket", "GuildhallCommittee", candidate.correlationId, {
      missionSpecificationCandidateRef: ref(candidate),
      handoffRef: ref(handoff),
      possibilities,
      overlaps: cleanList(draft.overlaps),
      missingSpecialties: cleanList(draft.missingSpecialties),
      finding: "PROFESSION_POSSIBILITIES_RECORDED",
      peopleSelected: false,
      operativesSelected: false,
      officersSelected: false,
    }, [ref(candidate), ref(handoff)], context);
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
    return createArtifact("ProfessionAdjudicationPacket", "GuildhallCommittee", candidate.correlationId, {
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
      suitabilityDetermined: false,
    }, [ref(candidate), ref(recommendation)], context);
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
  if (recommendation.artifactType !== "ProfessionRecommendationPacket" || recommendation.producer !== "GuildhallCommittee" || recommendation.status !== "CURRENT" || recommendation.correlationId !== candidate.correlationId || recommendation.payload.missionSpecificationCandidateRef !== ref(candidate) || recommendation.payload.finding !== "PROFESSION_POSSIBILITIES_RECORDED" || recommendation.payload.peopleSelected !== false || recommendation.payload.operativesSelected !== false || recommendation.payload.officersSelected !== false || !recommendation.sourceRefs.includes(ref(candidate))) {
    throw new Error("exact current Guildhall profession recommendation packet is required");
  }
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
function cleanQueueItem(value: AdjudicatedProfessionQueueItem): AdjudicatedProfessionQueueItem { return { ...cleanPossibility(value), position: value.position }; }
function normalizeIdentity(value: string): string { return value.trim().toLowerCase(); }
function cleanList(values: string[]): string[] { return [...new Set(values.map((value) => value.trim()).filter(Boolean))]; }
function ref(value: { identity: string; version: number }): string { return value.identity + "@" + value.version; }
