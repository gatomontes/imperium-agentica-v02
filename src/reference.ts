import { ArtifactEnvelope } from "./artifact.js";
import { Castellan, WorkSpecification } from "./castellan.js";
import { OperatorRequest, Petition, Secretariat } from "./secretariat.js";

export class ImperiumReference {
  constructor(
    private readonly secretariat = new Secretariat(),
    private readonly castellan = new Castellan(),
  ) {}

  submit(request: OperatorRequest): {
    petition: ArtifactEnvelope<Petition>;
    work: ArtifactEnvelope<WorkSpecification> | null;
  } {
    const petition = this.secretariat.receive(request);
    return {
      petition,
      work: this.castellan.receivePetition(petition),
    };
  }

  clarify(
    petition: ArtifactEnvelope<Petition>,
    correctedContent: string,
  ): {
    petition: ArtifactEnvelope<Petition>;
    work: ArtifactEnvelope<WorkSpecification> | null;
  } {
    const clarified = this.secretariat.resolveClarification(
      petition,
      correctedContent,
    );
    return {
      petition: clarified,
      work: this.castellan.receivePetition(clarified),
    };
  }
}
