import { ArtifactEnvelope } from "./artifact.js";
import { ResponseDelivery, ResponseDeliveryService } from "./delivery.js";
import { Castellan, WorkSpecification } from "./castellan.js";
import { OperatorRequest, Petition, Secretariat } from "./secretariat.js";

export class ImperiumReference {
  constructor(
    private readonly secretariat = new Secretariat(),
    private readonly castellan = new Castellan(),
    private readonly delivery = new ResponseDeliveryService(),
  ) {}

  prepareResponse(
    petition: ArtifactEnvelope<Petition>,
    channel: string,
  ): ArtifactEnvelope<ResponseDelivery> {
    return this.delivery.prepare(
      "response-for-" + petition.identity + "@" + petition.version,
      petition.correlationId,
      channel,
    );
  }

  dispatchResponse(
    delivery: ArtifactEnvelope<ResponseDelivery>,
    successful: boolean,
  ): ArtifactEnvelope<ResponseDelivery> {
    return this.delivery.dispatch(delivery, successful);
  }

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

  requestClarification(
    petition: ArtifactEnvelope<Petition>,
    reason: string,
  ): ArtifactEnvelope<Petition> {
    return this.secretariat.requestClarification(petition, reason);
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
