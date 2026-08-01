import { ArtifactEnvelope } from "./artifact.js";
import { Castellan, WorkSpecification } from "./castellan.js";
import { OperatorRequest, Petition, Secretariat } from "./secretariat.js";
import { CastellanFormationAdapter, PetitionIngress, SecretariatIngressAdapter, WorkFormation } from "./ingress.js";

export type ReferenceBoundaryDisposition = "ACCEPTED" | "UNRESOLVED" | "STALE" | "INVALIDATED" | "REFUSED";
export interface ReferenceBoundaryResult {
  petition: ArtifactEnvelope<Petition>;
  work: ArtifactEnvelope<WorkSpecification> | null;
  disposition: ReferenceBoundaryDisposition;
}
export class InMemoryReferenceBoundary {
  constructor(
    private readonly ingress: PetitionIngress = new SecretariatIngressAdapter(new Secretariat()),
    private readonly formation: WorkFormation = new CastellanFormationAdapter(new Castellan()),
  ) {}
  submit(request: OperatorRequest, correlationId?: string): ReferenceBoundaryResult {
    const petition = this.ingress.receive(request, correlationId);
    return { ...this.resultFor(petition), petition };
  }
  handoff(petition: ArtifactEnvelope<Petition>): ArtifactEnvelope<WorkSpecification> | null {
    return this.resultFor(petition).work;
  }
  handoffResult(petition: ArtifactEnvelope<Petition>): ReferenceBoundaryResult {
    return { ...this.resultFor(petition), petition };
  }
  private resultFor(petition: ArtifactEnvelope<Petition>): Omit<ReferenceBoundaryResult, "petition"> {
    if (petition.status === "SUPERSEDED") return { work: null, disposition: "STALE" };
    if (petition.status === "INVALIDATED") return { work: null, disposition: "INVALIDATED" };
    if (petition.status === "UNRESOLVED") return { work: null, disposition: "UNRESOLVED" };
    if (petition.status !== "CURRENT") return { work: null, disposition: "REFUSED" };
    if (petition.payload.finding === "PETITION_UNRESOLVED") return { work: null, disposition: "UNRESOLVED" };
    if (petition.payload.finding !== "PETITION_RECEIVED") return { work: null, disposition: "REFUSED" };
    const work = this.formation.receivePetition(petition);
    return work ? { work, disposition: "ACCEPTED" } : { work: null, disposition: "REFUSED" };
  }
}
