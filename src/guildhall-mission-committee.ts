import { ArtifactContext, ArtifactEnvelope, GovernedArtifactEnvelope, createArtifact } from "./artifact.js";
import { MissionSpecificationCandidate } from "./castellan-mission-formation.js";
import { assertArtifactEnvelope } from "./schema.js";

export type ProfessionCollaborationMode = "INDEPENDENT" | "SEQUENTIAL" | "TANDEM";

export interface ProfessionPossibility {
  professionIdentity: string;
  contribution: string;
  rationale: string;
  collaborationMode: ProfessionCollaborationMode;
  dependsOn: string[];
}

export interface ProfessionBrainstormDraft {
  possibilities: ProfessionPossibility[];
  overlaps: string[];
  missingSpecialties: string[];
}

export interface CastellanGuildhallHandoff {
  missionSpecificationCandidateRef: string;
  recipient: "GUILDHALL_COMMITTEE";
  purpose: "PROFESSION_BRAINSTORM";
  authorityCreated: false;
}

export interface ProfessionRecommendationPacket extends ProfessionBrainstormDraft {
  missionSpecificationCandidateRef: string;
  handoffRef: string;
  finding: "PROFESSION_POSSIBILITIES_RECORDED";
  peopleSelected: false;
  operativesSelected: false;
  officersSelected: false;
}

export class CastellanGuildhallRouter {
  handoff(candidate: GovernedArtifactEnvelope<MissionSpecificationCandidate>, context: ArtifactContext = {}): ArtifactEnvelope<CastellanGuildhallHandoff> {
    assertCandidate(candidate);
    return createArtifact("CastellanGuildhallHandoff", "Castellan", candidate.correlationId, {
      missionSpecificationCandidateRef: ref(candidate),
      recipient: "GUILDHALL_COMMITTEE",
      purpose: "PROFESSION_BRAINSTORM",
      authorityCreated: false,
    }, [ref(candidate)], context);
  }
}

export class GuildhallMissionCommittee {
  recordBrainstorm(
    candidate: GovernedArtifactEnvelope<MissionSpecificationCandidate>,
    handoff: ArtifactEnvelope<CastellanGuildhallHandoff>,
    draft: ProfessionBrainstormDraft,
    context: ArtifactContext = {},
  ): ArtifactEnvelope<ProfessionRecommendationPacket> {
    assertCandidate(candidate);
    assertHandoff(candidate, handoff);
    const possibilities = draft.possibilities.map(cleanPossibility);
    if (possibilities.length === 0 || possibilities.length > 8) throw new Error("Guildhall brainstorm requires one to eight profession possibilities");
    const identities = new Set<string>();
    for (const possibility of possibilities) {
      const key = possibility.professionIdentity.toLowerCase();
      if (identities.has(key)) throw new Error("Guildhall profession possibilities must be distinct");
      for (const dependency of possibility.dependsOn) {
        if (!identities.has(dependency.toLowerCase())) throw new Error("Guildhall dependencies must name an earlier profession possibility");
      }
      if (possibility.collaborationMode === "INDEPENDENT" && possibility.dependsOn.length) throw new Error("independent professions may not declare dependencies");
      identities.add(key);
    }
    return createArtifact("ProfessionRecommendationPacket", "GuildhallCommittee", candidate.correlationId, {
      missionSpecificationCandidateRef: ref(candidate),
      handoffRef: ref(handoff),
      possibilities,
      overlaps: cleanList(draft.overlaps),
      missingSpecialties: cleanList(draft.missingSpecialties),
      finding: "PROFESSION_POSSIBILITIES_RECORDED",
      peopleSelected: false,
      operativesSelected: false,
      officersSelected: false,
    }, [ref(candidate), ref(handoff)], context);
  }
}

function assertCandidate(candidate: GovernedArtifactEnvelope<MissionSpecificationCandidate>): void {
  assertArtifactEnvelope(candidate);
  if (candidate.artifactType !== "MissionSpecificationCandidate" || candidate.producer !== "Castellan" || candidate.status !== "CURRENT" || candidate.payload.state !== "CANDIDATE" || candidate.payload.authorityCreated !== false || !candidate.payload.purpose.trim() || !candidate.payload.dossierRef.trim()) {
    throw new Error("exact current Castellan Mission Specification Candidate is required");
  }
}

function assertHandoff(candidate: GovernedArtifactEnvelope<MissionSpecificationCandidate>, handoff: ArtifactEnvelope<CastellanGuildhallHandoff>): void {
  assertArtifactEnvelope(handoff);
  if (handoff.artifactType !== "CastellanGuildhallHandoff" || handoff.producer !== "Castellan" || handoff.status !== "CURRENT" || handoff.correlationId !== candidate.correlationId || handoff.payload.missionSpecificationCandidateRef !== ref(candidate) || handoff.payload.recipient !== "GUILDHALL_COMMITTEE" || handoff.payload.purpose !== "PROFESSION_BRAINSTORM" || handoff.payload.authorityCreated !== false || !handoff.sourceRefs.includes(ref(candidate))) {
    throw new Error("exact matching Castellan-to-Guildhall handoff is required");
  }
}

function cleanPossibility(value: ProfessionPossibility): ProfessionPossibility {
  const possibility = { ...value, professionIdentity: value.professionIdentity.trim(), contribution: value.contribution.trim(), rationale: value.rationale.trim(), dependsOn: cleanList(value.dependsOn) };
  if (!possibility.professionIdentity || !possibility.contribution || !possibility.rationale || !["INDEPENDENT", "SEQUENTIAL", "TANDEM"].includes(possibility.collaborationMode)) throw new Error("each Guildhall possibility requires a profession, contribution, rationale, and collaboration mode");
  return possibility;
}
function cleanList(values: string[]): string[] { return [...new Set(values.map((value) => value.trim()).filter(Boolean))]; }
function ref(value: { identity: string; version: number }): string { return value.identity + "@" + value.version; }
