import { ArtifactEnvelope } from "./artifact.js";
import { ResponseDelivery } from "./delivery.js";
import { OperatorResponse } from "./response.js";
import { OperatorRequest, Petition } from "./secretariat.js";
import { WorkSpecification } from "./castellan.js";

export interface TransportRequest {
  request: OperatorRequest;
  transportId: string;
  /** Optional caller correlation is preserved when supplied; the adapter never invents a replacement. */
  correlationId?: string;
  /** Optional provenance reference remains opaque to the transport boundary. */
  provenanceRef?: string;
}

export interface ClarificationRequest {
  petition: ArtifactEnvelope<Petition>;
  correctedContent: string;
  transportId: string;
}

export interface TransportResponse {
  transportId: string;
  petition: ArtifactEnvelope<Petition>;
  work: ArtifactEnvelope<WorkSpecification> | null;
}

export const TRANSPORT_SCHEMA = "imperium.transport-envelope" as const;
export const TRANSPORT_SCHEMA_VERSION = 1 as const;

export interface TransportEnvelope<T = unknown> {
  schema: typeof TRANSPORT_SCHEMA;
  schemaVersion: typeof TRANSPORT_SCHEMA_VERSION;
  transportId: string;
  correlationId: string;
  provenanceRef: string;
  request?: OperatorRequest;
  artifact?: ArtifactEnvelope<T>;
}

export interface TransportEnvelopeResult {
  transportId: string;
  correlationId: string;
  disposition: "ACCEPTED" | "UNRESOLVED" | "REFUSED";
  refusalReason?: string;
  result?: TransportResponse;
}

export interface ImperiumTransportAdapter {
  submit(input: TransportRequest): TransportResponse;
  clarify(input: ClarificationRequest): TransportResponse;
  prepareResponse(
    petition: ArtifactEnvelope<Petition>,
    content: string,
    transportId: string,
  ): { transportId: string; response: ArtifactEnvelope<OperatorResponse> };
  prepareDelivery(
    petition: ArtifactEnvelope<Petition>,
    channel: string,
    transportId: string,
  ): { transportId: string; delivery: ArtifactEnvelope<ResponseDelivery> };
  dispatchResponse(
    delivery: ArtifactEnvelope<ResponseDelivery>,
    successful: boolean,
    transportId: string,
  ): { transportId: string; delivery: ArtifactEnvelope<ResponseDelivery> };
}

export interface AsyncImperiumTransportAdapter {
  submit(input: TransportRequest): Promise<TransportResponse>;
  clarify(input: ClarificationRequest): Promise<TransportResponse>;
  prepareResponse(
    petition: ArtifactEnvelope<Petition>,
    content: string,
    transportId: string,
  ): Promise<{ transportId: string; response: ArtifactEnvelope<OperatorResponse> }>;
  prepareDelivery(
    petition: ArtifactEnvelope<Petition>,
    channel: string,
    transportId: string,
  ): Promise<{ transportId: string; delivery: ArtifactEnvelope<ResponseDelivery> }>;
  dispatchResponse(
    delivery: ArtifactEnvelope<ResponseDelivery>,
    successful: boolean,
    transportId: string,
  ): Promise<{ transportId: string; delivery: ArtifactEnvelope<ResponseDelivery> }>;
}
