import { ArtifactContext, ArtifactEnvelope, createArtifact } from "./artifact.js";
import { EvidenceAuthoredSections, InProgressPersonaCandidate, DoctrineAuthoredSections, PersonaCandidatePitDispatch } from "./persona-production-intake.js";
import { PersonaPitBrief } from "./persona-pit-examination.js";
import { assertArtifactEnvelope } from "./schema.js";
import { personaCandidateDigest } from "./persona-integrity.js";

type RepairAuthor = "SANCTOGRAPHER" | "NOTARY" | "ARTIFICER";

export interface PersonaRepairCommission {
  failedPitBriefRef: string;
  failedCandidateRef: string;
  repairTargets: PersonaPitBrief["repairTargets"];
  responsibleAuthors: RepairAuthor[];
  fullRetestRequired: true;
  admissionClaimed: false;
}

export interface FoundryReleasePacket {
  candidateRef: string;
  candidateDigest: string;
  pitDispatchRef: string;
  passingPitBriefRef: string;
  templateRef: string;
  professionIdentity: string;
  productionApproved: true;
  recipient: "CASTELLAN";
  admissionClaimed: false;
  artificerAuthenticationRef: string;
}

export class ArtificerPersonaDisposition {
  routeFailure(
    brief: ArtifactEnvelope<PersonaPitBrief>,
    candidate: ArtifactEnvelope<InProgressPersonaCandidate>,
    context: ArtifactContext = {},
  ): ArtifactEnvelope<PersonaRepairCommission> {
    assertArtifactEnvelope(brief); assertArtifactEnvelope(candidate);
    if (brief.artifactType !== "PersonaPitBrief" || brief.producer !== "Pit" || brief.status !== "CURRENT" ||
      brief.payload.finding !== "FAIL" || brief.payload.recipient !== "ARTIFICER" || brief.payload.admissionClaimed ||
      brief.payload.candidateRef !== ref(candidate) || brief.payload.candidateDigest !== personaCandidateDigest(candidate) || !brief.sourceRefs.includes(ref(candidate)) || !brief.sourceRefs.includes(brief.payload.candidateDigest) ||
      candidate.artifactType !== "InProgressPersonaCandidate" || candidate.producer !== "Artificer" ||
      candidate.status !== "CURRENT" || candidate.payload.state !== "READY_FOR_PIT" ||
      brief.correlationId !== candidate.correlationId || brief.payload.repairTargets.length === 0) {
      throw new Error("exact failed Pit brief and examined Persona Candidate are required");
    }
    const responsibleAuthors = [...new Set(brief.payload.repairTargets.map((target) => target.responsibleAuthor))];
    return createArtifact("PersonaRepairCommission", "Artificer", candidate.correlationId, {
      failedPitBriefRef: ref(brief), failedCandidateRef: ref(candidate),
      repairTargets: structuredClone(brief.payload.repairTargets), responsibleAuthors,
      fullRetestRequired: true, admissionClaimed: false,
    }, [ref(brief), ref(candidate), ...brief.payload.repairTargets.map((target) => target.responsibleAuthor)], context);
  }

  completeRepair(
    original: ArtifactEnvelope<InProgressPersonaCandidate>,
    brief: ArtifactEnvelope<PersonaPitBrief>,
    commission: ArtifactEnvelope<PersonaRepairCommission>,
    repaired: { evidenceSections?: EvidenceAuthoredSections; doctrineSections?: DoctrineAuthoredSections; artificerRepairAttestation?: string },
    artificerAuthenticationRef: string,
    context: ArtifactContext = {},
  ): ArtifactEnvelope<InProgressPersonaCandidate> {
    assertArtifactEnvelope(original); assertArtifactEnvelope(brief); assertArtifactEnvelope(commission);
    const authentication = artificerAuthenticationRef.trim();
    const targets = new Set(commission.payload.responsibleAuthors);
    if (!authentication || commission.artifactType !== "PersonaRepairCommission" || commission.producer !== "Artificer" ||
      commission.status !== "CURRENT" || !commission.payload.fullRetestRequired || commission.payload.admissionClaimed ||
      commission.payload.failedCandidateRef !== ref(original) || commission.payload.failedPitBriefRef !== ref(brief) ||
      !commission.sourceRefs.includes(ref(original)) || !commission.sourceRefs.includes(ref(brief)) ||
      brief.payload.finding !== "FAIL" || brief.payload.candidateRef !== ref(original) ||
      original.payload.state !== "READY_FOR_PIT" || commission.correlationId !== original.correlationId) {
      throw new Error("exact current repair commission, failed brief, and candidate are required");
    }
    if (targets.has("SANCTOGRAPHER") && (!repaired.evidenceSections || repaired.evidenceSections.authoredBy !== "SANCTOGRAPHER" ||
      repaired.evidenceSections.authenticationRef === original.payload.evidenceSections.authenticationRef)) {
      throw new Error("Sanctographer-targeted repair requires newly authenticated evidence sections");
    }
    if (targets.has("NOTARY") && (!repaired.doctrineSections || repaired.doctrineSections.authoredBy !== "NOTARY" ||
      repaired.doctrineSections.authenticationRef === original.payload.doctrineSections?.authenticationRef)) {
      throw new Error("Notary-targeted repair requires newly authenticated doctrine sections");
    }
    if (targets.has("ARTIFICER") && !repaired.artificerRepairAttestation?.trim()) {
      throw new Error("Artificer-targeted structural repair requires an attestation");
    }
    const evidenceSections = repaired.evidenceSections ?? original.payload.evidenceSections;
    const doctrineSections = repaired.doctrineSections ?? original.payload.doctrineSections;
    if (!doctrineSections) throw new Error("repaired candidate requires complete doctrine sections");
    return {
      ...createArtifact("InProgressPersonaCandidate", "Artificer", original.correlationId, {
        ...structuredClone(original.payload), evidenceSections: structuredClone(evidenceSections),
        doctrineSections: structuredClone(doctrineSections), state: "READY_FOR_PIT" as const,
        artificerAuthoredSubstance: false as const, artificerAuthenticationRef: authentication,
      }, [ref(original), ref(brief), ref(commission), evidenceSections.authenticationRef,
        doctrineSections.authenticationRef, authentication, ...(repaired.artificerRepairAttestation ? [repaired.artificerRepairAttestation.trim()] : [])], context),
      identity: original.identity,
      version: original.version + 1,
      supersedes: ref(original),
    };
  }

  approveProduction(
    dispatch: ArtifactEnvelope<PersonaCandidatePitDispatch>,
    candidate: ArtifactEnvelope<InProgressPersonaCandidate>,
    brief: ArtifactEnvelope<PersonaPitBrief>,
    artificerAuthenticationRef: string,
    context: ArtifactContext = {},
  ): ArtifactEnvelope<FoundryReleasePacket> {
    assertArtifactEnvelope(dispatch); assertArtifactEnvelope(candidate); assertArtifactEnvelope(brief);
    const authentication = artificerAuthenticationRef.trim();
    if (!authentication || candidate.payload.state !== "READY_FOR_PIT" || dispatch.payload.candidateRef !== ref(candidate) ||
      dispatch.payload.candidateDigest !== personaCandidateDigest(candidate) || dispatch.payload.recipient !== "PIT" || dispatch.payload.admissionClaimed || !dispatch.sourceRefs.includes(ref(candidate)) ||
      brief.artifactType !== "PersonaPitBrief" || brief.producer !== "Pit" || brief.status !== "CURRENT" ||
      brief.payload.finding !== "PASS" || brief.payload.recipient !== "FOUNDRY" || brief.payload.admissionClaimed ||
      brief.payload.candidateRef !== ref(candidate) || brief.payload.candidateDigest !== dispatch.payload.candidateDigest || brief.payload.dispatchRef !== ref(dispatch) ||
      !brief.sourceRefs.includes(ref(candidate)) || !brief.sourceRefs.includes(ref(dispatch)) ||
      dispatch.correlationId !== candidate.correlationId || brief.correlationId !== candidate.correlationId) {
      throw new Error("Foundry approval requires the exact candidate, dispatch, and passing Pit brief");
    }
    return createArtifact("FoundryReleasePacket", "Artificer", candidate.correlationId, {
      candidateRef: ref(candidate), candidateDigest: personaCandidateDigest(candidate), pitDispatchRef: ref(dispatch), passingPitBriefRef: ref(brief),
      templateRef: candidate.payload.templateRef, professionIdentity: candidate.payload.professionIdentity,
      productionApproved: true, recipient: "CASTELLAN", admissionClaimed: false,
      artificerAuthenticationRef: authentication,
    }, [ref(candidate), personaCandidateDigest(candidate), ref(dispatch), ref(brief), candidate.payload.templateRef, authentication], context);
  }
}

function ref(value: { identity: string; version: number }): string { return value.identity + "@" + value.version; }
