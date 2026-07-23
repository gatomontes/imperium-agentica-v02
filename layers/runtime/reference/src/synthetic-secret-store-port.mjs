import { randomUUID } from "node:crypto";
import {
  SyntheticCredentialClassification,
  SyntheticCredentialResults,
} from "./synthetic-credential-broker.mjs";

const BindingFields = Object.freeze(["environment", "component", "scope", "purpose"]);

function requireText(value, code) {
  if (typeof value !== "string" || value.length === 0) throw new Error(code);
}

function validateBinding(binding) {
  for (const field of BindingFields) {
    requireText(binding?.[field], "SYNTHETIC_SECRET_LEASE_BINDING_REQUIRED");
  }
}

function sameBinding(left, right) {
  return BindingFields.every((field) => left[field] === right[field]);
}

export class InMemorySyntheticSecretStoreBackend {
  #available = true;
  #records = new Map();

  seed({ secretReference, material, classification, version } = {}) {
    requireText(secretReference, "SYNTHETIC_SECRET_REFERENCE_REQUIRED");
    requireText(version, "SYNTHETIC_SECRET_VERSION_REQUIRED");
    if (!(material instanceof Uint8Array) || material.byteLength === 0) {
      throw new Error("SYNTHETIC_SECRET_BYTES_REQUIRED");
    }
    if (classification !== SyntheticCredentialClassification) {
      throw new Error("SYNTHETIC_SECRET_CLASSIFICATION_REQUIRED");
    }
    const held = Uint8Array.from(material);
    material.fill(0);
    const prior = this.#records.get(secretReference);
    prior?.material.fill(0);
    this.#records.set(secretReference, { material: held, classification, version });
  }

  acquire({ secretReference } = {}) {
    if (!this.#available) throw new Error("SYNTHETIC_SECRET_STORE_UNAVAILABLE");
    const record = this.#records.get(secretReference);
    if (!record) throw new Error("SYNTHETIC_SECRET_ABSENT");
    return {
      material: Uint8Array.from(record.material),
      classification: record.classification,
      version: record.version,
    };
  }

  revoke(secretReference) {
    const record = this.#records.get(secretReference);
    if (!record) return false;
    record.material.fill(0);
    this.#records.delete(secretReference);
    return true;
  }

  setAvailable(available) {
    this.#available = Boolean(available);
  }

  close() {
    for (const record of this.#records.values()) record.material.fill(0);
    this.#records.clear();
  }
}

export class SyntheticSecretStorePort {
  #auditSink;
  #backend;
  #broker;
  #clock;
  #idFactory;
  #leases = new Map();
  #maxTtlMs;

  constructor({
    backend,
    broker,
    auditSink = { append() {} },
    clock = () => Date.now(),
    idFactory = randomUUID,
    maxTtlMs = 60_000,
  }) {
    if (!backend || typeof backend.acquire !== "function" || typeof backend.revoke !== "function") {
      throw new Error("SYNTHETIC_SECRET_BACKEND_REQUIRED");
    }
    if (!broker || typeof broker.register !== "function" || typeof broker.consume !== "function" || typeof broker.revoke !== "function") {
      throw new Error("SYNTHETIC_CREDENTIAL_BROKER_REQUIRED");
    }
    if (!auditSink || typeof auditSink.append !== "function") {
      throw new Error("SYNTHETIC_SECRET_AUDIT_SINK_REQUIRED");
    }
    if (typeof clock !== "function" || typeof idFactory !== "function") {
      throw new Error("SYNTHETIC_SECRET_DEPENDENCY_REQUIRED");
    }
    if (!Number.isFinite(maxTtlMs) || maxTtlMs <= 0) {
      throw new Error("SYNTHETIC_SECRET_MAX_TTL_REQUIRED");
    }
    this.#backend = backend;
    this.#broker = broker;
    this.#auditSink = auditSink;
    this.#clock = clock;
    this.#idFactory = idFactory;
    this.#maxTtlMs = maxTtlMs;
  }

  acquire({ secretReference, environment, component, scope, purpose, ttlMs } = {}) {
    const request = this.#validateAcquisitionRequest({
      secretReference, environment, component, scope, purpose, ttlMs,
    });
    let acquired;
    try {
      if (this.#backend.acquisitionMode === "ASYNC") {
        throw new Error("SYNTHETIC_SECRET_ASYNC_ACQUISITION_REQUIRED");
      }
      acquired = this.#backend.acquire({ secretReference });
      if (acquired && typeof acquired.then === "function") {
        acquired.then(
          (value) => value?.material?.fill?.(0),
          () => {},
        );
        throw new Error("SYNTHETIC_SECRET_ASYNC_ACQUISITION_REQUIRED");
      }
      this.#validateAcquired(acquired);
    } catch {
      this.#auditUnknown("ACQUIRE_REFUSED", secretReference);
      throw new Error("SYNTHETIC_SECRET_ACQUISITION_FAILED");
    }
    return this.#createLease({ ...request, acquired });
  }

  async acquireAsync({ secretReference, environment, component, scope, purpose, ttlMs } = {}) {
    const request = this.#validateAcquisitionRequest({
      secretReference, environment, component, scope, purpose, ttlMs,
    });
    let acquired;
    try {
      acquired = await this.#backend.acquire({ secretReference });
      this.#validateAcquired(acquired);
    } catch {
      this.#auditUnknown("ACQUIRE_REFUSED", secretReference);
      throw new Error("SYNTHETIC_SECRET_ACQUISITION_FAILED");
    }
    return this.#createLease({ ...request, acquired });
  }

  consume({ handle, environment, component, scope, purpose } = {}, consumer) {
    const record = this.#leases.get(handle);
    if (!record) {
      this.#auditUnknown("LEASE_UNKNOWN", null);
      return SyntheticCredentialResults.UNKNOWN;
    }
    if (this.#now() >= record.expiresAtMs) {
      this.#broker.revoke(record.brokerHandle);
      this.#leases.delete(handle);
      this.#audit("EXPIRED", record);
      return SyntheticCredentialResults.REFUSED;
    }
    const binding = { environment, component, scope, purpose };
    if (!sameBinding(record.binding, binding)) {
      this.#audit("BINDING_REFUSED", record);
      return SyntheticCredentialResults.REFUSED;
    }

    let result;
    try {
      result = this.#broker.consume({
        handle: record.brokerHandle,
        ...binding,
      }, consumer);
    } catch (error) {
      this.#broker.revoke(record.brokerHandle);
      throw error;
    } finally {
      this.#leases.delete(handle);
    }
    this.#audit(result === SyntheticCredentialResults.CONSUMED ? "CONSUMED" : "BROKER_REFUSED", record);
    return result;
  }

  revoke(handle) {
    const record = this.#leases.get(handle);
    if (!record) {
      this.#auditUnknown("REVOKE_UNKNOWN", null);
      return SyntheticCredentialResults.UNKNOWN;
    }
    this.#broker.revoke(record.brokerHandle);
    this.#leases.delete(handle);
    this.#audit("REVOKED", record);
    return SyntheticCredentialResults.REFUSED;
  }

  revokeSecret(secretReference) {
    const revoked = this.#backend.revoke(secretReference);
    for (const [handle, record] of this.#leases) {
      if (record.secretReference !== secretReference) continue;
      this.#broker.revoke(record.brokerHandle);
      this.#leases.delete(handle);
      this.#audit("SECRET_REVOKED", record);
    }
    return revoked;
  }

  close() {
    for (const [handle, record] of this.#leases) {
      this.#broker.revoke(record.brokerHandle);
      this.#leases.delete(handle);
      this.#audit("CLOSED", record);
    }
  }

  #validateAcquisitionRequest({
    secretReference, environment, component, scope, purpose, ttlMs,
  }) {
    requireText(secretReference, "SYNTHETIC_SECRET_REFERENCE_REQUIRED");
    const binding = { environment, component, scope, purpose };
    validateBinding(binding);
    if (!Number.isFinite(ttlMs) || ttlMs <= 0 || ttlMs > this.#maxTtlMs) {
      throw new Error("SYNTHETIC_SECRET_TTL_REFUSED");
    }
    return { secretReference, binding, ttlMs, acquiredAtMs: this.#now() };
  }

  #validateAcquired(acquired) {
    if (!(acquired?.material instanceof Uint8Array) ||
        acquired.material.byteLength === 0 ||
        acquired.classification !== SyntheticCredentialClassification ||
        typeof acquired.version !== "string" ||
        acquired.version.length === 0) {
      acquired?.material?.fill?.(0);
      throw new Error("SYNTHETIC_SECRET_BACKEND_RESPONSE_REFUSED");
    }
  }

  #createLease({ secretReference, binding, ttlMs, acquiredAtMs, acquired }) {
    let brokerHandle;
    try {
      brokerHandle = this.#broker.register({
        material: acquired.material,
        classification: acquired.classification,
        ...binding,
      });
    } catch {
      acquired.material.fill(0);
      throw new Error("SYNTHETIC_SECRET_HANDOFF_FAILED");
    }

    let leaseHandle;
    let auditId;
    try {
      leaseHandle = `synthetic-lease-${this.#idFactory()}`;
      auditId = `synthetic-lease-audit-${this.#idFactory()}`;
    } catch {
      this.#broker.revoke(brokerHandle);
      throw new Error("SYNTHETIC_SECRET_LEASE_ID_FAILED");
    }
    if (this.#leases.has(leaseHandle)) {
      this.#broker.revoke(brokerHandle);
      throw new Error("SYNTHETIC_SECRET_LEASE_ID_COLLISION");
    }
    const record = {
      auditId,
      binding: Object.freeze({ ...binding }),
      brokerHandle,
      secretReference,
      secretVersion: acquired.version,
      acquiredAtMs,
      expiresAtMs: acquiredAtMs + ttlMs,
    };
    this.#leases.set(leaseHandle, record);
    try {
      this.#audit("ACQUIRED", record);
    } catch {
      this.#broker.revoke(brokerHandle);
      this.#leases.delete(leaseHandle);
      throw new Error("SYNTHETIC_SECRET_AUDIT_FAILED");
    }

    return Object.freeze({
      leaseHandle,
      classification: SyntheticCredentialClassification,
      secretReference,
      secretVersion: acquired.version,
      acquiredAt: new Date(record.acquiredAtMs).toISOString(),
      expiresAt: new Date(record.expiresAtMs).toISOString(),
    });
  }

  #now() {
    const value = this.#clock();
    if (!Number.isFinite(value)) throw new Error("SYNTHETIC_SECRET_CLOCK_REFUSED");
    return value;
  }

  #audit(event, record) {
    this.#auditSink.append(Object.freeze({
      event,
      leaseIdentity: record.auditId,
      secretReference: record.secretReference,
      secretVersion: record.secretVersion,
      ...record.binding,
      acquiredAt: new Date(record.acquiredAtMs).toISOString(),
      expiresAt: new Date(record.expiresAtMs).toISOString(),
    }));
  }

  #auditUnknown(event, secretReference) {
    this.#auditSink.append(Object.freeze({
      event,
      leaseIdentity: null,
      secretReference,
    }));
  }
}
