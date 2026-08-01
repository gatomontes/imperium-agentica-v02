import { DirectTransportAdapter } from "./direct-transport.js";
import { ArtifactEnvelope } from "./artifact.js";
import { assertArtifactEnvelope } from "./schema.js";
import { deserializeArtifact, serializeArtifact } from "./serialization.js";
import { TRANSPORT_SCHEMA, TRANSPORT_SCHEMA_VERSION, TransportEnvelope, TransportEnvelopeResult, TransportRequest, TransportResponse } from "./transport.js";
import { Petition } from "./secretariat.js";

export class InMemoryTransportAdapter extends DirectTransportAdapter {
  submit(input: TransportRequest): TransportResponse {
    return super.submit(input);
  }

  encode<T>(envelope: TransportEnvelope<T>): string {
    this.validateEnvelope(envelope);
    return JSON.stringify(envelope);
  }

  decode<T>(serialized: string): TransportEnvelope<T> {
    let value: unknown;
    try { value = JSON.parse(serialized); } catch { throw new Error("invalid transport JSON"); }
    this.validateEnvelope(value);
    return value as TransportEnvelope<T>;
  }

  submitSerialized(serialized: string): TransportEnvelopeResult {
    let envelope: TransportEnvelope;
    try { envelope = this.decode(serialized); } catch (error) {
      return { transportId: "unknown", correlationId: "unknown", disposition: "REFUSED", refusalReason: error instanceof Error ? error.message : "invalid transport envelope" };
    }
    if (!envelope.request) return { transportId: envelope.transportId, correlationId: envelope.correlationId, disposition: "REFUSED", refusalReason: "transport request is missing" };
    const result = this.submit({ request: envelope.request, transportId: envelope.transportId, correlationId: envelope.correlationId, provenanceRef: envelope.provenanceRef });
    return { transportId: envelope.transportId, correlationId: result.petition.correlationId, disposition: result.petition.payload.finding === "PETITION_UNRESOLVED" ? "UNRESOLVED" : "ACCEPTED", result };
  }

  replaySerialized(serialized: string, expectedLineage: string): TransportEnvelopeResult {
    const outcome = this.submitSerialized(serialized);
    if (outcome.result && !outcome.result.petition.sourceRefs.includes(expectedLineage) && expectedLineage !== outcome.result.petition.identity + "@" + outcome.result.petition.version)
      return { ...outcome, disposition: "REFUSED", refusalReason: "lineage mismatch", result: undefined };
    return outcome;
  }

  private validateEnvelope(value: unknown): asserts value is TransportEnvelope {
    if (!value || typeof value !== "object") throw new Error("invalid transport envelope");
    const e = value as Partial<TransportEnvelope>;
    if (e.schema !== TRANSPORT_SCHEMA) throw new Error("unsupported transport schema");
    if (e.schemaVersion !== TRANSPORT_SCHEMA_VERSION) throw new Error("unsupported transport version");
    if (!e.transportId || !e.correlationId || !e.provenanceRef) throw new Error("missing transport identity, correlation, or provenance");
    if (e.artifact) assertArtifactEnvelope(e.artifact);
    if (!e.request && !e.artifact) throw new Error("transport envelope has no input");
  }
}
