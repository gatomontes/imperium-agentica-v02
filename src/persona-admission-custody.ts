import { ArtifactContext, ArtifactEnvelope, createArtifact } from "./artifact.js";
import { FoundryReleasePacket } from "./persona-production-disposition.js";
import { InProgressPersonaCandidate } from "./persona-production-intake.js";
import { assertArtifactEnvelope } from "./schema.js";

export interface CastellanPersonaAdmissionRecord {
  releasePacketRef: string;
  candidateRef: string;
  templateRef: string;
  professionIdentity: string;
  disposition: "ADMIT" | "REJECT";
  rationale: string;
  recipient: "GARRISON" | "FOUNDRY";
  castellanAuthenticationRef: string;
  garrisonAdmissionClaimed: false;
}

export interface GarrisonPersonaCustodyRecord {
  admissionRecordRef: string;
  releasePacketRef: string;
  candidateRef: string;
  templateRef: string;
  professionIdentity: string;
  admittedBy: "CASTELLAN";
  custodyAccepted: true;
  rosterStatus: "AVAILABLE";
  garrisonAuthenticationRef: string;
  admissionAdjudicatedByGarrison: false;
}

export class CastellanPersonaAdmission {
  decide(
    release: ArtifactEnvelope<FoundryReleasePacket>,
    candidate: ArtifactEnvelope<InProgressPersonaCandidate>,
    disposition: "ADMIT" | "REJECT",
    rationale: string,
    castellanAuthenticationRef: string,
    context: ArtifactContext = {},
  ): ArtifactEnvelope<CastellanPersonaAdmissionRecord> {
    assertArtifactEnvelope(release); assertArtifactEnvelope(candidate);
    const reason = rationale.trim();
    const authentication = castellanAuthenticationRef.trim();
    if (!reason || !authentication || release.artifactType !== "FoundryReleasePacket" ||
      release.producer !== "Artificer" || release.status !== "CURRENT" ||
      !release.payload.productionApproved || release.payload.recipient !== "CASTELLAN" ||
      release.payload.admissionClaimed || release.payload.candidateRef !== ref(candidate) ||
      !release.sourceRefs.includes(ref(candidate)) ||
      candidate.artifactType !== "InProgressPersonaCandidate" ||
      candidate.producer !== "Artificer" || candidate.status !== "CURRENT" ||
      candidate.payload.state !== "READY_FOR_PIT" ||
      release.payload.templateRef !== candidate.payload.templateRef ||
      release.payload.professionIdentity !== candidate.payload.professionIdentity ||
      release.correlationId !== candidate.correlationId) {
      throw new Error("Castellan decision requires the exact production-approved Persona release and candidate");
    }
    return createArtifact("CastellanPersonaAdmissionRecord", "Castellan", candidate.correlationId, {
      releasePacketRef: ref(release), candidateRef: ref(candidate),
      templateRef: candidate.payload.templateRef,
      professionIdentity: candidate.payload.professionIdentity,
      disposition, rationale: reason,
      recipient: disposition === "ADMIT" ? "GARRISON" as const : "FOUNDRY" as const,
      castellanAuthenticationRef: authentication,
      garrisonAdmissionClaimed: false as const,
    }, [ref(release), ref(candidate), release.payload.passingPitBriefRef, authentication], context);
  }
}

export class GarrisonPersonaCustody {
  accept(
    admission: ArtifactEnvelope<CastellanPersonaAdmissionRecord>,
    release: ArtifactEnvelope<FoundryReleasePacket>,
    candidate: ArtifactEnvelope<InProgressPersonaCandidate>,
    garrisonAuthenticationRef: string,
    context: ArtifactContext = {},
  ): ArtifactEnvelope<GarrisonPersonaCustodyRecord> {
    assertArtifactEnvelope(admission); assertArtifactEnvelope(release); assertArtifactEnvelope(candidate);
    const authentication = garrisonAuthenticationRef.trim();
    if (!authentication || admission.artifactType !== "CastellanPersonaAdmissionRecord" ||
      admission.producer !== "Castellan" || admission.status !== "CURRENT" ||
      admission.payload.disposition !== "ADMIT" || admission.payload.recipient !== "GARRISON" ||
      admission.payload.garrisonAdmissionClaimed ||
      admission.payload.releasePacketRef !== ref(release) ||
      admission.payload.candidateRef !== ref(candidate) ||
      !admission.sourceRefs.includes(ref(release)) || !admission.sourceRefs.includes(ref(candidate)) ||
      release.artifactType !== "FoundryReleasePacket" || release.producer !== "Artificer" ||
      release.status !== "CURRENT" || !release.payload.productionApproved ||
      release.payload.candidateRef !== ref(candidate) ||
      candidate.artifactType !== "InProgressPersonaCandidate" || candidate.producer !== "Artificer" ||
      candidate.status !== "CURRENT" || candidate.payload.state !== "READY_FOR_PIT" ||
      admission.payload.templateRef !== candidate.payload.templateRef ||
      admission.payload.professionIdentity !== candidate.payload.professionIdentity ||
      admission.correlationId !== release.correlationId ||
      admission.correlationId !== candidate.correlationId) {
      throw new Error("Garrison custody requires the exact Castellan-admitted Persona package");
    }
    return createArtifact("GarrisonPersonaCustodyRecord", "Garrison", candidate.correlationId, {
      admissionRecordRef: ref(admission), releasePacketRef: ref(release), candidateRef: ref(candidate),
      templateRef: candidate.payload.templateRef,
      professionIdentity: candidate.payload.professionIdentity,
      admittedBy: "CASTELLAN" as const, custodyAccepted: true as const,
      rosterStatus: "AVAILABLE" as const, garrisonAuthenticationRef: authentication,
      admissionAdjudicatedByGarrison: false as const,
    }, [ref(admission), ref(release), ref(candidate), authentication], context);
  }
}

function ref(value: { identity: string; version: number }): string {
  return value.identity + "@" + value.version;
}
