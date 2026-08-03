import { createArtifact } from "./artifact.js";
import { ENACTED_CORE_DOCTRINE_V6 } from "./enacted-core-doctrine-v6.js";
import { OfficeDoctrineProfile } from "./office-doctrine-profile.js";

const doctrine = ENACTED_CORE_DOCTRINE_V6.doctrine;
const doctrineRef = `${doctrine.identity}@${doctrine.version}`;

export const ADMITTED_GUILDHALL_PROFILE = createArtifact<OfficeDoctrineProfile>("OfficeDoctrineProfile", "Guildhall", "guildhall-profile-001", {
  officeId: "Guildhall", arena: "CITADEL", title: "Guildhall Office Doctrine Profile v1",
  purpose: "Govern profession discovery, professional-boundary analysis, and authoritative profession-queue suitability determination.",
  coreDoctrineRef: doctrineRef, lexiconRef: doctrine.payload.lexiconRef, assignedSenatorId: doctrine.payload.assignedSenatorId,
  issuerAuthorityRef: "DR-033#guildhall-profession-resolution-authority",
  applications: doctrine.payload.provisions.map((provision) => ({ provisionId: provision.provisionId, applicability: "APPLIES" as const, applicationRule: "Apply the provision to Guildhall profession discovery and suitability determination.", verificationMethod: "Pressure-test Guildhall inputs, outputs, authority, and refusal boundaries.", evidenceRequirements: ["tests/guildmaster-resident-agent.test.ts", "tests/guildhall-mission-committee.test.ts"], invalidationConditions: ["Guildhall exceeds profession-resolution authority or loses exact lineage."] })),
  domainStandardRefs: ["guildhall-profession-resolution-standard@1"],
  prohibitedInterpretations: ["Guildhall may select people, Personas, Operatives, or Officers.", "Guildhall may plan or execute a mission.", "Castellan or Rector determines professional suitability."],
  profileRevisionConditions: ["Guildhall jurisdiction or profession-resolution contracts change.", "Pressure testing reveals an authority or semantic defect."],
  terminologyGateEvidenceRefs: ["tests/guildmaster-resident-agent.test.ts"], state: "ADMITTED",
}, [doctrineRef, doctrine.payload.lexiconRef, "DR-033#guildhall-profession-resolution-authority"], { identityFactory: () => "officeprofile-guildhall-v1", now: () => "2026-08-03T23:20:00.000Z" });
