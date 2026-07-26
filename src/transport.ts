import { ArtifactEnvelope } from "./artifact.js";
import { OperatorRequest, Petition } from "./secretariat.js";
import { WorkSpecification } from "./castellan.js";

export interface TransportRequest {
  request: OperatorRequest;
  transportId: string;
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

export interface ImperiumTransportAdapter {
  submit(input: TransportRequest): TransportResponse;
  clarify(input: ClarificationRequest): TransportResponse;
}
