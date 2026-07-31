import { ArtifactEnvelope } from "./artifact.js";
import { Castellan, WorkSpecification } from "./castellan.js";
import { OperatorRequest, Petition, Secretariat } from "./secretariat.js";
import {
  CastellanFormationAdapter,
  PetitionIngress,
  SecretariatIngressAdapter,
  WorkFormation,
} from "./ingress.js";

export interface ReferenceBoundaryResult {
  petition: ArtifactEnvelope<Petition>;
  work: ArtifactEnvelope<WorkSpecification> | null;
}

export class InMemoryReferenceBoundary {
  constructor(
    private readonly ingress: PetitionIngress = new SecretariatIngressAdapter(
      new Secretariat(),
    ),
    private readonly formation: WorkFormation = new CastellanFormationAdapter(
      new Castellan(),
    ),
  ) {}

  submit(request: OperatorRequest): ReferenceBoundaryResult {
    const petition = this.ingress.receive(request);
    return { petition, work: this.handoff(petition) };
  }

  handoff(petition: ArtifactEnvelope<Petition>): ArtifactEnvelope<WorkSpecification> | null {
    if (petition.status !== "CURRENT") return null;
    if (petition.payload.finding !== "PETITION_RECEIVED") return null;
    return this.formation.receivePetition(petition);
  }
}
