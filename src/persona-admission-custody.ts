import { ArtifactContext, ArtifactEnvelope, createArtifact } from "./artifact.js";
import { FoundryReleasePacket } from "./persona-production-disposition.js";
import { InProgressPersonaCandidate } from "./persona-production-intake.js";
import { PersonaPitBrief } from "./persona-pit-examination.js";
import { personaCandidateDigest } from "./persona-integrity.js";
import { assertArtifactEnvelope } from "./schema.js";

export interface CastellanPersonaAdmissionRecord {
  releasePacketRef: string;
  passingPitBriefRef: string;
  candidateRef: string;
  candidateDigest: string;
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
  passingPitBriefRef: string;
  candidateRef: string;
  candidateDigest: string;
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
    passingBrief: ArtifactEnvelope<PersonaPitBrief>,
    disposition: "ADMIT" | "REJECT",
    rationale: string,
    castellanAuthenticationRef: string,
    context: ArtifactContext = {},
  ): ArtifactEnvelope<CastellanPersonaAdmissionRecord> {
    assertArtifactEnvelope(release); assertArtifactEnvelope(candidate); assertArtifactEnvelope(passingBrief);
    const reason = rationale.trim();
    const authentication = castellanAuthenticationRef.trim();
    const digest = personaCandidateDigest(candidate);
    if (!reason || !authentication || release.artifactType !== "FoundryReleasePacket" ||
      release.producer !== "Artificer" || release.status !== "CURRENT" ||
      !release.payload.productionApproved || release.payload.recipient !== "CASTELLAN" ||
      release.payload.admissionClaimed || release.payload.candidateRef !== ref(candidate) ||
      release.payload.candidateDigest !== digest || release.payload.passingPitBriefRef !== ref(passingBrief) ||
      !release.sourceRefs.includes(ref(candidate)) || !release.sourceRefs.includes(digest) ||
      !release.sourceRefs.includes(ref(passingBrief)) ||
      candidate.artifactType !== "InProgressPersonaCandidate" ||
      candidate.producer !== "Artificer" || candidate.status !== "CURRENT" ||
      candidate.payload.state !== "READY_FOR_PIT" ||
      passingBrief.artifactType !== "PersonaPitBrief" || passingBrief.producer !== "Pit" ||
      passingBrief.status !== "CURRENT" || passingBrief.payload.finding !== "PASS" ||
      passingBrief.payload.recipient !== "FOUNDRY" || passingBrief.payload.admissionClaimed ||
      passingBrief.payload.candidateRef !== ref(candidate) || passingBrief.payload.candidateDigest !== digest ||
      passingBrief.payload.dispatchRef !== release.payload.pitDispatchRef ||
      !passingBrief.payload.pitAuthenticationRef.trim() ||
      !passingBrief.sourceRefs.includes(ref(candidate)) || !passingBrief.sourceRefs.includes(digest) ||
      release.payload.templateRef !== candidate.payload.templateRef ||
      passingBrief.payload.candidateTemplateRef !== candidate.payload.templateRef ||
      release.payload.professionIdentity !== candidate.payload.professionIdentity ||
      release.correlationId !== candidate.correlationId ||
      passingBrief.correlationId !== candidate.correlationId) {
      throw new Error("Castellan decision requires the exact production-approved Persona, verified passing Pit brief, and content digest");
    }
    return createArtifact("CastellanPersonaAdmissionRecord", "Castellan", candidate.correlationId, {
      releasePacketRef: ref(release), passingPitBriefRef: ref(passingBrief),
      candidateRef: ref(candidate), candidateDigest: digest,
      templateRef: candidate.payload.templateRef,
      professionIdentity: candidate.payload.professionIdentity,
      disposition, rationale: reason,
      recipient: disposition === "ADMIT" ? "GARRISON" as const : "FOUNDRY" as const,
      castellanAuthenticationRef: authentication,
      garrisonAdmissionClaimed: false as const,
    }, [ref(release), ref(passingBrief), ref(candidate), digest, passingBrief.payload.pitAuthenticationRef, authentication], context);
  }
}

export class GarrisonPersonaCustody {
  accept(
    admission: ArtifactEnvelope<CastellanPersonaAdmissionRecord>,
    release: ArtifactEnvelope<FoundryReleasePacket>,
    candidate: ArtifactEnvelope<InProgressPersonaCandidate>,
    passingBrief: ArtifactEnvelope<PersonaPitBrief>,
    garrisonAuthenticationRef: string,
    context: ArtifactContext = {},
  ): ArtifactEnvelope<GarrisonPersonaCustodyRecord> {
    assertArtifactEnvelope(admission); assertArtifactEnvelope(release);
    assertArtifactEnvelope(candidate); assertArtifactEnvelope(passingBrief);
    const authentication = garrisonAuthenticationRef.trim();
    const digest = personaCandidateDigest(candidate);
    if (!authentication || admission.artifactType !== "CastellanPersonaAdmissionRecord" ||
      admission.producer !== "Castellan" || admission.status !== "CURRENT" ||
      admission.payload.disposition !== "ADMIT" || admission.payload.recipient !== "GARRISON" ||
      admission.payload.garrisonAdmissionClaimed ||
      admission.payload.releasePacketRef !== ref(release) ||
      admission.payload.passingPitBriefRef !== ref(passingBrief) ||
      admission.payload.candidateRef !== ref(candidate) || admission.payload.candidateDigest !== digest ||
      !admission.sourceRefs.includes(ref(release)) || !admission.sourceRefs.includes(ref(passingBrief)) ||
      !admission.sourceRefs.includes(ref(candidate)) || !admission.sourceRefs.includes(digest) ||
      release.artifactType !== "FoundryReleasePacket" || release.producer !== "Artificer" ||
      release.status !== "CURRENT" || !release.payload.productionApproved ||
      release.payload.candidateRef !== ref(candidate) || release.payload.candidateDigest !== digest ||
      release.payload.passingPitBriefRef !== ref(passingBrief) ||
      passingBrief.artifactType !== "PersonaPitBrief" || passingBrief.producer !== "Pit" ||
      passingBrief.status !== "CURRENT" || passingBrief.payload.finding !== "PASS" ||
      passingBrief.payload.candidateRef !== ref(candidate) || passingBrief.payload.candidateDigest !== digest ||
      passingBrief.payload.dispatchRef !== release.payload.pitDispatchRef ||
      !passingBrief.payload.pitAuthenticationRef.trim() ||
      candidate.artifactType !== "InProgressPersonaCandidate" || candidate.producer !== "Artificer" ||
      candidate.status !== "CURRENT" || candidate.payload.state !== "READY_FOR_PIT" ||
      admission.payload.templateRef !== candidate.payload.templateRef ||
      admission.payload.professionIdentity !== candidate.payload.professionIdentity ||
      admission.correlationId !== release.correlationId ||
      admission.correlationId !== candidate.correlationId ||
      admission.correlationId !== passingBrief.correlationId) {
      throw new Error("Garrison custody requires the exact Castellan-admitted Persona package and verified Pit proof");
    }
    return createArtifact("GarrisonPersonaCustodyRecord", "Garrison", candidate.correlationId, {
      admissionRecordRef: ref(admission), releasePacketRef: ref(release),
      passingPitBriefRef: ref(passingBrief), candidateRef: ref(candidate), candidateDigest: digest,
      templateRef: candidate.payload.templateRef,
      professionIdentity: candidate.payload.professionIdentity,
      admittedBy: "CASTELLAN" as const, custodyAccepted: true as const,
      rosterStatus: "AVAILABLE" as const, garrisonAuthenticationRef: authentication,
      admissionAdjudicatedByGarrison: false as const,
    }, [ref(admission), ref(release), ref(passingBrief), ref(candidate), digest, authentication], context);
  }
}

function ref(value: { identity: string; version: number }): string {
  return value.identity + "@" + value.version;
}
