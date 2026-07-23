import { randomUUID } from "node:crypto";
import { SyntheticCredentialClassification } from "./synthetic-credential-broker.mjs";

export const OpenBaoImperiumServicePortPin = Object.freeze({
  openBaoVersion: "2.6.1",
  openBaoReleaseTag: "v2.6.1",
  workflowApi: "sys/workflows/unauthed-execute",
  responseSchema: "imperium-service-port-response-v1",
});

const BindingFields = Object.freeze(["operationId", "version"]);
const ResponseFields = Object.freeze(["correlation_id", "material", "operation_id", "version"]);
const ForbiddenResponseKeys = new Set([
  "accessor",
  "client_token",
  "secret_id",
  "secret_id_accessor",
  "token",
  "token_policies",
  "wrapping_token",
]);

function requireText(value, code) {
  if (typeof value !== "string" || value.length === 0) throw new Error(code);
}

function sameFields(actual, expected) {
  return actual.length === expected.length &&
    actual.every((field, index) => field === expected[index]);
}

function validateBinding(binding) {
  if (!binding || typeof binding !== "object" || Array.isArray(binding)) {
    throw new Error("OPENBAO_SERVICE_BINDING_REQUIRED");
  }
  const fields = Object.keys(binding).sort();
  if (!sameFields(fields, [...BindingFields].sort())) {
    throw new Error("OPENBAO_SERVICE_BINDING_FIELDS_REFUSED");
  }
  requireText(binding.operationId, "OPENBAO_SERVICE_OPERATION_REQUIRED");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*-v[1-9]\d*$/.test(binding.operationId)) {
    throw new Error("OPENBAO_SERVICE_OPERATION_REFUSED");
  }
  if (!Number.isSafeInteger(binding.version) || binding.version <= 0) {
    throw new Error("OPENBAO_SERVICE_EXACT_VERSION_REQUIRED");
  }
}

function containsForbiddenKey(value) {
  if (!value || typeof value !== "object") return false;
  for (const [key, nested] of Object.entries(value)) {
    if (ForbiddenResponseKeys.has(key)) return true;
    if (containsForbiddenKey(nested)) return true;
  }
  return false;
}

function parseResponse(body, binding, correlationId) {
  if (!(body instanceof Uint8Array) || body.byteLength === 0) {
    throw new Error("OPENBAO_SERVICE_RESPONSE_REFUSED");
  }
  const parsed = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(body));
  if (containsForbiddenKey(parsed) ||
      (parsed.auth !== null && parsed.auth !== undefined) ||
      (parsed.wrap_info !== null && parsed.wrap_info !== undefined)) {
    throw new Error("OPENBAO_SERVICE_RESPONSE_REFUSED");
  }
  const data = parsed?.data;
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("OPENBAO_SERVICE_RESPONSE_REFUSED");
  }
  if (!sameFields(Object.keys(data).sort(), [...ResponseFields].sort())) {
    throw new Error("OPENBAO_SERVICE_RESPONSE_REFUSED");
  }
  if (data.operation_id !== binding.operationId ||
      data.correlation_id !== correlationId ||
      data.version !== binding.version ||
      typeof data.material !== "string" ||
      data.material.length === 0) {
    throw new Error("OPENBAO_SERVICE_RESPONSE_REFUSED");
  }
  return {
    material: new TextEncoder().encode(data.material),
    classification: SyntheticCredentialClassification,
    version: String(data.version),
  };
}

export class OpenBaoImperiumServicePortBackend {
  acquisitionMode = "ASYNC";
  #bindings;
  #idFactory;
  #transport;

  constructor({ transport, bindings, idFactory = randomUUID } = {}) {
    if (!transport || typeof transport.executeFixedOperation !== "function") {
      throw new Error("OPENBAO_SERVICE_TRANSPORT_REQUIRED");
    }
    if (!bindings || typeof bindings !== "object" || Array.isArray(bindings)) {
      throw new Error("OPENBAO_SERVICE_BINDING_CATALOG_REQUIRED");
    }
    if (typeof idFactory !== "function") {
      throw new Error("OPENBAO_SERVICE_ID_FACTORY_REQUIRED");
    }
    const catalog = new Map();
    for (const [secretReference, binding] of Object.entries(bindings)) {
      requireText(secretReference, "OPENBAO_SECRET_REFERENCE_REQUIRED");
      validateBinding(binding);
      catalog.set(secretReference, Object.freeze({ ...binding }));
    }
    this.#transport = transport;
    this.#bindings = catalog;
    this.#idFactory = idFactory;
  }

  async acquire({ secretReference } = {}) {
    requireText(secretReference, "OPENBAO_SECRET_REFERENCE_REQUIRED");
    const binding = this.#bindings.get(secretReference);
    if (!binding) throw new Error("OPENBAO_SERVICE_ACQUISITION_FAILED");

    let response;
    try {
      const correlationValue = this.#idFactory();
      requireText(correlationValue, "OPENBAO_SERVICE_CORRELATION_REQUIRED");
      const correlationId = `imperium-service-port-${correlationValue}`;
      response = await this.#transport.executeFixedOperation(Object.freeze({
        operationId: binding.operationId,
        correlationId,
      }));
      if (response?.status !== 200) throw new Error("OPENBAO_SERVICE_RESPONSE_REFUSED");
      return parseResponse(response.body, binding, correlationId);
    } catch {
      throw new Error("OPENBAO_SERVICE_ACQUISITION_FAILED");
    } finally {
      response?.body?.fill?.(0);
    }
  }

  revoke() {
    return false;
  }
}
