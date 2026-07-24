import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { Contracts, DispositionForms, EffectResults } from "../../../../layers/runtime/reference/src/contracts.mjs";
import { InMemoryObservationSink, InMemoryStore, MutableFindingPort } from "../../../../layers/runtime/reference/src/in-memory-ports.mjs";
import { NodeProcessSupervisorEnvironment } from "../../../../layers/runtime/reference/src/node-process-supervisor-adapter.mjs";
import {
  SyntheticCredentialNodeProcessSupervisorAdapter,
  SyntheticNodeProcessSupervisorCredentialPurpose,
} from "../../../../layers/runtime/reference/src/synthetic-credential-node-process-supervisor-adapter.mjs";
import {
  SyntheticCredentialBroker,
  SyntheticCredentialClassification,
  SyntheticCredentialResults,
} from "../../../../layers/runtime/reference/src/synthetic-credential-broker.mjs";
import {
  InMemorySyntheticSecretStoreBackend,
  SyntheticSecretStorePort,
} from "../../../../layers/runtime/reference/src/synthetic-secret-store-port.mjs";
import { ReferenceRuntime } from "../../../../layers/runtime/reference/src/reference-runtime.mjs";

const environment = NodeProcessSupervisorEnvironment;
const component = "worker";
const scope = "scope-1";
const purpose = SyntheticNodeProcessSupervisorCredentialPurpose;
const secretReference = "synthetic/provider/recovery";
const secretMarker = "SYNTHETIC_STORE_TOKEN";
const binding = Object.freeze({ environment, component, scope, purpose });

function ids(values) {
  const queue = [...values];
  return () => queue.shift();
}

function fixture({ now = 1_000, maxTtlMs = 100, seed = true } = {}) {
  const time = { now };
  const backend = new InMemorySyntheticSecretStoreBackend();
  let seedMaterial;
  if (seed) {
    seedMaterial = new TextEncoder().encode(secretMarker);
    backend.seed({
      secretReference,
      material: seedMaterial,
      classification: SyntheticCredentialClassification,
      version: "version-1",
    });
  }
  const brokerEvents = [];
  const broker = new SyntheticCredentialBroker({
    auditSink: { append: (event) => brokerEvents.push(event) },
    idFactory: ids(["broker-handle-001", "broker-audit-001", "broker-handle-002", "broker-audit-002"]),
  });
  const portEvents = [];
  const port = new SyntheticSecretStorePort({
    backend,
    broker,
    auditSink: { append: (event) => portEvents.push(event) },
    clock: () => time.now,
    idFactory: ids(["lease-handle-001", "lease-audit-001", "lease-handle-002", "lease-audit-002"]),
    maxTtlMs,
  });
  return { backend, broker, brokerEvents, port, portEvents, seedMaterial, time };
}

function acquire(port, overrides = {}) {
  return port.acquire({
    secretReference,
    ...binding,
    ttlMs: 50,
    ...overrides,
  });
}

function consume(port, leaseHandle, consumer, overrides = {}) {
  return port.consume({
    handle: leaseHandle,
    ...binding,
    ...overrides,
  }, consumer);
}

function realization() {
  return {
    id: "realization-1",
    contract: Contracts.realization,
    procedureReference: Contracts.maintenanceProcedure,
    diagnosisContract: Contracts.diagnosis,
    dispositionContract: Contracts.disposition,
    authorityContract: Contracts.authority,
    provenanceContract: Contracts.provenance,
    implementationVersion: "impl-1",
    semanticMappingVersion: "map-1",
    environment,
    component,
    scope,
  };
}

function disposition() {
  return {
    id: "disposition-1",
    version: "1",
    contract: Contracts.disposition,
    form: DispositionForms.INSTRUCT,
    diagnosisId: "diagnosis-1",
    diagnosisVersion: "1",
    decisionMandateReference: "decision-mandate-1",
    procedureReference: Contracts.maintenanceProcedure,
    environment,
    component,
    action: "INITIATE_RECOVERY",
    scope,
  };
}

function plan() {
  return {
    id: "plan-1",
    version: "1",
    contract: Contracts.controlPlane,
    dispositionId: "disposition-1",
    dispositionVersion: "1",
    diagnosisId: "diagnosis-1",
    diagnosisVersion: "1",
    environment,
    component,
    action: "INITIATE_RECOVERY",
    scope,
    implementationVersion: "impl-1",
    semanticMappingVersion: "map-1",
    authorityFindingReference: "authority-finding-1",
    correlationFindingReference: "correlation-finding-1",
    procedureReference: Contracts.maintenanceProcedure,
    startCondition: "component-blocked",
    stopCondition: "component-operable",
    abortCondition: "state-mismatch",
    successCondition: "operational-recovery-observed",
  };
}

function runtime(effectPort) {
  const store = new InMemoryStore();
  const observations = new InMemoryObservationSink();
  store.addComponent(component);
  const instance = new ReferenceRuntime({
    store,
    authorityPort: new MutableFindingPort({ effective: true, reference: "authority-finding-1" }),
    correlationPort: new MutableFindingPort({ exact: true, reference: "correlation-finding-1" }),
    procedurePort: new MutableFindingPort({ permits: true, reference: Contracts.maintenanceProcedure }),
    effectPort,
    observationSink: observations,
    clock: () => "2026-07-18T23:45:00.000Z",
  });
  assert.equal(instance.accept(realization()).status, "ACCEPTED");
  return { instance, observations };
}

function dispatch(instance) {
  return instance.dispatch({
    realizationId: "realization-1",
    attemptId: "attempt-1",
    effectId: "effect-1",
    disposition: disposition(),
    plan: plan(),
  });
}

test("historical synthetic secret-store port is not actively exported", () => {
  const manifest = JSON.parse(readFileSync(new URL("../../../../layers/runtime/reference/package.json", import.meta.url), "utf8"));
  assert.equal(manifest.exports["./security/synthetic-secret-store"], undefined);
});

test("synthetic backend admits only classified bytes and zeroes the seed caller view", () => {
  const backend = new InMemorySyntheticSecretStoreBackend();
  assert.throws(() => backend.seed({
    secretReference,
    material: "not-bytes",
    classification: SyntheticCredentialClassification,
    version: "version-1",
  }), /SYNTHETIC_SECRET_BYTES_REQUIRED/);
  assert.throws(() => backend.seed({
    secretReference,
    material: Uint8Array.from([1]),
    classification: "REAL_SECRET",
    version: "version-1",
  }), /SYNTHETIC_SECRET_CLASSIFICATION_REQUIRED/);
  const material = new TextEncoder().encode(secretMarker);
  backend.seed({
    secretReference,
    material,
    classification: SyntheticCredentialClassification,
    version: "version-1",
  });
  assert.equal(material.every((byte) => byte === 0), true);
});

test("backend replacement exposes only the current synthetic version", () => {
  const context = fixture();
  const replacement = new TextEncoder().encode("SYNTHETIC_ROTATED_TOKEN");
  context.backend.seed({
    secretReference,
    material: replacement,
    classification: SyntheticCredentialClassification,
    version: "version-2",
  });
  const acquired = acquire(context.port);
  assert.equal(acquired.secretVersion, "version-2");
  let observed;
  consume(context.port, acquired.leaseHandle, (view) => {
    observed = new TextDecoder().decode(view);
    return SyntheticCredentialResults.CONSUMED;
  });
  assert.equal(observed, "SYNTHETIC_ROTATED_TOKEN");
});

test("acquisition returns bounded metadata and an opaque external lease", () => {
  const context = fixture();
  const acquired = acquire(context.port);
  assert.deepEqual(acquired, {
    leaseHandle: "synthetic-lease-lease-handle-001",
    classification: SyntheticCredentialClassification,
    secretReference,
    secretVersion: "version-1",
    acquiredAt: "1970-01-01T00:00:01.000Z",
    expiresAt: "1970-01-01T00:00:01.050Z",
  });
  const serialized = JSON.stringify(acquired);
  assert.equal(serialized.includes(secretMarker), false);
  assert.equal(serialized.includes("synthetic-handle-broker-handle-001"), false);
});

test("exact lease handoff discloses once and zeroes the captured view", () => {
  const context = fixture();
  const acquired = acquire(context.port);
  let during;
  let captured;
  assert.equal(consume(context.port, acquired.leaseHandle, (view) => {
    captured = view;
    during = new TextDecoder().decode(view);
    return SyntheticCredentialResults.CONSUMED;
  }), SyntheticCredentialResults.CONSUMED);
  assert.equal(during, secretMarker);
  assert.equal(captured.every((byte) => byte === 0), true);
  assert.equal(consume(context.port, acquired.leaseHandle, () => SyntheticCredentialResults.CONSUMED), SyntheticCredentialResults.UNKNOWN);
});

test("binding mismatch refuses without consuming the lease", () => {
  const context = fixture();
  const acquired = acquire(context.port);
  let calls = 0;
  assert.equal(consume(context.port, acquired.leaseHandle, () => ++calls, { scope: "other" }), SyntheticCredentialResults.REFUSED);
  assert.equal(consume(context.port, acquired.leaseHandle, () => {
    calls += 1;
    return SyntheticCredentialResults.CONSUMED;
  }), SyntheticCredentialResults.CONSUMED);
  assert.equal(calls, 1);
});

test("TTL is bounded and expiry refuses at the exact boundary", () => {
  const context = fixture();
  assert.throws(() => acquire(context.port, { ttlMs: 0 }), /SYNTHETIC_SECRET_TTL_REFUSED/);
  assert.throws(() => acquire(context.port, { ttlMs: 101 }), /SYNTHETIC_SECRET_TTL_REFUSED/);
  const acquired = acquire(context.port);
  context.time.now = 1_050;
  let calls = 0;
  assert.equal(consume(context.port, acquired.leaseHandle, () => ++calls), SyntheticCredentialResults.REFUSED);
  assert.equal(calls, 0);
});

test("explicit lease revocation and port close prevent later disclosure", () => {
  const first = fixture();
  const lease = acquire(first.port).leaseHandle;
  assert.equal(first.port.revoke(lease), SyntheticCredentialResults.REFUSED);
  assert.equal(consume(first.port, lease, () => SyntheticCredentialResults.CONSUMED), SyntheticCredentialResults.UNKNOWN);

  const second = acquire(first.port).leaseHandle;
  first.port.close();
  assert.equal(consume(first.port, second, () => SyntheticCredentialResults.CONSUMED), SyntheticCredentialResults.UNKNOWN);
});

test("secret-reference revocation invalidates active leases and future acquisition", () => {
  const context = fixture();
  const acquired = acquire(context.port);
  assert.equal(context.port.revokeSecret(secretReference), true);
  assert.equal(consume(context.port, acquired.leaseHandle, () => SyntheticCredentialResults.CONSUMED), SyntheticCredentialResults.UNKNOWN);
  assert.throws(() => acquire(context.port), /SYNTHETIC_SECRET_ACQUISITION_FAILED/);
});

test("unavailable and absent stores fail closed with one generic acquisition error", () => {
  const unavailable = fixture();
  unavailable.backend.setAvailable(false);
  assert.throws(() => acquire(unavailable.port), /SYNTHETIC_SECRET_ACQUISITION_FAILED/);

  const absent = fixture({ seed: false });
  assert.throws(() => acquire(absent.port), /SYNTHETIC_SECRET_ACQUISITION_FAILED/);
  assert.equal(JSON.stringify([...unavailable.portEvents, ...absent.portEvents]).includes(secretMarker), false);
});

test("store lease is broker-compatible with the synthetic provider projection", () => {
  const context = fixture();
  const acquired = acquire(context.port);
  let providerRequest;
  let credentialDuring;
  const adapter = new SyntheticCredentialNodeProcessSupervisorAdapter({
    credentialBroker: context.port,
    credentialHandle: acquired.leaseHandle,
    driver: {
      initiateRecovery(request, credentialView) {
        providerRequest = structuredClone(request);
        credentialDuring = new TextDecoder().decode(credentialView);
        return { status: "RECOVERY_INITIATED" };
      },
    },
  });
  assert.equal(adapter.dispatch({
    effectId: "effect-1",
    attemptId: "attempt-1",
    realization: { environment, component, scope },
    plan: { environment, component, scope, action: "INITIATE_RECOVERY" },
  }), EffectResults.SUCCEEDED);
  assert.equal(credentialDuring, secretMarker);
  assert.deepEqual(Object.keys(providerRequest).sort(), ["action", "attemptId", "component", "environment", "operationId", "scope"]);
});

test("Runtime and lease audits contain neither material nor capability handles", () => {
  const context = fixture();
  const acquired = acquire(context.port);
  const adapter = new SyntheticCredentialNodeProcessSupervisorAdapter({
    credentialBroker: context.port,
    credentialHandle: acquired.leaseHandle,
    driver: { initiateRecovery: () => ({ status: "RECOVERY_INITIATED" }) },
  });
  const execution = runtime(adapter);
  assert.equal(dispatch(execution.instance).status, "SUCCEEDED_OPERATIONALLY");
  const serialized = JSON.stringify({
    observations: execution.observations.items,
    portEvents: context.portEvents,
    brokerEvents: context.brokerEvents,
  });
  assert.equal(serialized.includes(secretMarker), false);
  assert.equal(serialized.includes(acquired.leaseHandle), false);
  assert.equal(serialized.includes("synthetic-handle-broker-handle-001"), false);
  assert.equal(execution.observations.items.at(-1).secretRedactionStatus, "NO_SECRETS_RECORDED");
});

test("driver failure consumes the lease, suppresses detail, and leaves no reusable view", () => {
  const context = fixture();
  const acquired = acquire(context.port);
  let captured;
  const adapter = new SyntheticCredentialNodeProcessSupervisorAdapter({
    credentialBroker: context.port,
    credentialHandle: acquired.leaseHandle,
    driver: {
      initiateRecovery(_request, credentialView) {
        captured = credentialView;
        throw new Error(secretMarker);
      },
    },
  });
  const providerRequest = {
    effectId: "effect-1",
    attemptId: "attempt-1",
    realization: { environment, component, scope },
    plan: { environment, component, scope, action: "INITIATE_RECOVERY" },
  };
  assert.equal(adapter.dispatch(providerRequest), EffectResults.INDETERMINATE);
  assert.equal(captured.every((byte) => byte === 0), true);
  assert.equal(adapter.dispatch({ ...providerRequest, effectId: "effect-2" }), EffectResults.FAILED);
});

test("store-port source contains no real persistence, transport, keychain, provider, or environment mechanism", () => {
  const source = readFileSync(new URL("../../../../layers/runtime/reference/src/synthetic-secret-store-port.mjs", import.meta.url), "utf8");
  assert.doesNotMatch(source, /process\.env|node:fs|node:http|node:https|node:net|fetch\(|child_process|keychain|apiKey|accessToken|password|privateKey/);
});


test("asynchronous backend acquisition enters the existing one-use lease boundary", async () => {
  let backendCalls = 0;
  const asyncBackend = {
    acquisitionMode: "ASYNC",
    async acquire({ secretReference: requestedReference }) {
      backendCalls += 1;
      assert.equal(requestedReference, secretReference);
      return {
        material: new TextEncoder().encode(secretMarker),
        classification: SyntheticCredentialClassification,
        version: "version-7",
      };
    },
    revoke() {
      return false;
    },
  };
  const broker = new SyntheticCredentialBroker({
    auditSink: { append() {} },
    idFactory: ids(["async-broker-handle", "async-broker-audit"]),
  });
  const port = new SyntheticSecretStorePort({
    backend: asyncBackend,
    broker,
    auditSink: { append() {} },
    clock: () => 1_000,
    idFactory: ids(["async-lease-handle", "async-lease-audit"]),
    maxTtlMs: 100,
  });

  assert.throws(() => acquire(port), /SYNTHETIC_SECRET_ACQUISITION_FAILED/);
  assert.equal(backendCalls, 0);

  const lease = await port.acquireAsync({
    secretReference,
    ...binding,
    ttlMs: 50,
  });
  assert.equal(backendCalls, 1);
  assert.equal(lease.secretVersion, "version-7");

  let observed;
  assert.equal(consume(port, lease.leaseHandle, (view) => {
    observed = new TextDecoder().decode(view);
    return SyntheticCredentialResults.CONSUMED;
  }), SyntheticCredentialResults.CONSUMED);
  assert.equal(observed, secretMarker);
  assert.equal(consume(port, lease.leaseHandle, () => SyntheticCredentialResults.CONSUMED), SyntheticCredentialResults.UNKNOWN);
});
