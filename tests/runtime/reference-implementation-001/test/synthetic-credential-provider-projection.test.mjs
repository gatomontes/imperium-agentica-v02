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
} from "../../../../layers/runtime/reference/src/synthetic-credential-broker.mjs";
import { ReferenceRuntime } from "../../../../layers/runtime/reference/src/reference-runtime.mjs";

const environment = NodeProcessSupervisorEnvironment;
const component = "worker";
const scope = "scope-1";
const secretMarker = "SYNTHETIC_PROVIDER_TOKEN";

function assertZeroed(view) {
  assert.equal(view.length > 0, true);
  assert.equal(view.every((byte) => byte === 0), true);
}

function request(overrides = {}) {
  const base = {
    effectId: "effect-1",
    attemptId: "attempt-1",
    realization: { environment, component, scope },
    plan: { environment, component, scope, action: "INITIATE_RECOVERY" },
  };
  return {
    ...base,
    ...overrides,
    realization: { ...base.realization, ...overrides.realization },
    plan: { ...base.plan, ...overrides.plan },
  };
}

function fixture({ binding = {}, status = "RECOVERY_INITIATED", behavior = null } = {}) {
  const events = [];
  const broker = new SyntheticCredentialBroker({
    auditSink: { append: (event) => events.push(event) },
    idFactory: (() => {
      const ids = ["handle-001", "audit-001"];
      return () => ids.shift();
    })(),
  });
  const material = new TextEncoder().encode(secretMarker);
  const handle = broker.register({
    material,
    classification: SyntheticCredentialClassification,
    environment,
    component,
    scope,
    purpose: SyntheticNodeProcessSupervisorCredentialPurpose,
    ...binding,
  });
  const calls = [];
  const driver = {
    initiateRecovery(providerRequest, credentialView) {
      calls.push({ providerRequest: structuredClone(providerRequest), credentialView });
      if (behavior) return behavior(providerRequest, credentialView);
      return { status };
    },
  };
  const adapter = new SyntheticCredentialNodeProcessSupervisorAdapter({
    driver,
    credentialBroker: broker,
    credentialHandle: handle,
  });
  return { adapter, broker, calls, events, handle, material };
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

function runtime(context = fixture()) {
  const store = new InMemoryStore();
  const observations = new InMemoryObservationSink();
  store.addComponent(component);
  const instance = new ReferenceRuntime({
    store,
    authorityPort: new MutableFindingPort({ effective: true, reference: "authority-finding-1" }),
    correlationPort: new MutableFindingPort({ exact: true, reference: "correlation-finding-1" }),
    procedurePort: new MutableFindingPort({ permits: true, reference: Contracts.maintenanceProcedure }),
    effectPort: context.adapter,
    observationSink: observations,
    clock: () => "2026-07-18T23:30:00.000Z",
  });
  assert.equal(instance.accept(realization()).status, "ACCEPTED");
  return { ...context, instance, observations };
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

test("private package exports the synthetic provider projection", () => {
  const manifest = JSON.parse(readFileSync(new URL("../../../../layers/runtime/reference/package.json", import.meta.url), "utf8"));
  assert.equal(
    manifest.exports["./providers/node-process-supervisor/synthetic-credentials"],
    "./src/synthetic-credential-node-process-supervisor-adapter.mjs",
  );
});

test("exact broker binding projects synthetic bytes to the injected driver", () => {
  let projected;
  const context = fixture({
    behavior: (_providerRequest, credentialView) => {
      projected = new TextDecoder().decode(credentialView);
      return { status: "RECOVERY_INITIATED" };
    },
  });
  assert.equal(context.adapter.dispatch(request()), EffectResults.SUCCEEDED);
  assert.equal(projected, secretMarker);
});

test("provider request remains the existing six-field operational projection", () => {
  const context = fixture();
  context.adapter.dispatch(request());
  assert.deepEqual(context.calls[0].providerRequest, {
    operationId: "effect-1",
    attemptId: "attempt-1",
    environment,
    component,
    scope,
    action: "INITIATE_RECOVERY",
  });
});

test("capability handle and audit identity never enter the provider request", () => {
  const context = fixture();
  context.adapter.dispatch(request());
  const serialized = JSON.stringify(context.calls[0].providerRequest);
  assert.equal(serialized.includes(context.handle), false);
  assert.equal(serialized.includes("synthetic-audit-audit-001"), false);
});

test("driver receives exact bytes only during the call and captured view is then zeroed", () => {
  let during;
  const context = fixture({
    behavior: (_providerRequest, credentialView) => {
      during = new TextDecoder().decode(credentialView);
      return { status: "RECOVERY_INITIATED" };
    },
  });
  context.adapter.dispatch(request());
  assert.equal(during, secretMarker);
  assertZeroed(context.calls[0].credentialView);
});

test("binding mismatch refuses before the driver without consuming the handle", () => {
  const context = fixture({ binding: { scope: "other-scope" } });
  assert.equal(context.adapter.dispatch(request()), EffectResults.FAILED);
  assert.equal(context.calls.length, 0);

  const correctlyBound = new SyntheticCredentialNodeProcessSupervisorAdapter({
    driver: {
      initiateRecovery: (_providerRequest, credentialView) => {
        assert.equal(new TextDecoder().decode(credentialView), secretMarker);
        return { status: "RECOVERY_INITIATED" };
      },
    },
    credentialBroker: context.broker,
    credentialHandle: context.handle,
  });
  assert.equal(correctlyBound.dispatch(request({ plan: { scope: "other-scope" }, realization: { scope: "other-scope" } })), EffectResults.SUCCEEDED);
});

test("absent or replayed credential refuses without another driver call", () => {
  const context = fixture();
  assert.equal(context.adapter.dispatch(request()), EffectResults.SUCCEEDED);
  assert.equal(context.adapter.dispatch(request({ effectId: "effect-2" })), EffectResults.FAILED);
  assert.equal(context.calls.length, 1);
});

test("explicit provider acceptance and refusal retain existing result mapping", () => {
  assert.equal(fixture({ status: "RECOVERY_INITIATED" }).adapter.dispatch(request()), EffectResults.SUCCEEDED);
  assert.equal(fixture({ status: "RECOVERY_REFUSED" }).adapter.dispatch(request()), EffectResults.FAILED);
});

test("unknown provider outcome consumes the lease and remains indeterminate", () => {
  const context = fixture({ status: "UNKNOWN" });
  assert.equal(context.adapter.dispatch(request()), EffectResults.INDETERMINATE);
  assert.equal(context.adapter.dispatch(request({ effectId: "effect-2" })), EffectResults.FAILED);
  assert.equal(context.calls.length, 1);
});

test("driver exception or Promise outcome remains indeterminate and views are zeroed", () => {
  for (const behavior of [
    () => { throw new Error(secretMarker); },
    () => Promise.resolve({ status: "RECOVERY_INITIATED" }),
  ]) {
    const context = fixture({ behavior });
    assert.equal(context.adapter.dispatch(request()), EffectResults.INDETERMINATE);
    assertZeroed(context.calls[0].credentialView);
  }
});

test("Runtime observations remain operational and contain no material or handles", () => {
  const context = runtime();
  assert.equal(dispatch(context.instance).status, "SUCCEEDED_OPERATIONALLY");
  const serialized = JSON.stringify(context.observations.items);
  assert.equal(serialized.includes(secretMarker), false);
  assert.equal(serialized.includes(context.handle), false);
  assert.equal(context.observations.items.at(-1).secretRedactionStatus, "NO_SECRETS_RECORDED");
  assert.match(context.observations.items.at(-1).semanticDisclaimer, /Operational observation only/);
});

test("duplicate Runtime effect invokes the driver and consumes the credential once", () => {
  const context = runtime();
  assert.equal(dispatch(context.instance).status, "SUCCEEDED_OPERATIONALLY");
  assert.equal(dispatch(context.instance).reason, "DUPLICATE_EFFECT");
  assert.equal(context.calls.length, 1);
});

test("projection source contains no real acquisition, persistence, transport, process, or provider mechanism", () => {
  const source = readFileSync(new URL("../../../../layers/runtime/reference/src/synthetic-credential-node-process-supervisor-adapter.mjs", import.meta.url), "utf8");
  assert.doesNotMatch(source, /process\.env|node:fs|node:http|node:https|node:net|fetch\(|child_process|keychain|apiKey|accessToken|password|privateKey/);
});
