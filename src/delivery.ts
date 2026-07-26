import { createArtifact, ArtifactEnvelope } from "./artifact.js";

export type ResponseDeliveryState =
  | "RESPONSE_PREPARED"
  | "RESPONSE_DISPATCHED"
  | "RESPONSE_ACKNOWLEDGED"
  | "RESPONSE_RETRY_REQUIRED"
  | "RESPONSE_UNDELIVERABLE"
  | "RESPONSE_EXPIRED"
  | "RESPONSE_CANCELLED";

export interface ResponseDelivery {
  responseRef: string;
  channel: string;
  state: ResponseDeliveryState;
  attempt: number;
  failureReason?: string;
}

export class ResponseDeliveryService {
  prepare(
    responseRef: string,
    correlationId: string,
    channel: string,
  ): ArtifactEnvelope<ResponseDelivery> {
    return createArtifact(
      "ResponseDelivery",
      "Secretariat",
      correlationId,
      { responseRef, channel, state: "RESPONSE_PREPARED", attempt: 0 },
      [responseRef],
    );
  }

  dispatch(
    delivery: ArtifactEnvelope<ResponseDelivery>,
    successful: boolean,
  ): ArtifactEnvelope<ResponseDelivery> {
    if (
      delivery.payload.state !== "RESPONSE_PREPARED" &&
      delivery.payload.state !== "RESPONSE_RETRY_REQUIRED"
    ) {
      throw new Error(
        "response cannot be dispatched from state: " + delivery.payload.state,
      );
    }
    const nextState: ResponseDeliveryState = successful
      ? "RESPONSE_ACKNOWLEDGED"
      : "RESPONSE_RETRY_REQUIRED";
    return {
      ...delivery,
      version: delivery.version + 1,
      payload: {
        ...delivery.payload,
        state: nextState,
        attempt: delivery.payload.attempt + 1,
        failureReason: successful ? undefined : "delivery failed",
      },
    };
  }
}
