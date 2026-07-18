import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { Contracts, DispositionForms, EffectResults } from "../../../../layers/runtime/reference/src/contracts.mjs";
import { InMemoryObservationSink, InMemoryStore, MutableFindingPort } from "../../../../layers/runtime/reference/src/in-memory-ports.mjs";
import { NodeProcessSupervisorAdapter, NodeProcessSupervisorEnvironment } from "../../../../layers/runtime/reference/src/node-process-supervisor-adapter.mjs";
import { ReferenceRuntime } from "../../../../layers/runtime/reference/src/reference-runtime.mjs";

class Driver {
  constructor(status = "RECOVERY_INITIATED") {
    this.status = status;
    this.calls = [];
    this.error = null;
  }

  initiateRecovery(request) {
    this.calls.push(structuredClone(request));
    if (this.error) throw this.error;
    return { status: this.status };
  }
}

function request(overrides = {}) {
  const environment = NodeProcessSupervisorEnvironment;
  const base = {
    effectId: "effect-1",
    attemptId: "attempt-1",
    realization: { environment, component: "worker", scope: "scope-1" },
    plan: { environment, component: "worker", scope: "scope-1", action: "INITIATE_RECOVERY" },
  };
  return {
    ...base,
    ...overrides,
    realization: { ...base.realization, ...overrides.realization },
    plan: { ...base.plan, ...overrides.plan },
  };
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
    environment: NodeProcessSupervisorEnvironment,
    component: "worker",
    scope: "scope-1",
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
    environment: NodeProcessSupervisorEnvironment,
    component: "worker",
    action: "INITIATE_RECOVERY",
    scope: "scope-1",
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
    environment: NodeProcessSupervisorEnvironment,
    component: "worker",
    action: "INITIATE_RECOVERY",
    scope: "scope-1",
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

function runtime(driver = new Driver()) {
  const store = new InMemoryStore();
  const observations = new InMemoryObservationSink();
  store.addComponent("worker");
  const instance = new ReferenceRuntime({
    store,
    authorityPort: new MutableFindingPort({ effective: true, reference: "authority-finding-1" }),
    correlationPort: new MutableFindingPort({ exact: true, reference: "correlation-finding-1" }),
    procedurePort: new MutableFindingPort({ permits: true, reference: Contracts.maintenanceProcedure }),
    effectPort: new NodeProcessSupervisorAdapter({ driver }),
    observationSink: observations,
    clock: () => "2026-07-18T23:00:00.000Z",
  });
  assert.equal(instance.accept(realization()).status, "ACCEPTED");
  return { instance, driver, observations };
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

test("private package exports the Node process-supervisor adapter", () => {
  const manifest = JSON.parse(readFileSync(new URL("../../../../layers/runtime/reference/package.json", import.meta.url), "utf8"));
  assert.equal(manifest.exports["./providers/node-process-supervisor"], "./src/node-process-supervisor-adapter.mjs");
});

test("adapter accepts the exact configured environment", () => {
  const driver = new Driver();
  const adapter = new NodeProcessSupervisorAdapter({ driver });
  assert.equal(adapter.dispatch(request()), EffectResults.SUCCEEDED);
  assert.equal(driver.calls.length, 1);
});

test("adapter refuses a different environment before the driver", () => {
  const driver = new Driver();
  const adapter = new NodeProcessSupervisorAdapter({ driver });
  assert.equal(adapter.dispatch(request({ plan: { environment: "other" } })), EffectResults.FAILED);
  assert.equal(driver.calls.length, 0);
});

test("adapter refuses an unsupported action before the driver", () => {
  const driver = new Driver();
  const adapter = new NodeProcessSupervisorAdapter({ driver });
  assert.equal(adapter.dispatch(request({ plan: { action: "DELETE_COMPONENT" } })), EffectResults.FAILED);
  assert.equal(driver.calls.length, 0);
});

test("adapter refuses widened component or scope before the driver", () => {
  for (const planOverride of [{ component: "other" }, { scope: "other" }]) {
    const driver = new Driver();
    const adapter = new NodeProcessSupervisorAdapter({ driver });
    assert.equal(adapter.dispatch(request({ plan: planOverride })), EffectResults.FAILED);
    assert.equal(driver.calls.length, 0);
  }
});

test("driver receives only bounded operational fields and the effect identity", () => {
  const driver = new Driver();
  new NodeProcessSupervisorAdapter({ driver }).dispatch(request());
  assert.deepEqual(driver.calls[0], {
    operationId: "effect-1",
    attemptId: "attempt-1",
    environment: NodeProcessSupervisorEnvironment,
    component: "worker",
    scope: "scope-1",
    action: "INITIATE_RECOVERY",
  });
});

test("RECOVERY_INITIATED maps to operational success", () => {
  assert.equal(new NodeProcessSupervisorAdapter({ driver: new Driver("RECOVERY_INITIATED") }).dispatch(request()), EffectResults.SUCCEEDED);
});

test("RECOVERY_REFUSED maps to operational failure", () => {
  assert.equal(new NodeProcessSupervisorAdapter({ driver: new Driver("RECOVERY_REFUSED") }).dispatch(request()), EffectResults.FAILED);
});

test("unknown responses and driver exceptions remain indeterminate", () => {
  assert.equal(new NodeProcessSupervisorAdapter({ driver: new Driver("UNKNOWN") }).dispatch(request()), EffectResults.INDETERMINATE);
  const driver = new Driver();
  driver.error = new Error("driver unavailable");
  assert.equal(new NodeProcessSupervisorAdapter({ driver }).dispatch(request()), EffectResults.INDETERMINATE);
});

test("ReferenceRuntime records provider initiation as operational success only", () => {
  const context = runtime();
  assert.equal(dispatch(context.instance).status, "SUCCEEDED_OPERATIONALLY");
  assert.equal(context.observations.items.at(-1).result, "COMPLETED_OPERATIONALLY");
  assert.match(context.observations.items.at(-1).semanticDisclaimer, /Operational observation only/);
});

test("duplicate Runtime dispatch does not invoke the provider twice", () => {
  const context = runtime();
  assert.equal(dispatch(context.instance).status, "SUCCEEDED_OPERATIONALLY");
  assert.equal(dispatch(context.instance).reason, "DUPLICATE_EFFECT");
  assert.equal(context.driver.calls.length, 1);
});

test("adapter source contains no live transport, subprocess, or credential mechanism", () => {
  const source = readFileSync(new URL("../../../../layers/runtime/reference/src/node-process-supervisor-adapter.mjs", import.meta.url), "utf8");
  assert.doesNotMatch(source, /node:(?:child_process|http|https|net)|fetch\(|spawn\(|exec\(/);
  assert.doesNotMatch(source, /apiKey|accessToken|password|privateKey|credentialValue/);
});
