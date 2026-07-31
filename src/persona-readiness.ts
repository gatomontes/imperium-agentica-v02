import { ArtifactEnvelope, createArtifact } from "./artifact.js";
import { OperativePackage } from "./conscription.js";

export type ReadinessEvidenceKind =
  | "CREATION_CHAIN"
  | "LINEAGE"
  | "BOUNDARIES"
  | "OPERATIONAL_PROOF"
  | "PRODUCTION_ACCEPTANCE";

export interface ReadinessEvidence {
  kind: ReadinessEvidenceKind;
  established: boolean;
  reference: string;
}

export interface ReadinessEvidenceAssessment {
  kind: ReadinessEvidenceKind;
  established: boolean;
  reference: string;
}

export interface PersonaProductionReadiness {
  operativePackageRef: string;
  finding: "READY_DEFERRED" | "READY_CANDIDATE";
  evidence: ReadinessEvidence[];
  evidenceAssessment: ReadinessEvidenceAssessment[];
  liveAuthorityGranted: false;
  activationAuthorized: false;
  deploymentAuthorized: false;
}

export interface PersonaAcceptanceEvidence {
  operationalProofRef: string;
  productionAcceptanceRef: string;
}

export interface PersonaAcceptanceAssessment {
  readinessRef: string;
  finding: "ACCEPTANCE_DEFERRED" | "ACCEPTANCE_CANDIDATE";
  evidence: PersonaAcceptanceEvidence;
  productionAccepted: false;
  liveAuthorityGranted: false;
  activationAuthorized: false;
  deploymentAuthorized: false;
}

export interface PersonaAcceptanceDisposition {
  acceptanceAssessmentRef: string;
  finding: "ACCEPTANCE_DEFERRED" | "ACCEPTANCE_CANDIDATE";
  productionAccepted: false;
  liveAuthorityGranted: false;
  activationAuthorized: false;
  deploymentAuthorized: false;
}

export class PersonaReadiness {
  assess(
    operative: ArtifactEnvelope<OperativePackage>,
    evidence: ReadinessEvidence[],
  ): ArtifactEnvelope<PersonaProductionReadiness> {
    const operativeRef = operative.identity + "@" + operative.version;
    const required: ReadinessEvidenceKind[] = [
      "CREATION_CHAIN",
      "LINEAGE",
      "BOUNDARIES",
      "OPERATIONAL_PROOF",
      "PRODUCTION_ACCEPTANCE",
    ];
    const known = new Set(required);
    const unique = new Set<ReadinessEvidenceKind>();
    const validEvidence = evidence.every((item) => {
      if (!known.has(item.kind) || unique.has(item.kind)) return false;
      unique.add(item.kind);
      return item.reference.trim() !== "";
    });
    const evidenceAssessment = required.map((kind) => {
      const item = evidence.find((candidate) => candidate.kind === kind);
      return {
        kind,
        established: item?.established === true && item.reference.trim() !== "",
        reference: item?.reference ?? "",
      };
    });
    const complete = validEvidence && evidenceAssessment.every((item) => item.established);
    const validPackage = operative.status === "CURRENT" &&
      operative.payload.finding === "OPERATIVE_PACKAGE_CONFORMANT" &&
      operative.payload.state === "PACKAGED";

    return createArtifact(
      "PersonaProductionReadiness",
      "PersonaReadiness",
      operative.correlationId,
      {
        operativePackageRef: operativeRef,
        finding: validPackage && complete ? "READY_CANDIDATE" : "READY_DEFERRED",
        evidence,
        evidenceAssessment,
        liveAuthorityGranted: false,
        activationAuthorized: false,
        deploymentAuthorized: false,
      },
      [operativeRef, ...evidence.map((item) => item.reference)],
    );
  }

  assessAcceptance(
    readiness: ArtifactEnvelope<PersonaProductionReadiness>,
    evidence: PersonaAcceptanceEvidence,
  ): ArtifactEnvelope<PersonaAcceptanceAssessment> {
    if (readiness.status !== "CURRENT" || readiness.payload.operativePackageRef.trim() === "") {
      throw new Error("PersonaReadiness cannot assess acceptance from a stale or incomplete readiness artifact");
    }
    const readinessRef = readiness.identity + "@" + readiness.version;
    const readinessEvidence = new Map(
      readiness.payload.evidenceAssessment.map((item) => [item.kind, item]),
    );
    const operationalProof = readinessEvidence.get("OPERATIONAL_PROOF");
    const productionAcceptance = readinessEvidence.get("PRODUCTION_ACCEPTANCE");
    const validEvidence = evidence.operationalProofRef.trim() !== "" &&
      evidence.productionAcceptanceRef.trim() !== "" &&
      operationalProof?.reference === evidence.operationalProofRef &&
      productionAcceptance?.reference === evidence.productionAcceptanceRef;
    const candidate = readiness.payload.finding === "READY_CANDIDATE" && validEvidence;

    return createArtifact(
      "PersonaAcceptanceAssessment",
      "PersonaReadiness",
      readiness.correlationId,
      {
        readinessRef,
        finding: candidate ? "ACCEPTANCE_CANDIDATE" : "ACCEPTANCE_DEFERRED",
        evidence,
        productionAccepted: false,
        liveAuthorityGranted: false,
        activationAuthorized: false,
        deploymentAuthorized: false,
      },
      [readinessRef, evidence.operationalProofRef, evidence.productionAcceptanceRef],
    );
  }

  recordAcceptanceDisposition(
    assessment: ArtifactEnvelope<PersonaAcceptanceAssessment>,
  ): ArtifactEnvelope<PersonaAcceptanceDisposition> {
    if (assessment.status !== "CURRENT" || assessment.payload.readinessRef.trim() === "") {
      throw new Error("PersonaReadiness cannot record disposition from a stale or incomplete acceptance assessment");
    }
    const assessmentRef = assessment.identity + "@" + assessment.version;
    if (!assessment.sourceRefs.includes(assessment.payload.readinessRef) ||
      !assessment.sourceRefs.includes(assessment.payload.evidence.operationalProofRef) ||
      !assessment.sourceRefs.includes(assessment.payload.evidence.productionAcceptanceRef)) {
      throw new Error("PersonaReadiness cannot record disposition without complete acceptance lineage");
    }
    if (assessment.sourceRefs.includes(assessmentRef) ||
      assessment.payload.finding !== "ACCEPTANCE_DEFERRED" &&
      assessment.payload.finding !== "ACCEPTANCE_CANDIDATE") {
      throw new Error("PersonaReadiness cannot record disposition from an invalid acceptance assessment");
    }

    return createArtifact(
      "PersonaAcceptanceDisposition",
      "PersonaReadiness",
      assessment.correlationId,
      {
        acceptanceAssessmentRef: assessmentRef,
        finding: assessment.payload.finding,
        productionAccepted: false,
        liveAuthorityGranted: false,
        activationAuthorized: false,
        deploymentAuthorized: false,
      },
      [assessmentRef, assessment.payload.readinessRef, ...assessment.sourceRefs.slice(1)],
    );
  }
}
