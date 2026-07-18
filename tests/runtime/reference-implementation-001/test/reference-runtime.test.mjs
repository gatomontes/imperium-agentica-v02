import test from "node:test";
import assert from "node:assert/strict";
import {
  Contracts,
  DispositionForms,
  EffectResults,
  validateObservation,
} from "../src/contracts.mjs";
import {
  InMemoryObservationSink,
  InMemoryStore,
  MutableFindingPort,
  SimulatedEffectPort,
} from "../src/in-memory-ports.mjs";
import { ReferenceRuntime } from "../src/reference-runtime.mjs";

function setup() {
  const store = new InMemoryStore();
  store.addComponent("worker");
  const authorityPort = new MutableFindingPort({ effective: true, reference: "authority-finding-1" });
  const correlationPort = new MutableFindingPort({ exact: true, reference: "correlation-finding-1" });
  const procedurePort = new MutableFindingPort({ permits: true, reference: Contracts.maintenanceProcedure });
  const effectPort = new SimulatedEffectPort();
  const observationSink = new InMemoryObservationSink();
  const runtime = new ReferenceRuntime({
    store,
    authorityPort,
    correlationPort,
    procedurePort,
    effectPort,
    observationSink,
    clock: () => "2026-07-18T20:00:00.000Z",
  });
  return { store, authorityPort, correlationPort, procedurePort, effectPort, observationSink, runtime };
}

function realization(overrides = {}) {
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
    environment: "test",
    component: "worker",
    scope: "scope-1",
    ...overrides,
  };
}

function disposition(overrides = {}) {
  return {
    id: "disposition-1",
    version: "1",
    contract: Contracts.disposition,
    form: DispositionForms.INSTRUCT,
    diagnosisId: "diagnosis-1",
    diagnosisVersion: "1",
    decisionMandateReference: "decision-mandate-1",
    procedureReference: Contracts.maintenanceProcedure,
    environment: "test",
    component: "worker",
    action: "INITIATE_RECOVERY",
    scope: "scope-1",
    ...overrides,
  };
}

function plan(overrides = {}) {
  return {
    id: "plan-1",
    version: "1",
    contract: Contracts.controlPlane,
    dispositionId: "disposition-1",
    dispositionVersion: "1",
    diagnosisId: "diagnosis-1",
    diagnosisVersion: "1",
    environment: "test",
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
    ...overrides,
  };
}

function dispatch(runtime, overrides = {}) {
  return runtime.dispatch({
    realizationId: "realization-1",
    attemptId: "attempt-1",
    effectId: "effect-1",
    disposition: disposition(),
    plan: plan(),
    ...overrides,
  });
}

test("pins the exact admitted contracts without draft identifiers", () => {
  assert.deepEqual(Object.values(Contracts).filter((value) => value.includes("/drafts/")), []);
  assert.match(Contracts.disposition, /CB-005$/);
  assert.match(Contracts.maintenanceProcedure, /PRB-003$/);
  assert.match(Contracts.controlPlane, /RTB-002$/);
});

test("accepts only an explicitly contract-bound realization", () => {
  const { runtime } = setup();
  assert.equal(runtime.accept(realization()).status, "ACCEPTED");
  assert.equal(runtime.accept(realization({ id: "bad", diagnosisContract: "invented" })).reason, "REALIZATION_DIAGNOSISCONTRACT_MISMATCH");
});

test("requires a decision-mandate reference in the disposition", () => {
  const { runtime, effectPort } = setup();
  runtime.accept(realization());
  const result = dispatch(runtime, { disposition: disposition({ decisionMandateReference: undefined }) });
  assert.match(result.reason, /^DISPOSITION_MISSING:/);
  assert.equal(effectPort.calls.length, 0);
});

test("only INSTRUCT_MAINTENANCE may reach the effect port", () => {
  for (const form of [DispositionForms.NO_INTERVENTION, DispositionForms.WITHHOLD, DispositionForms.ESCALATE]) {
    const { runtime, effectPort } = setup();
    runtime.accept(realization());
    assert.equal(dispatch(runtime, { disposition: disposition({ form }) }).reason, "NON_EFFECT_DISPOSITION");
    assert.equal(effectPort.calls.length, 0);
  }
});

test("a control-plane plan cannot widen Cognitive direction", () => {
  const { runtime, effectPort } = setup();
  runtime.accept(realization());
  assert.match(dispatch(runtime, { plan: plan({ component: "other" }) }).reason, /^PLAN_WIDENS_OR_MISMATCHES:/);
  assert.equal(effectPort.calls.length, 0);
});

test("current implementation and mapping versions must still match", () => {
  const { runtime, store } = setup();
  runtime.accept(realization());
  store.components.get("worker").semanticMappingVersion = "map-2";
  assert.equal(dispatch(runtime).reason, "CURRENT_STATE_MISMATCH");
});

test("Authority is evaluated immediately before every effect", () => {
  const { runtime, authorityPort, effectPort } = setup();
  runtime.accept(realization());
  authorityPort.set({ effective: false, reference: "authority-finding-1", reason: "WITHDRAWN" });
  assert.equal(dispatch(runtime).reason, "WITHDRAWN");
  assert.equal(authorityPort.calls, 1);
  assert.equal(effectPort.calls.length, 0);
});

test("exact PB-001 correlation is independently required", () => {
  const { runtime, correlationPort } = setup();
  runtime.accept(realization());
  correlationPort.set({ exact: false, reference: "correlation-finding-1", reason: "CORRELATION_MISMATCH" });
  assert.equal(dispatch(runtime).reason, "CORRELATION_MISMATCH");
});

test("the cited PRB-003 transition must permit dispatch", () => {
  const { runtime, procedurePort } = setup();
  runtime.accept(realization());
  procedurePort.set({ permits: false, reference: Contracts.maintenanceProcedure, reason: "PROCEDURE_WITHHELD" });
  assert.equal(dispatch(runtime).reason, "PROCEDURE_WITHHELD");
});

test("successful dispatch remains operational only", () => {
  const { runtime, observationSink } = setup();
  runtime.accept(realization());
  assert.equal(dispatch(runtime).status, "SUCCEEDED_OPERATIONALLY");
  assert.ok(observationSink.items.every(validateObservation));
  assert.ok(observationSink.items.every((item) => item.semanticDisclaimer.includes("not a Cognitive")));
});

test("duplicate effect identity cannot dispatch twice", () => {
  const { runtime, effectPort } = setup();
  runtime.accept(realization());
  assert.equal(dispatch(runtime).status, "SUCCEEDED_OPERATIONALLY");
  assert.equal(dispatch(runtime, { attemptId: "attempt-2" }).reason, "DUPLICATE_EFFECT");
  assert.equal(effectPort.calls.length, 1);
});

test("indeterminate effects are quarantined and cannot repeat", () => {
  const { runtime, effectPort } = setup();
  runtime.accept(realization());
  effectPort.setResult(EffectResults.INDETERMINATE);
  assert.equal(dispatch(runtime).status, "QUARANTINED_INDETERMINATE");
  assert.equal(dispatch(runtime, { attemptId: "attempt-2" }).reason, "INDETERMINATE_EFFECT_QUARANTINED");
  assert.equal(effectPort.calls.length, 1);
});

test("crash before dispatch is distinct from post-dispatch indeterminacy", () => {
  const first = setup();
  first.runtime.accept(realization());
  assert.equal(dispatch(first.runtime, { crashAt: "before-dispatch" }).status, "CRASHED_BEFORE_DISPATCH");
  assert.equal(first.effectPort.calls.length, 0);

  const second = setup();
  second.runtime.accept(realization());
  assert.equal(dispatch(second.runtime, { crashAt: "after-dispatch" }).status, "QUARANTINED_INDETERMINATE");
  assert.equal(second.effectPort.calls.length, 1);
});

test("observations contain no credential material", () => {
  const { runtime, observationSink } = setup();
  runtime.accept(realization());
  dispatch(runtime);
  const encoded = JSON.stringify(observationSink.items);
  assert.doesNotMatch(encoded, /token|privateKey|credentialValue|secretValue/);
});

test("the implementation exports no Master Mason or Authority registry", async () => {
  const runtimeModule = await import("../src/reference-runtime.mjs");
  const portModule = await import("../src/in-memory-ports.mjs");
  assert.equal("MasterMason" in runtimeModule, false);
  assert.equal("AuthorityRegistry" in portModule, false);
});
