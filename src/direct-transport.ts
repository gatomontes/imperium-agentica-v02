import { ArtifactEnvelope } from "./artifact.js";
import { ImperiumReference } from "./reference.js";
import {
  ImperiumTransportAdapter,
  ClarificationRequest,
  TransportRequest,
  TransportResponse,
} from "./transport.js";

export class DirectTransportAdapter implements ImperiumTransportAdapter {
  constructor(private readonly imperium = new ImperiumReference()) {}

  submit(input: TransportRequest): TransportResponse {
    const result = this.imperium.submit(input.request, input.correlationId);
    return {
      transportId: input.transportId,
      petition: result.petition,
      work: result.work,
    };
  }
  clarify(input: ClarificationRequest): TransportResponse {
    const result = this.imperium.clarify(
      input.petition,
      input.correctedContent,
    );
    return {
      transportId: input.transportId,
      petition: result.petition,
      work: result.work,
    };
  }

  prepareResponse(
    petition: ArtifactEnvelope<import("./secretariat.js").Petition>,
    content: string,
    transportId: string,
  ) {
    return {
      transportId,
      response: this.imperium.prepareOperatorResponse(petition, content),
    };
  }


  prepareDelivery(
    petition: ArtifactEnvelope<import("./secretariat.js").Petition>,
    channel: string,
    transportId: string,
  ) {
    return {
      transportId,
      delivery: this.imperium.prepareResponse(petition, channel),
    };
  }

  dispatchResponse(
    delivery: ArtifactEnvelope<import("./delivery.js").ResponseDelivery>,
    successful: boolean,
    transportId: string,
  ) {
    return {
      transportId,
      delivery: this.imperium.dispatchResponse(delivery, successful),
    };
  }

}
