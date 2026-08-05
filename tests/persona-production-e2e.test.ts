import { describe, expect, it } from "vitest";
import { createArtifact, createGovernedArtifact } from "../src/artifact.js";
import { MissionSpecificationCandidate } from "../src/castellan-mission-formation.js";
import { ADMITTED_GUILDMASTER_AGENT } from "../src/guildmaster-agent-definition.js";
import { ProfessionAdjudicationPacket } from "../src/guildhall-mission-committee.js";
import {
  ArtificerIntake,
  ArtificerPersonaAssembler,
  CastellanFoundryRouter,
  NotaryDoctrineDesk,
  SanctographerResearchDesk,
} from "../src/persona-production-intake.js";
import { PersonaPitExaminer, PitPressureResult } from "../src/persona-pit-examination.js";
import { ArtificerPersonaDisposition } from "../src/persona-production-disposition.js";
import { CastellanPersonaAdmission, GarrisonPersonaCustody } from "../src/persona-admission-custody.js";
import { personaCandidateDigest } from "../src/persona-integrity.js";

const correlationId = "persona-production-e2e-001";
const identityFactory = (identity: string) => ({ identityFactory: () => identity });
const axes: PitPressureResult["axis"][] = ["COMPETENCE", "GOVERNANCE", "EVIDENCE", "UNCERTAINTY", "REFUSAL", "TRAITS", "COHERENCE"];
const passingResults = (): PitPressureResult[] => axes.map((axis) => ({ axis, passed: true, evidence: `${axis} passed under synthetic pressure` }));

describe("synthetic Persona production end to end", () => {
  it("repairs a failed candidate, fully retests it, admits it, and records Garrison custody", () => {
    const mission = createGovernedArtifact<MissionSpecificationCandidate>("MissionSpecificationCandidate", "Castellan", correlationId, {
      dossierRef: "dossier@1", acceptedDeterminationRefs: ["assessment@1"],
      purpose: "Produce a governed accounting Persona", scope: ["accounting review"],
      constraints: ["synthetic evidence only"], acceptanceCriteria: ["preserve the complete authority and identity chain"],
      requestedOutputs: ["admitted Persona"], suppliedClaims: [], assumptions: [], unknowns: [],
      materialContradictions: [], authorityAssertions: [], externalObligationAssertions: [],
      resourceRequirements: ["professional evidence"], unresolvedPredicates: [], state: "CANDIDATE", authorityCreated: false,
    }, {
      coreDoctrineRef: "doctrine@1", lexiconRef: "lexicon@1", officeProfileRef: "castellan@1",
      vocabularyUses: [{ termId: "LEX-062", lexiconRef: "lexicon@1", value: "mission_specification" }],
    }, ["dossier@1"], identityFactory("mission"));

    const guildmasterRef = `${ADMITTED_GUILDMASTER_AGENT.identity}@${ADMITTED_GUILDMASTER_AGENT.version}`;
    const determination = createArtifact<ProfessionAdjudicationPacket>("ProfessionAdjudicationPacket", "Guildmaster", correlationId, {
      missionSpecificationCandidateRef: "mission@1", recommendationPacketRef: "recommendation@1",
      decisions: [{ professionIdentity: "Certified Public Accountant", disposition: "ADMIT", rationale: "required" }],
      queue: [{ position: 1, professionIdentity: "Certified Public Accountant", contribution: "Review accounts",
        rationale: "required", collaborationMode: "INDEPENDENT", dependsOn: [] }],
      capabilityRequirements: [], toolOrAccessRequirements: [], finding: "PROFESSION_QUEUE_RECOMMENDED",
      peopleSelected: false, operativesSelected: false, officersSelected: false, suitabilityDetermined: true,
      guildmasterAgentDefinitionRef: guildmasterRef,
    }, ["mission@1", "recommendation@1", guildmasterRef], identityFactory("determination"));

    const entry = new CastellanFoundryRouter().handoff(mission, determination, identityFactory("entry"));
    const intake = new ArtificerIntake();
    const queue = intake.establishQueue(entry, determination, identityFactory("queue"));
    const researchCommission = intake.commissionFirst(entry, queue, identityFactory("research-commission"));
    const evidenceSections = {
      role: "Certified Public Accountant", identity: "Constructed accounting professional",
      professionalMandate: "Review accounts with evidence discipline",
      attributes: [{ name: "Evidence discipline", behavioralExpression: "Reconciles claims to records",
        conditions: "Accounting review", limits: "Does not invent records", evidenceReference: "synthetic-exemplar@1" }],
      methods: [{ name: "Independent verification", application: "Cross-check ledger assertions",
        conditions: "Records are available", limits: "Discloses missing evidence", evidenceReference: "synthetic-exemplar@1" }],
      reasoning: { approach: "Evidence-led reconciliation", evidenceStandard: "Traceable support", uncertaintyBehavior: "Disclose unresolved uncertainty" },
      communication: { style: "Direct and precise", requiredDisclosures: "Material uncertainty", prohibitedRepresentations: "Unsupported assurance" },
      interface: { expectedInputs: "Accounting records", expectedOutputs: "Evidence-backed findings" },
      acceptanceCriteria: ["Every material finding is traceable"],
    };
    const research = new SanctographerResearchDesk().compile(researchCommission, [{
      syntheticSource: true, sourceRef: "synthetic-exemplar@1", exemplar: "Synthetic exemplar",
      accomplishments: ["reconciled complex ledgers"], demonstratedMethods: ["independent verification"],
      evidencedAttributes: ["evidence discipline"], limitations: ["not a whole-person import"], uncertainty: [],
    }], evidenceSections, "sanctographer@1", identityFactory("research"));

    const assembler = new ArtificerPersonaAssembler();
    const candidate = assembler.receiveResearch(entry, queue, research, "persona-template@0.1.0#sha256:synthetic", identityFactory("candidate"));
    const studiumCommission = assembler.commissionStudium(candidate, identityFactory("studium-commission"));
    const governance = {
      authorizedConduct: "Review supplied accounting records", mandatoryConduct: "Preserve traceability",
      prohibitedConduct: "Fabricate evidence", refusalConditions: "Required records are absent",
      escalationTriggers: "Material contradiction remains", stopConditions: "Authority boundary is exceeded",
    };
    const doctrine = new NotaryDoctrineDesk().author(studiumCommission, candidate, governance, "notary@1", identityFactory("doctrine"));
    const ready = assembler.completeForPit(candidate, doctrine, "artificer@1", identityFactory("ready-candidate"));
    const firstDispatch = assembler.dispatchToPit(ready, identityFactory("dispatch-1"));

    const failedResults = passingResults().map((result) => result.axis === "GOVERNANCE"
      ? { ...result, passed: false, defect: "refusal boundary fails under pressure", repairTarget: "NOTARY" as const }
      : result);
    const failedBrief = new PersonaPitExaminer().examine(firstDispatch, ready, failedResults, "pit@1", identityFactory("pit-fail"));

    const disposition = new ArtificerPersonaDisposition();
    const repairCommission = disposition.routeFailure(failedBrief, ready, identityFactory("repair-commission"));
    const repaired = disposition.completeRepair(ready, failedBrief, repairCommission, {
      doctrineSections: { governance: { ...governance, refusalConditions: "Refuse whenever required records cannot be authenticated" },
        authoredBy: "NOTARY", authenticationRef: "notary@2" },
    }, "artificer@2");

    expect(repaired).toMatchObject({ identity: "ready-candidate", version: 2, supersedes: "ready-candidate@1" });
    expect(repairCommission.payload.fullRetestRequired).toBe(true);
    expect(() => disposition.approveProduction(firstDispatch, repaired, failedBrief, "artificer@approval"))
      .toThrow("exact candidate, dispatch, and passing Pit brief");

    const secondDispatch = assembler.dispatchToPit(repaired, identityFactory("dispatch-2"));
    const passingBrief = new PersonaPitExaminer().examine(secondDispatch, repaired, passingResults(), "pit@2", identityFactory("pit-pass"));
    const release = disposition.approveProduction(secondDispatch, repaired, passingBrief, "artificer@approval", identityFactory("release"));
    const admission = new CastellanPersonaAdmission().decide(
      release, repaired, passingBrief, "ADMIT", "Passed examination and approved for roster admission", "castellan@admission",
      identityFactory("admission"),
    );
    const custody = new GarrisonPersonaCustody().accept(
      admission, release, repaired, passingBrief, "garrison@custody", identityFactory("custody"),
    );

    expect(passingBrief.payload).toMatchObject({ finding: "PASS", recipient: "FOUNDRY", candidateRef: "ready-candidate@2" });
    expect(release.payload).toMatchObject({ candidateRef: "ready-candidate@2", productionApproved: true, recipient: "CASTELLAN", admissionClaimed: false });
    expect(admission.payload).toMatchObject({ disposition: "ADMIT", recipient: "GARRISON", garrisonAdmissionClaimed: false });
    expect(custody.payload).toMatchObject({ candidateRef: "ready-candidate@2", candidateDigest: personaCandidateDigest(repaired),
      admittedBy: "CASTELLAN", custodyAccepted: true, rosterStatus: "AVAILABLE", admissionAdjudicatedByGarrison: false });
  });
});
