import { ArtifactEnvelope } from "./artifact.js";
import { ResponseDelivery } from "./delivery.js";
import { PersistentImperiumReference } from "./persistent-reference.js";
import { OperatorResponse } from "./response.js";
import { Petition, OperatorRequest } from "./secretariat.js";
import {
  AsyncImperiumTransportAdapter,
  ClarificationRequest,
  TransportRequest,
  TransportResponse,
} from "./transport.js";

export class PersistentTransportAdapter
  implements AsyncImperiumTransportAdapter
{
  constructor(private readonly imperium: PersistentImperiumReference) {}

  async submit(input: TransportRequest): Promise<TransportResponse> {
    const result = await this.imperium.submit(input.request as OperatorRequest);
    return {
      transportId: input.transportId,
      petition: result.petition,
      work: result.work,
    };
  }

  async clarify(input: ClarificationRequest): Promise<TransportResponse> {
    const result = await this.imperium.clarify(
      input.petition,
      input.correctedContent,
    );
    return {
      transportId: input.transportId,
      petition: result.petition,
      work: result.work,
    };
  }

  async prepareResponse(
    petition: ArtifactEnvelope<Petition>,
    content: string,
    transportId: string,
  ): Promise<{ transportId: string; response: ArtifactEnvelope<OperatorResponse> }> {
    return {
      transportId,
      response: await this.imperium.prepareOperatorResponse(petition, content),
    };
  }

  async prepareDelivery(
    petition: ArtifactEnvelope<Petition>,
    channel: string,
    transportId: string,
  ): Promise<{ transportId: string; delivery: ArtifactEnvelope<ResponseDelivery> }> {
    return {
      transportId,
      delivery: await this.imperium.prepareResponse(petition, channel),
    };
  }

  async dispatchResponse(
    delivery: ArtifactEnvelope<ResponseDelivery>,
    successful: boolean,
    transportId: string,
  ): Promise<{ transportId: string; delivery: ArtifactEnvelope<ResponseDelivery> }> {
    return {
      transportId,
      delivery: await this.imperium.dispatchResponse(delivery, successful),
    };
  }
}
