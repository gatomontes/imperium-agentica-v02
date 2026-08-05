import { ArtifactContext, ArtifactEnvelope, createArtifact } from "./artifact.js";
import { InProgressPersonaCandidate, PersonaCandidatePitDispatch } from "./persona-production-intake.js";
import { assertArtifactEnvelope } from "./schema.js";

export interface PitPressureResult {
  axis: "COMPETENCE" | "GOVERNANCE" | "EVIDENCE" | "UNCERTAINTY" | "REFUSAL" | "TRAITS" | "COHERENCE";
  passed: boolean;
  evidence: string;
  defect?: string;
  repairTarget?: "SANCTOGRAPHER" | "NOTARY" | "ARTIFICER";
}

export interface PersonaPitBrief {
  dispatchRef: string;
  candidateRef: string;
  candidateTemplateRef: string;
  examination: PitPressureResult[];
  finding: "PASS" | "FAIL";
  repairTargets: Array<{ axis: PitPressureResult["axis"]; defect: string; responsibleAuthor: "SANCTOGRAPHER" | "NOTARY" | "ARTIFICER" }>;
  recipient: "FOUNDRY" | "ARTIFICER";
  pitAuthenticationRef: string;
  admissionClaimed: false;
}

const requiredAxes: PitPressureResult["axis"][] = ["COMPETENCE", "GOVERNANCE", "EVIDENCE", "UNCERTAINTY", "REFUSAL", "TRAITS", "COHERENCE"];

export class PersonaPitExaminer {
  examine(
    dispatch: ArtifactEnvelope<PersonaCandidatePitDispatch>,
    candidate: ArtifactEnvelope<InProgressPersonaCandidate>,
    results: PitPressureResult[],
    pitAuthenticationRef: string,
    context: ArtifactContext = {},
  ): ArtifactEnvelope<PersonaPitBrief> {
    assertArtifactEnvelope(dispatch); assertArtifactEnvelope(candidate);
    const authentication = pitAuthenticationRef.trim();
    if (dispatch.artifactType !== "PersonaCandidatePitDispatch" || dispatch.producer !== "Artificer" || dispatch.status !== "CURRENT" || dispatch.payload.recipient !== "PIT" || dispatch.payload.purpose !== "PERSONA_EXAMINATION" || dispatch.payload.admissionClaimed || dispatch.payload.candidateRef !== ref(candidate) || !dispatch.sourceRefs.includes(ref(candidate)) || candidate.artifactType !== "InProgressPersonaCandidate" || candidate.producer !== "Artificer" || candidate.status !== "CURRENT" || candidate.payload.state !== "READY_FOR_PIT" || candidate.payload.templateRef !== dispatch.payload.templateRef || candidate.correlationId !== dispatch.correlationId) throw new Error("exact current Artificer-dispatched Persona Candidate is required");
    if (!authentication || !completeResults(results)) throw new Error("Pit requires one complete authenticated result for every examination axis");
    const failures = results.filter((result) => !result.passed);
    if (failures.some((result) => !result.defect?.trim() || !result.repairTarget)) throw new Error("every failed Pit result requires an explicit defect and responsible repair target");
    const finding = failures.length ? "FAIL" : "PASS";
    return createArtifact("PersonaPitBrief", "Pit", candidate.correlationId, {
      dispatchRef: ref(dispatch), candidateRef: ref(candidate), candidateTemplateRef: candidate.payload.templateRef,
      examination: structuredClone(results), finding,
      repairTargets: failures.map((result) => ({ axis: result.axis, defect: result.defect!.trim(), responsibleAuthor: result.repairTarget! })),
      recipient: finding === "FAIL" ? "ARTIFICER" : "FOUNDRY", pitAuthenticationRef: authentication, admissionClaimed: false,
    }, [ref(dispatch), ref(candidate), candidate.payload.templateRef, authentication], context);
  }
}

function completeResults(results: PitPressureResult[]): boolean {
  return results.length === requiredAxes.length && requiredAxes.every((axis) => results.filter((result) => result.axis === axis).length === 1) && results.every((result) => !!result.evidence.trim());
}
function ref(value: { identity: string; version: number }): string { return value.identity + "@" + value.version; }
