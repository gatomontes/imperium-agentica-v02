import { randomUUID } from "node:crypto";

export const SyntheticCredentialClassification = "SYNTHETIC_TEST_SECRET";

export const SyntheticCredentialResults = Object.freeze({
  CONSUMED: "CONSUMED",
  REFUSED: "REFUSED",
  UNKNOWN: "UNKNOWN",
});

const BindingFields = Object.freeze(["environment", "component", "scope", "purpose"]);

function validateBinding(binding) {
  for (const field of BindingFields) {
    if (typeof binding?.[field] !== "string" || binding[field].length === 0) {
      throw new Error("SYNTHETIC_CREDENTIAL_BINDING_REQUIRED");
    }
  }
}

function sameBinding(left, right) {
  return BindingFields.every((field) => left[field] === right[field]);
}

export class SyntheticCredentialBroker {
  #auditSink;
  #idFactory;
  #records = new Map();

  constructor({ auditSink = { append() {} }, idFactory = randomUUID } = {}) {
    if (!auditSink || typeof auditSink.append !== "function") {
      throw new Error("SYNTHETIC_CREDENTIAL_AUDIT_SINK_REQUIRED");
    }
    if (typeof idFactory !== "function") {
      throw new Error("SYNTHETIC_CREDENTIAL_ID_FACTORY_REQUIRED");
    }
    this.#auditSink = auditSink;
    this.#idFactory = idFactory;
  }

  register({ material, classification, environment, component, scope, purpose } = {}) {
    if (!(material instanceof Uint8Array) || material.byteLength === 0) {
      throw new Error("SYNTHETIC_CREDENTIAL_BYTES_REQUIRED");
    }
    if (classification !== SyntheticCredentialClassification) {
      throw new Error("SYNTHETIC_CREDENTIAL_CLASSIFICATION_REQUIRED");
    }
    const binding = { environment, component, scope, purpose };
    validateBinding(binding);

    const heldMaterial = Uint8Array.from(material);
    material.fill(0);

    const handle = `synthetic-handle-${this.#idFactory()}`;
    const auditId = `synthetic-audit-${this.#idFactory()}`;
    if (this.#records.has(handle)) {
      heldMaterial.fill(0);
      throw new Error("SYNTHETIC_CREDENTIAL_ID_COLLISION");
    }

    const record = { auditId, binding: Object.freeze({ ...binding }), material: heldMaterial };
    this.#records.set(handle, record);
    try {
      this.#audit("REGISTERED", record);
    } catch {
      heldMaterial.fill(0);
      this.#records.delete(handle);
      throw new Error("SYNTHETIC_CREDENTIAL_AUDIT_FAILED");
    }
    return handle;
  }

  consume({ handle, environment, component, scope, purpose } = {}, consumer) {
    if (typeof consumer !== "function") {
      throw new Error("SYNTHETIC_CREDENTIAL_CONSUMER_REQUIRED");
    }
    const record = this.#records.get(handle);
    if (!record) {
      this.#auditUnknown("UNKNOWN");
      return SyntheticCredentialResults.UNKNOWN;
    }

    const binding = { environment, component, scope, purpose };
    if (!sameBinding(record.binding, binding)) {
      this.#audit("REFUSED", record);
      return SyntheticCredentialResults.REFUSED;
    }

    const consumerView = Uint8Array.from(record.material);
    record.material.fill(0);
    this.#records.delete(handle);

    let failure = null;
    try {
      const result = consumer(consumerView);
      if (result && typeof result.then === "function") {
        failure = "ASYNC_CONSUMER_REFUSED";
      } else if (result !== SyntheticCredentialResults.CONSUMED) {
        failure = "CONSUMER_RESULT_REFUSED";
      }
    } catch {
      failure = "CREDENTIAL_CONSUMER_FAILED";
    } finally {
      consumerView.fill(0);
    }

    if (failure) {
      this.#audit(failure, record);
      throw new Error(failure);
    }
    this.#audit("CONSUMED", record);
    return SyntheticCredentialResults.CONSUMED;
  }

  revoke(handle) {
    const record = this.#records.get(handle);
    if (!record) {
      this.#auditUnknown("REVOKE_UNKNOWN");
      return SyntheticCredentialResults.UNKNOWN;
    }
    record.material.fill(0);
    this.#records.delete(handle);
    this.#audit("REVOKED", record);
    return SyntheticCredentialResults.REFUSED;
  }

  close() {
    for (const record of this.#records.values()) {
      record.material.fill(0);
      this.#audit("CLOSED", record);
    }
    this.#records.clear();
  }

  #audit(event, record) {
    this.#auditSink.append(Object.freeze({
      event,
      credentialIdentity: record.auditId,
      ...record.binding,
    }));
  }

  #auditUnknown(event) {
    this.#auditSink.append(Object.freeze({ event, credentialIdentity: null }));
  }
}
