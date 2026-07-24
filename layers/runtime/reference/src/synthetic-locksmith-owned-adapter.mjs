import {
  LocksmithAccessPort,
  LocksmithOperationIds,
} from "./locksmith-access-port.mjs";

const recordFields = Object.freeze([
  "recordId",
  "operationId",
  "operationVersion",
  "missionId",
  "deploymentId",
  "operativeBindingId",
  "providerId",
  "environment",
  "component",
  "scope",
  "purpose",
  "active",
]);

function exactFields(value, fields) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return false;
  const actual = Object.keys(value).sort();
  const expected = [...fields].sort();
  return actual.length === expected.length &&
    actual.every((field, index) => field === expected[index]);
}

function requireText(value) {
  if (typeof value !== "string" || value.length === 0) {
    throw new Error("SYNTHETIC_LOCKSMITH_RECORD_INVALID");
  }
}

function recordKey(record) {
  return [
    record.operationId,
    record.operationVersion,
    record.missionId,
    record.deploymentId,
    record.operativeBindingId,
    record.providerId,
    record.environment,
    record.component,
    record.scope,
    record.purpose,
  ].join("\u001f");
}

function requestKey(request) {
  return recordKey({
    ...request,
    ...request.parameters,
  });
}

export class SyntheticLocksmithOwnedAdapter {
  #availability;
  #records = new Map();
  #usedTickets = new Set();

  constructor({ records, availability = () => true } = {}) {
    if (!Array.isArray(records) || records.length === 0 || typeof availability !== "function") {
      throw new Error("SYNTHETIC_LOCKSMITH_CONFIGURATION_REQUIRED");
    }
    for (const source of records) {
      if (!exactFields(source, recordFields)) {
        throw new Error("SYNTHETIC_LOCKSMITH_RECORD_INVALID");
      }
      for (const field of recordFields.filter((name) => name !== "active")) {
        requireText(source[field]);
      }
      if (source.operationId !== LocksmithOperationIds.SYNTHETIC_PROVIDER_RECOVERY_V1 ||
          source.operationVersion !== "1" ||
          typeof source.active !== "boolean") {
        throw new Error("SYNTHETIC_LOCKSMITH_RECORD_INVALID");
      }
      const record = Object.freeze({ ...source });
      const key = recordKey(record);
      if (this.#records.has(key)) throw new Error("SYNTHETIC_LOCKSMITH_RECORD_DUPLICATE");
      this.#records.set(key, record);
    }
    this.#availability = availability;
  }

  perform(request) {
    if (this.#availability() !== true) {
      throw new Error("SYNTHETIC_LOCKSMITH_UNAVAILABLE");
    }
    const record = this.#records.get(requestKey(request));
    if (!record?.active) throw new Error("SYNTHETIC_LOCKSMITH_OPERATION_REFUSED");
    if (this.#usedTickets.has(request.ticketId)) {
      throw new Error("SYNTHETIC_LOCKSMITH_TICKET_REPLAY");
    }
    this.#usedTickets.add(request.ticketId);
    return Object.freeze({ status: "RECOVERY_INITIATED" });
  }
}

export function createSyntheticLocksmithAccessPort({
  records,
  availability,
  auditSink,
  clock,
  idFactory,
} = {}) {
  const executor = new SyntheticLocksmithOwnedAdapter({ records, availability });
  return new LocksmithAccessPort({ executor, auditSink, clock, idFactory });
}
