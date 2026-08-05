import { ArtifactContext, ArtifactEnvelope, GovernedArtifactEnvelope, createArtifact } from "./artifact.js";
import { MissionSpecificationCandidate } from "./castellan-mission-formation.js";
import { ADMITTED_GUILDMASTER_AGENT } from "./guildmaster-agent-definition.js";
import { AdjudicatedProfessionQueueItem, ProfessionAdjudicationPacket } from "./guildhall-mission-committee.js";
import { assertArtifactEnvelope } from "./schema.js";
import { personaCandidateDigest } from "./persona-integrity.js";

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
  evidenceSections: EvidenceAuthoredSections;
}

export interface EvidenceAuthoredSections {
  role: string; identity: string; professionalMandate: string;
  attributes: Array<{ name: string; behavioralExpression: string; conditions: string; limits: string; evidenceReference: string }>;
  methods: Array<{ name: string; application: string; conditions: string; limits: string; evidenceReference: string }>;
  reasoning: { approach: string; evidenceStandard: string; uncertaintyBehavior: string };
  communication: { style: string; requiredDisclosures: string; prohibitedRepresentations: string };
  interface: { expectedInputs: string; expectedOutputs: string };
  acceptanceCriteria: string[];
  authoredBy: "SANCTOGRAPHER"; authenticationRef: string;
}
export interface DoctrineAuthoredSections {
  governance: { authorizedConduct: string; mandatoryConduct: string; prohibitedConduct: string; refusalConditions: string; escalationTriggers: string; stopConditions: string };
  authoredBy: "NOTARY"; authenticationRef: string;
}
export interface InProgressPersonaCandidate {
  templateRef: string; foundryEntryPacketRef: string; artificerQueueRef: string; hagiographyPacketRef: string;
  queuePosition: number; professionIdentity: string; evidenceSections: EvidenceAuthoredSections;
  doctrineSections?: DoctrineAuthoredSections; state: "AWAITING_STUDIUM" | "READY_FOR_PIT";
  artificerAuthoredSubstance: false; artificerAuthenticationRef?: string;
}
export interface StudiumDoctrineCommission {
  candidateRef: string; foundryEntryPacketRef: string; artificerQueueRef: string; hagiographyPacketRef: string;
  queuePosition: number; professionIdentity: string; recipient: "NOTARY"; requestedSections: ["GOVERNANCE"];
}
export interface PersonaCandidatePitDispatch {
  candidateRef: string; candidateDigest: string; templateRef: string; queuePosition: number; professionIdentity: string;
  recipient: "PIT"; purpose: "PERSONA_EXAMINATION"; admissionClaimed: false;
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
  compile(commission: ArtifactEnvelope<HagiographyResearchCommission>, findings: ChroniclerFinding[], evidenceSections: Omit<EvidenceAuthoredSections, "authoredBy" | "authenticationRef">, sanctographerAuthenticationRef: string, context: ArtifactContext = {}): ArtifactEnvelope<HagiographyResearchPacket> {
    assertArtifactEnvelope(commission);
    if (commission.artifactType !== "HagiographyResearchCommission" || commission.producer !== "Artificer" || commission.status !== "CURRENT" || commission.payload.recipient !== "SANCTOGRAPHER" || commission.payload.personaRecommendationRequested || commission.payload.queuePosition !== 1 || commission.payload.profession.position !== 1 || !commission.sourceRefs.includes(commission.payload.artificerQueueRef)) throw new Error("exact current Artificer Hagiography commission is required");
    const authentication = sanctographerAuthenticationRef.trim();
    if (!authentication || findings.length === 0 || findings.some((finding) => !validFinding(finding)) || !validEvidenceSections(evidenceSections)) throw new Error("Sanctographer requires acceptable synthetic Chronicler findings, complete evidence-authored sections, and authentication");
    return createArtifact("HagiographyResearchPacket", "Sanctographer", commission.correlationId, {
      commissionRef: ref(commission), artificerQueueRef: commission.payload.artificerQueueRef, queuePosition: commission.payload.queuePosition,
      professionIdentity: commission.payload.profession.professionIdentity, chroniclerFindings: structuredClone(findings), finding: "RESEARCH_ACCEPTED",
      sanctographerAuthenticationRef: authentication, personaRecommended: false, syntheticOnly: true,
      evidenceSections: { ...structuredClone(evidenceSections), authoredBy: "SANCTOGRAPHER", authenticationRef: authentication },
    }, [ref(commission), commission.payload.artificerQueueRef, authentication, ...findings.map((finding) => finding.sourceRef)], context);
  }
}

export class ArtificerPersonaAssembler {
  receiveResearch(entry: ArtifactEnvelope<FoundryEntryPacket>, queue: ArtifactEnvelope<ArtificerProfessionQueue>, packet: ArtifactEnvelope<HagiographyResearchPacket>, templateRef: string, context: ArtifactContext = {}): ArtifactEnvelope<InProgressPersonaCandidate> {
    assertArtifactEnvelope(entry); assertArtifactEnvelope(queue); assertArtifactEnvelope(packet);
    if (!templateRef.trim() || packet.artifactType !== "HagiographyResearchPacket" || packet.producer !== "Sanctographer" || packet.status !== "CURRENT" || packet.correlationId !== entry.correlationId || packet.payload.artificerQueueRef !== ref(queue) || packet.payload.queuePosition !== queue.payload.activePosition || packet.payload.professionIdentity !== queue.payload.items[0]?.professionIdentity || packet.payload.evidenceSections.authoredBy !== "SANCTOGRAPHER" || packet.payload.evidenceSections.authenticationRef !== packet.payload.sanctographerAuthenticationRef || !validEvidenceSections(packet.payload.evidenceSections)) throw new Error("complete Sanctographer-authored Persona sections for the active queue item are required");
    return createArtifact("InProgressPersonaCandidate", "Artificer", entry.correlationId, {
      templateRef: templateRef.trim(), foundryEntryPacketRef: ref(entry), artificerQueueRef: ref(queue), hagiographyPacketRef: ref(packet),
      queuePosition: packet.payload.queuePosition, professionIdentity: packet.payload.professionIdentity,
      evidenceSections: structuredClone(packet.payload.evidenceSections), state: "AWAITING_STUDIUM", artificerAuthoredSubstance: false,
    }, [templateRef.trim(), ref(entry), ref(queue), ref(packet), packet.payload.sanctographerAuthenticationRef], context);
  }
  commissionStudium(candidate: ArtifactEnvelope<InProgressPersonaCandidate>, context: ArtifactContext = {}): ArtifactEnvelope<StudiumDoctrineCommission> {
    assertArtifactEnvelope(candidate);
    if (candidate.artifactType !== "InProgressPersonaCandidate" || candidate.producer !== "Artificer" || candidate.status !== "CURRENT" || candidate.payload.state !== "AWAITING_STUDIUM" || candidate.payload.doctrineSections || candidate.payload.artificerAuthoredSubstance) throw new Error("exact evidence-complete candidate awaiting Studium is required");
    return createArtifact("StudiumDoctrineCommission", "Artificer", candidate.correlationId, {
      candidateRef: ref(candidate), foundryEntryPacketRef: candidate.payload.foundryEntryPacketRef, artificerQueueRef: candidate.payload.artificerQueueRef,
      hagiographyPacketRef: candidate.payload.hagiographyPacketRef, queuePosition: candidate.payload.queuePosition,
      professionIdentity: candidate.payload.professionIdentity, recipient: "NOTARY", requestedSections: ["GOVERNANCE"],
    }, [ref(candidate), candidate.payload.foundryEntryPacketRef, candidate.payload.artificerQueueRef, candidate.payload.hagiographyPacketRef], context);
  }
  completeForPit(candidate: ArtifactEnvelope<InProgressPersonaCandidate>, doctrine: ArtifactEnvelope<DoctrineAuthoredSections>, artificerAuthenticationRef: string, context: ArtifactContext = {}): ArtifactEnvelope<InProgressPersonaCandidate> {
    assertArtifactEnvelope(candidate); assertArtifactEnvelope(doctrine); const authentication = artificerAuthenticationRef.trim();
    if (!authentication || candidate.payload.state !== "AWAITING_STUDIUM" || doctrine.artifactType !== "PersonaGovernanceSections" || doctrine.producer !== "Notary" || doctrine.status !== "CURRENT" || doctrine.correlationId !== candidate.correlationId || doctrine.payload.authoredBy !== "NOTARY" || !validDoctrineSections(doctrine.payload) || !doctrine.sourceRefs.includes(ref(candidate))) throw new Error("exact complete Notary-authored doctrine sections and Artificer authentication are required");
    return createArtifact("InProgressPersonaCandidate", "Artificer", candidate.correlationId, {
      ...structuredClone(candidate.payload), doctrineSections: structuredClone(doctrine.payload), state: "READY_FOR_PIT",
      artificerAuthoredSubstance: false, artificerAuthenticationRef: authentication,
    }, [ref(candidate), ref(doctrine), authentication], context);
  }
  dispatchToPit(candidate: ArtifactEnvelope<InProgressPersonaCandidate>, context: ArtifactContext = {}): ArtifactEnvelope<PersonaCandidatePitDispatch> {
    assertArtifactEnvelope(candidate);
    if (candidate.artifactType !== "InProgressPersonaCandidate" || candidate.producer !== "Artificer" || candidate.status !== "CURRENT" || candidate.payload.state !== "READY_FOR_PIT" || candidate.payload.artificerAuthoredSubstance || !candidate.payload.artificerAuthenticationRef?.trim() || candidate.payload.evidenceSections.authoredBy !== "SANCTOGRAPHER" || candidate.payload.doctrineSections?.authoredBy !== "NOTARY") throw new Error("exact fully authored and Artificer-authenticated candidate is required for Pit dispatch");
    return createArtifact("PersonaCandidatePitDispatch", "Artificer", candidate.correlationId, {
      candidateRef: ref(candidate), candidateDigest: personaCandidateDigest(candidate), templateRef: candidate.payload.templateRef, queuePosition: candidate.payload.queuePosition,
      professionIdentity: candidate.payload.professionIdentity, recipient: "PIT", purpose: "PERSONA_EXAMINATION", admissionClaimed: false,
    }, [ref(candidate), personaCandidateDigest(candidate), candidate.payload.templateRef, candidate.payload.artificerAuthenticationRef], context);
  }
}

export class NotaryDoctrineDesk {
  author(commission: ArtifactEnvelope<StudiumDoctrineCommission>, candidate: ArtifactEnvelope<InProgressPersonaCandidate>, governance: DoctrineAuthoredSections["governance"], notaryAuthenticationRef: string, context: ArtifactContext = {}): ArtifactEnvelope<DoctrineAuthoredSections> {
    assertArtifactEnvelope(commission); assertArtifactEnvelope(candidate); const authentication = notaryAuthenticationRef.trim();
    const payload: DoctrineAuthoredSections = { governance: structuredClone(governance), authoredBy: "NOTARY", authenticationRef: authentication };
    if (!authentication || commission.artifactType !== "StudiumDoctrineCommission" || commission.producer !== "Artificer" || commission.status !== "CURRENT" || commission.payload.recipient !== "NOTARY" || commission.payload.candidateRef !== ref(candidate) || candidate.payload.state !== "AWAITING_STUDIUM" || !validDoctrineSections(payload)) throw new Error("Notary requires the exact Studium commission and complete doctrine sections");
    return createArtifact("PersonaGovernanceSections", "Notary", commission.correlationId, payload, [ref(commission), ref(candidate), authentication], context);
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
function validEvidenceSections(value: Omit<EvidenceAuthoredSections, "authoredBy" | "authenticationRef"> | EvidenceAuthoredSections): boolean {
  return !!value.role.trim() && !!value.identity.trim() && !!value.professionalMandate.trim() && value.attributes.length > 0 && value.attributes.every((x) => [x.name, x.behavioralExpression, x.conditions, x.limits, x.evidenceReference].every((s) => !!s.trim())) && value.methods.length > 0 && value.methods.every((x) => [x.name, x.application, x.conditions, x.limits, x.evidenceReference].every((s) => !!s.trim())) && [value.reasoning.approach, value.reasoning.evidenceStandard, value.reasoning.uncertaintyBehavior, value.communication.style, value.communication.requiredDisclosures, value.communication.prohibitedRepresentations, value.interface.expectedInputs, value.interface.expectedOutputs].every((s) => !!s.trim()) && value.acceptanceCriteria.length > 0 && value.acceptanceCriteria.every((s) => !!s.trim());
}
function validDoctrineSections(value: DoctrineAuthoredSections): boolean {
  return !!value.authenticationRef.trim() && Object.values(value.governance).every((s) => !!s.trim());
}
function ref(value: { identity: string; version: number }): string { return value.identity + "@" + value.version; }
