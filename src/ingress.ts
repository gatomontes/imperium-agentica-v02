import { ArtifactEnvelope } from "./artifact.js";
import { Castellan, WorkSpecification } from "./castellan.js";
import { OperatorRequest, Petition, Secretariat } from "./secretariat.js";

export interface PetitionIngress {
  receive(
    request: OperatorRequest,
    correlationId?: string,
  ): ArtifactEnvelope<Petition>;
}

export interface WorkFormation {
  receivePetition(
    petition: ArtifactEnvelope<Petition>,
  ): ArtifactEnvelope<WorkSpecification> | null;
}

export class SecretariatIngressAdapter implements PetitionIngress {
  constructor(private readonly secretariat: Secretariat) {}

  receive(
    request: OperatorRequest,
    correlationId?: string,
  ): ArtifactEnvelope<Petition> {
    return this.secretariat.receive(request, correlationId);
  }
}

export class CastellanFormationAdapter implements WorkFormation {
  constructor(private readonly castellan: Castellan) {}

  receivePetition(
    petition: ArtifactEnvelope<Petition>,
  ): ArtifactEnvelope<WorkSpecification> | null {
    return this.castellan.receivePetition(petition);
  }
}
