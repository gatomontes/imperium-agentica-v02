import { randomUUID } from "node:crypto";

export const LocksmithOperationIds = Object.freeze({
  SYNTHETIC_PROVIDER_RECOVERY_V1: "synthetic-provider-recovery.v1",
});

export const LocksmithAccessResults = Object.freeze({
  FULFILLED: "FULFILLED",
  REFUSED: "REFUSED",
});

const requestFields = Object.freeze([
  "operationId",
  "operationVersion",
  "authorityFindingReference",
  "correlationFindingReference",
  "missionId",
  "deploymentId",
  "operativeBindingId",
  "ticketId",
  "providerId",
  "expiresAt",
  "parameters",
]);

const operationSchemas = Object.freeze({
  [LocksmithOperationIds.SYNTHETIC_PROVIDER_RECOVERY_V1]: Object.freeze({
    version: "1",
    parameters: Object.freeze(["environment", "component", "scope", "purpose"]),
    resultStatus: "RECOVERY_INITIATED",
  }),
});

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function exactFields(value, fields) {
  if (!isRecord(value)) return false;
  const keys = Object.keys(value).sort();
  return keys.length === fields.length &&
    keys.every((key, index) => key === [...fields].sort()[index]);
}

function hasText(value) {
  return typeof value === "string" && value.length > 0;
}

function freezeRequest(request) {
  return Object.freeze({
    ...request,
    parameters: Object.freeze({ ...request.parameters }),
  });
}

export class LocksmithAccessPort {
  #auditSink;
  #clock;
  #executor;
  #idFactory;

  constructor({
    executor,
    auditSink = { append() {} },
    clock = () => Date.now(),
    idFactory = randomUUID,
  } = {}) {
    if (!executor || typeof executor.perform !== "function") {
      throw new Error("LOCKSMITH_EXECUTOR_REQUIRED");
    }
    if (!auditSink || typeof auditSink.append !== "function") {
      throw new Error("LOCKSMITH_AUDIT_SINK_REQUIRED");
    }
    if (typeof clock !== "function" || typeof idFactory !== "function") {
      throw new Error("LOCKSMITH_DEPENDENCY_REQUIRED");
    }
    this.#executor = executor;
    this.#auditSink = auditSink;
    this.#clock = clock;
    this.#idFactory = idFactory;
  }

  async request(request = {}) {
    const correlation = hasText(request?.correlationFindingReference)
      ? request.correlationFindingReference
      : undefined;
    let normalized;
    try {
      normalized = this.#validate(request);
    } catch {
      this.#observe("REQUEST_VALIDATION", "REFUSED", request, correlation);
      return this.#refusal(correlation);
    }

    try {
      const result = await this.#executor.perform(normalized);
      const schema = operationSchemas[normalized.operationId];
      if (!exactFields(result, ["status"]) || result.status !== schema.resultStatus) {
        this.#observe("RESULT_VALIDATION", "REFUSED", normalized, correlation);
        return this.#refusal(correlation);
      }
      this.#observe("OPERATION", "FULFILLED", normalized, correlation);
      return Object.freeze({
        status: LocksmithAccessResults.FULFILLED,
        operationId: normalized.operationId,
        operationVersion: normalized.operationVersion,
        correlationFindingReference: correlation,
        result: Object.freeze({ status: result.status }),
      });
    } catch {
      this.#observe("OPERATION", "REFUSED", normalized, correlation);
      return this.#refusal(correlation);
    }
  }

  #validate(request) {
    if (!exactFields(request, requestFields)) throw new Error("LOCKSMITH_REQUEST_FIELDS_INVALID");
    const schema = operationSchemas[request.operationId];
    if (!schema || request.operationVersion !== schema.version) {
      throw new Error("LOCKSMITH_OPERATION_NOT_ADMITTED");
    }
    for (const field of [
      "authorityFindingReference",
      "correlationFindingReference",
      "missionId",
      "deploymentId",
      "operativeBindingId",
      "ticketId",
      "providerId",
    ]) {
      if (!hasText(request[field])) throw new Error("LOCKSMITH_REFERENCE_REQUIRED");
    }
    if (!Number.isSafeInteger(request.expiresAt) || request.expiresAt <= this.#clock()) {
      throw new Error("LOCKSMITH_REQUEST_EXPIRED");
    }
    if (!exactFields(request.parameters, schema.parameters)) {
      throw new Error("LOCKSMITH_PARAMETERS_INVALID");
    }
    for (const field of schema.parameters) {
      if (!hasText(request.parameters[field])) throw new Error("LOCKSMITH_PARAMETER_REQUIRED");
    }
    return freezeRequest(request);
  }

  #refusal(correlationFindingReference) {
    return Object.freeze({
      status: LocksmithAccessResults.REFUSED,
      code: "LOCKSMITH_OPERATION_REFUSED",
      ...(correlationFindingReference ? { correlationFindingReference } : {}),
    });
  }

  #observe(stage, result, request, correlationFindingReference) {
    try {
      this.#auditSink.append(Object.freeze({
        observationId: `locksmith-observation-${this.#idFactory()}`,
        class: "LOCKSMITH_ACCESS",
        stage,
        result,
        operationId: hasText(request?.operationId) ? request.operationId : "UNKNOWN",
        missionId: hasText(request?.missionId) ? request.missionId : "UNKNOWN",
        deploymentId: hasText(request?.deploymentId) ? request.deploymentId : "UNKNOWN",
        operativeBindingId: hasText(request?.operativeBindingId) ? request.operativeBindingId : "UNKNOWN",
        ticketId: hasText(request?.ticketId) ? request.ticketId : "UNKNOWN",
        providerId: hasText(request?.providerId) ? request.providerId : "UNKNOWN",
        authorityFindingReference: hasText(request?.authorityFindingReference)
          ? request.authorityFindingReference
          : "UNKNOWN",
        correlationFindingReference: correlationFindingReference ?? "UNKNOWN",
        secretRedactionStatus: "NO_SECRETS_RECORDED",
      }));
    } catch {
      // Evidence sinks cannot expand the external result surface.
    }
  }
}
