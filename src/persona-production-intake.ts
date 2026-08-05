import { ArtifactContext, ArtifactEnvelope, GovernedArtifactEnvelope, createArtifact } from "./artifact.js";
import { MissionSpecificationCandidate } from "./castellan-mission-formation.js";
import { ADMITTED_GUILDMASTER_AGENT } from "./guildmaster-agent-definition.js";
import { AdjudicatedProfessionQueueItem, ProfessionAdjudicationPacket } from "./guildhall-mission-committee.js";
import { assertArtifactEnvelope } from "./schema.js";

export interface FoundryEntryPacket {
  missionSpecificationCandidateRef: string;
  professionDeterminationRef: string;
  operatorRequirements: string[];
  missionContext: { purpose: string; scope: string[]; constraints: string[]; acceptanceCriteria: string[]; requestedOutputs: string[] };
  recipient: "ARTIFICER";
  authorityCreated: false;
}
export interface ArtificerProfessionQueue {
  foundryEntryPacketRef: string; professionDeterminationRef: string; items: AdjudicatedProfessionQueueItem[];
  activePosition: 1; finding: "FOUNDRY_QUEUE_ESTABLISHED"; orderAltered: false;
}
export interface HagiographyResearchCommission {
  foundryEntryPacketRef: string; artificerQueueRef: string; queuePosition: number; profession: AdjudicatedProfessionQueueItem;
  requestedResearch: ["EXEMPLARS", "ACCOMPLISHMENTS", "METHODS", "ATTRIBUTES"];
  recipient: "SANCTOGRAPHER"; personaRecommendationRequested: false;
}
export interface ChroniclerFinding {
  syntheticSource: true; sourceRef: string; exemplar: string; accomplishments: string[]; demonstratedMethods: string[];
  evidencedAttributes: string[]; limitations: string[]; uncertainty: string[];
}
export interface HagiographyResearchPacket {
  commissionRef: string; artificerQueueRef: string; queuePosition: number; professionIdentity: string;
  chroniclerFindings: ChroniclerFinding[]; finding: "RESEARCH_ACCEPTED"; sanctographerAuthenticationRef: string;
  personaRecommended: false; syntheticOnly: true;
}

export class CastellanFoundryRouter {
  handoff(mission: GovernedArtifactEnvelope<MissionSpecificationCandidate>, determination: ArtifactEnvelope<ProfessionAdjudicationPacket>, context: ArtifactContext = {}): ArtifactEnvelope<FoundryEntryPacket> {
    assertMission(mission); assertDetermination(mission, determination);
    return createArtifact("FoundryEntryPacket", "Castellan", mission.correlationId, {
      missionSpecificationCandidateRef: ref(mission), professionDeterminationRef: ref(determination),
      operatorRequirements: [...mission.payload.resourceRequirements],
      missionContext: { purpose: mission.payload.purpose, scope: [...mission.payload.scope], constraints: [...mission.payload.constraints], acceptanceCriteria: [...mission.payload.acceptanceCriteria], requestedOutputs: [...mission.payload.requestedOutputs] },
      recipient: "ARTIFICER", authorityCreated: false,
    }, [ref(mission), ref(determination)], context);
  }
}

export class ArtificerIntake {
  establishQueue(entry: ArtifactEnvelope<FoundryEntryPacket>, determination: ArtifactEnvelope<ProfessionAdjudicationPacket>, context: ArtifactContext = {}): ArtifactEnvelope<ArtificerProfessionQueue> {
    assertEntry(entry, determination);
    return createArtifact("ArtificerProfessionQueue", "Artificer", entry.correlationId, {
      foundryEntryPacketRef: ref(entry), professionDeterminationRef: ref(determination), items: structuredClone(determination.payload.queue),
      activePosition: 1, finding: "FOUNDRY_QUEUE_ESTABLISHED", orderAltered: false,
    }, [ref(entry), ref(determination)], context);
  }
  commissionFirst(entry: ArtifactEnvelope<FoundryEntryPacket>, queue: ArtifactEnvelope<ArtificerProfessionQueue>, context: ArtifactContext = {}): ArtifactEnvelope<HagiographyResearchCommission> {
    assertArtifactEnvelope(entry); assertArtifactEnvelope(queue); const first = queue.payload.items[0];
    if (entry.artifactType !== "FoundryEntryPacket" || entry.producer !== "Castellan" || entry.status !== "CURRENT" || queue.artifactType !== "ArtificerProfessionQueue" || queue.producer !== "Artificer" || queue.status !== "CURRENT" || queue.correlationId !== entry.correlationId || queue.payload.foundryEntryPacketRef !== ref(entry) || queue.payload.professionDeterminationRef !== entry.payload.professionDeterminationRef || queue.payload.activePosition !== 1 || queue.payload.orderAltered || queue.payload.finding !== "FOUNDRY_QUEUE_ESTABLISHED" || !first || first.position !== 1 || !queue.sourceRefs.includes(ref(entry))) throw new Error("exact current Artificer queue for the Foundry entry packet is required");
    return createArtifact("HagiographyResearchCommission", "Artificer", entry.correlationId, {
      foundryEntryPacketRef: ref(entry), artificerQueueRef: ref(queue), queuePosition: 1, profession: structuredClone(first),
      requestedResearch: ["EXEMPLARS", "ACCOMPLISHMENTS", "METHODS", "ATTRIBUTES"], recipient: "SANCTOGRAPHER", personaRecommendationRequested: false,
    }, [ref(entry), ref(queue), entry.payload.professionDeterminationRef], context);
  }
}

export class SanctographerResearchDesk {
  compile(commission: ArtifactEnvelope<HagiographyResearchCommission>, findings: ChroniclerFinding[], sanctographerAuthenticationRef: string, context: ArtifactContext = {}): ArtifactEnvelope<HagiographyResearchPacket> {
    assertArtifactEnvelope(commission);
    if (commission.artifactType !== "HagiographyResearchCommission" || commission.producer !== "Artificer" || commission.status !== "CURRENT" || commission.payload.recipient !== "SANCTOGRAPHER" || commission.payload.personaRecommendationRequested || commission.payload.queuePosition !== 1 || commission.payload.profession.position !== 1 || !commission.sourceRefs.includes(commission.payload.artificerQueueRef)) throw new Error("exact current Artificer Hagiography commission is required");
    const authentication = sanctographerAuthenticationRef.trim();
    if (!authentication || findings.length === 0 || findings.some((finding) => !validFinding(finding))) throw new Error("Sanctographer requires acceptable synthetic Chronicler findings and authentication");
    return createArtifact("HagiographyResearchPacket", "Sanctographer", commission.correlationId, {
      commissionRef: ref(commission), artificerQueueRef: commission.payload.artificerQueueRef, queuePosition: commission.payload.queuePosition,
      professionIdentity: commission.payload.profession.professionIdentity, chroniclerFindings: structuredClone(findings), finding: "RESEARCH_ACCEPTED",
      sanctographerAuthenticationRef: authentication, personaRecommended: false, syntheticOnly: true,
    }, [ref(commission), commission.payload.artificerQueueRef, authentication, ...findings.map((finding) => finding.sourceRef)], context);
  }
}

function assertMission(mission: GovernedArtifactEnvelope<MissionSpecificationCandidate>): void {
  assertArtifactEnvelope(mission);
  if (mission.artifactType !== "MissionSpecificationCandidate" || mission.producer !== "Castellan" || mission.status !== "CURRENT" || mission.payload.state !== "CANDIDATE" || mission.payload.authorityCreated || !mission.payload.purpose.trim() || mission.payload.unresolvedPredicates.length) throw new Error("exact resolved current Castellan Mission Specification Candidate is required");
}
function assertDetermination(mission: GovernedArtifactEnvelope<MissionSpecificationCandidate>, determination: ArtifactEnvelope<ProfessionAdjudicationPacket>): void {
  assertArtifactEnvelope(determination); const guildmasterRef = ref(ADMITTED_GUILDMASTER_AGENT);
  if (determination.artifactType !== "ProfessionAdjudicationPacket" || determination.producer !== "Guildmaster" || determination.status !== "CURRENT" || determination.correlationId !== mission.correlationId || determination.payload.missionSpecificationCandidateRef !== ref(mission) || determination.payload.finding !== "PROFESSION_QUEUE_RECOMMENDED" || !determination.payload.suitabilityDetermined || determination.payload.guildmasterAgentDefinitionRef !== guildmasterRef || !determination.sourceRefs.includes(guildmasterRef) || determination.payload.queue.length === 0) throw new Error("exact Guildmaster-admitted profession determination is required");
}
function assertEntry(entry: ArtifactEnvelope<FoundryEntryPacket>, determination: ArtifactEnvelope<ProfessionAdjudicationPacket>): void {
  assertArtifactEnvelope(entry); assertArtifactEnvelope(determination);
  if (entry.artifactType !== "FoundryEntryPacket" || entry.producer !== "Castellan" || entry.status !== "CURRENT" || entry.payload.recipient !== "ARTIFICER" || entry.payload.authorityCreated || entry.correlationId !== determination.correlationId || entry.payload.professionDeterminationRef !== ref(determination) || !entry.sourceRefs.includes(ref(determination))) throw new Error("exact current Castellan Foundry entry packet is required");
}
function validFinding(finding: ChroniclerFinding): boolean {
  return finding.syntheticSource === true && !!finding.sourceRef.trim() && !!finding.exemplar.trim() && finding.accomplishments.some(Boolean) && finding.demonstratedMethods.some(Boolean) && finding.evidencedAttributes.some(Boolean) && finding.limitations.some(Boolean);
}
function ref(value: { identity: string; version: number }): string { return value.identity + "@" + value.version; }
