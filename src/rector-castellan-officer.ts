import { ArtifactContext, GovernedArtifactContext, GovernedArtifactEnvelope, createGovernedArtifact } from "./artifact.js";
import { ADMITTED_CASTELLAN_PROFILE } from "./castellan-doctrine-profile.js";
import { CastellanEvaluation, CastellanMissionFormation, CastellanOperatingLayer, PredicateDetermination, assertCastellanHandoffReceipt } from "./castellan-mission-formation.js";
import { CognitivePortSpecification, createCognitivePort } from "./cognitionist.js";
import { ENACTED_IMPERIUM_LEXICON_V4 } from "./imperium-lexicon-v4.js";
import { ADMITTED_RECTOR } from "./rector-officer-profile.js";
import { LexiconAuthority, TerminologyConformanceGate } from "./senate-lexicon.js";
import { MissionDossier, SecretariatDossierHandoff } from "./secretariat-mission-dossier.js";

export interface RectorCognitiveDraft { determinations: PredicateDetermination[]; }
export interface RectorPredicateInterpretation { officerPersonaRef: string; dossierRef: string; handoffRef: string; determinations: PredicateDetermination[]; researchPerformed: false; judgmentRendered: false; authorityCreated: false; }
export interface RectorCognitivePort { assessMissionPredicates(dossier: MissionDossier): RectorCognitiveDraft; }

const officerRef = ADMITTED_RECTOR.identity + "@" + ADMITTED_RECTOR.version;
const officeProfileRef = ADMITTED_CASTELLAN_PROFILE.identity + "@" + ADMITTED_CASTELLAN_PROFILE.version;
const doctrineRef = ADMITTED_CASTELLAN_PROFILE.payload.coreDoctrineRef;
const lexiconRef = ADMITTED_CASTELLAN_PROFILE.payload.lexiconRef;
const gate = new TerminologyConformanceGate(new LexiconAuthority(ENACTED_IMPERIUM_LEXICON_V4.lexicon, lexiconRef));

export const RECTOR_COGNITIVE_PORT: GovernedArtifactEnvelope<CognitivePortSpecification> = createCognitivePort({ portId: "rector.mission_formation.v1", operations: ["assess_mission_predicates"], inputSchemaRefs: ["schema:mission-dossier@1"], outputSchemaRefs: ["schema:rector-predicate-interpretation@1"], failureModes: ["AMBIGUOUS", "CONTRADICTORY", "UNUSABLE", "INSUFFICIENT_EVIDENCE"], evidenceRequirements: ["exact_question_ref", "exact_answer", "disposition", "rationale"] }, "Castellan", "rector-cognitive-port-001", officeProfileRef, { identityFactory: (prefix) => prefix + "-rector", now: () => "2026-08-03T05:00:00.000Z" });

export class RectorCastellanOfficer {
  private readonly formation = new CastellanMissionFormation();
  private readonly operatingLayer = new CastellanOperatingLayer();
  constructor(private readonly cognition: RectorCognitivePort) { if (ADMITTED_RECTOR.payload.state !== "ADMITTED" || ADMITTED_RECTOR.payload.officeProfileRef !== officeProfileRef) throw new Error("current admitted Rector Persona is required"); }

  initiateInquiry(dossier: GovernedArtifactEnvelope<MissionDossier>, context: ArtifactContext = {}): CastellanEvaluation { return this.formation.evaluate(dossier, undefined, undefined, context); }

  evaluateHandoff(dossier: GovernedArtifactEnvelope<MissionDossier>, handoff: GovernedArtifactEnvelope<SecretariatDossierHandoff>, context: ArtifactContext = {}) {
    assertCastellanHandoffReceipt(dossier, handoff);
    const draft = this.cognition.assessMissionPredicates(structuredClone(dossier.payload));
    const governance = governed([["LEX-049", "officer"], ["LEX-012", "castellan"], ["LEX-060", "cognitive_process"], ["LEX-063", "mission_formation"]]); gate.assertGovernance(governance);
    const interpretation = createGovernedArtifact<RectorPredicateInterpretation>("RectorPredicateInterpretation", "Rector", dossier.correlationId, { officerPersonaRef: officerRef, dossierRef: ref(dossier), handoffRef: ref(handoff), determinations: draft.determinations, researchPerformed: false, judgmentRendered: false, authorityCreated: false }, governance, [officerRef, officeProfileRef, ref(dossier), ref(handoff), doctrineRef, lexiconRef], context);
    const assessment = this.operatingLayer.recordAssessment(dossier, handoff, interpretation, context);
    return { interpretation, assessment, result: this.formation.evaluate(dossier, handoff, assessment, context) };
  }
}

function governed(uses: Array<[string, string]>): GovernedArtifactContext { return { coreDoctrineRef: doctrineRef, lexiconRef, officeProfileRef, vocabularyUses: uses.map(([termId, value]) => ({ termId, value, lexiconRef })) }; }
function ref(value: { identity: string; version: number }): string { return value.identity + "@" + value.version; }
