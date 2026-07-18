import test from "node:test";
import assert from "node:assert/strict";
import { Contracts, DispositionForms } from "../../../../layers/runtime/reference/src/contracts.mjs";
import { DeterministicQuorumCoordinator, FencedExecutionGate } from "../../../../layers/runtime/reference/src/distributed-coordinator.mjs";
import { InMemoryObservationSink, InMemoryStore, MutableFindingPort, SimulatedEffectPort } from "../../../../layers/runtime/reference/src/in-memory-ports.mjs";
import { ReferenceRuntime } from "../../../../layers/runtime/reference/src/reference-runtime.mjs";

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
    environment: "test",
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
    environment: "test",
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
  };
}

function runtime(gate, effectPort = new SimulatedEffectPort()) {
  const store = new InMemoryStore();
  const observationSink = new InMemoryObservationSink();
  store.addComponent("worker");
  const instance = new ReferenceRuntime({
    store,
    authorityPort: new MutableFindingPort({ effective: true, reference: "authority-finding-1" }),
    correlationPort: new MutableFindingPort({ exact: true, reference: "correlation-finding-1" }),
    procedurePort: new MutableFindingPort({ permits: true, reference: Contracts.maintenanceProcedure }),
    effectPort,
    observationSink,
    executionGate: gate,
    clock: () => "2026-07-18T22:00:00.000Z",
  });
  assert.equal(instance.accept(realization()).status, "ACCEPTED");
  return { instance, store, effectPort, observationSink };
}

function dispatch(instance, attemptId = "attempt-1") {
  return instance.dispatch({
    realizationId: "realization-1",
    attemptId,
    effectId: "effect-1",
    disposition: disposition(),
    plan: plan(),
  });
}

test("a reachable majority may acquire a monotonically fenced lease", () => {
  const coordinator = new DeterministicQuorumCoordinator();
  coordinator.setReachable(["node-a", "node-b"]);
  const first = coordinator.acquire("node-a");
  const second = coordinator.acquire("node-b");
  assert.equal(first.accepted, true);
  assert.equal(second.accepted, true);
  assert.equal(second.lease.term, first.lease.term + 1);
  assert.notEqual(second.lease.fencingToken, first.lease.fencingToken);
});

test("a minority partition cannot acquire or use a lease", () => {
  const coordinator = new DeterministicQuorumCoordinator();
  const gate = new FencedExecutionGate(coordinator, "node-a");
  assert.equal(gate.acquire().accepted, true);
  coordinator.setReachable(["node-a"]);
  assert.deepEqual(gate.claim({ effectId: "effect-1", attemptId: "attempt-1" }), {
    accepted: false,
    reason: "QUORUM_UNAVAILABLE",
  });
  assert.equal(coordinator.acquire("node-a").reason, "QUORUM_UNAVAILABLE");
});

test("a newer quorum lease fences the prior leader", () => {
  const coordinator = new DeterministicQuorumCoordinator();
  const oldGate = new FencedExecutionGate(coordinator, "node-a");
  const newGate = new FencedExecutionGate(coordinator, "node-b");
  oldGate.acquire();
  newGate.acquire();
  assert.equal(oldGate.claim({ effectId: "effect-1", attemptId: "attempt-old" }).reason, "STALE_FENCE");
  assert.equal(newGate.claim({ effectId: "effect-1", attemptId: "attempt-new" }).accepted, true);
});

test("one effect identity can be claimed only once in a term", () => {
  const coordinator = new DeterministicQuorumCoordinator();
  const gate = new FencedExecutionGate(coordinator, "node-a");
  gate.acquire();
  assert.equal(gate.claim({ effectId: "effect-1", attemptId: "attempt-1" }).accepted, true);
  assert.equal(gate.claim({ effectId: "effect-1", attemptId: "attempt-2" }).reason, "DUPLICATE_EFFECT");
});

test("a leader fenced after claim cannot cross the dispatch boundary", () => {
  const coordinator = new DeterministicQuorumCoordinator();
  const oldGate = new FencedExecutionGate(coordinator, "node-a");
  const newGate = new FencedExecutionGate(coordinator, "node-b");
  oldGate.acquire();
  oldGate.claim({ effectId: "effect-1", attemptId: "attempt-1" });
  newGate.acquire();
  assert.equal(oldGate.markDispatched({ effectId: "effect-1", attemptId: "attempt-1" }).reason, "STALE_FENCE");
  assert.equal(coordinator.getEffect("effect-1").status, "CLAIMED");
});

test("new leader recovery permits retry only when the prior claim never dispatched", () => {
  const coordinator = new DeterministicQuorumCoordinator();
  const oldGate = new FencedExecutionGate(coordinator, "node-a");
  const newGate = new FencedExecutionGate(coordinator, "node-b");
  oldGate.acquire();
  oldGate.claim({ effectId: "effect-1", attemptId: "attempt-old" });
  newGate.acquire();
  assert.equal(newGate.recover().accepted, true);
  assert.equal(coordinator.getEffect("effect-1").status, "ABANDONED_PRE_DISPATCH");
  assert.equal(newGate.claim({ effectId: "effect-1", attemptId: "attempt-new" }).accepted, true);
});

test("new leader recovery quarantines a prior dispatched effect", () => {
  const coordinator = new DeterministicQuorumCoordinator();
  const oldGate = new FencedExecutionGate(coordinator, "node-a");
  const newGate = new FencedExecutionGate(coordinator, "node-b");
  oldGate.acquire();
  oldGate.claim({ effectId: "effect-1", attemptId: "attempt-old" });
  oldGate.markDispatched({ effectId: "effect-1", attemptId: "attempt-old" });
  newGate.acquire();
  newGate.recover();
  assert.equal(coordinator.getEffect("effect-1").status, "QUARANTINED_INDETERMINATE");
  assert.equal(newGate.claim({ effectId: "effect-1", attemptId: "attempt-new" }).reason, "INDETERMINATE_EFFECT_QUARANTINED");
});

test("a completed effect remains terminal across leadership change", () => {
  const coordinator = new DeterministicQuorumCoordinator();
  const oldGate = new FencedExecutionGate(coordinator, "node-a");
  const newGate = new FencedExecutionGate(coordinator, "node-b");
  oldGate.acquire();
  oldGate.claim({ effectId: "effect-1", attemptId: "attempt-old" });
  oldGate.markDispatched({ effectId: "effect-1", attemptId: "attempt-old" });
  oldGate.complete({ effectId: "effect-1", attemptId: "attempt-old", result: "SUCCEEDED_OPERATIONALLY" });
  newGate.acquire();
  newGate.recover();
  assert.equal(coordinator.getEffect("effect-1").status, "SUCCEEDED_OPERATIONALLY");
  assert.equal(newGate.claim({ effectId: "effect-1", attemptId: "attempt-new" }).reason, "DUPLICATE_EFFECT");
});

test("two Runtime nodes sharing a quorum dispatch an effect at most once", () => {
  const coordinator = new DeterministicQuorumCoordinator();
  const oldGate = new FencedExecutionGate(coordinator, "node-a");
  const newGate = new FencedExecutionGate(coordinator, "node-b");
  const effectPort = new SimulatedEffectPort();
  oldGate.acquire();
  const oldRuntime = runtime(oldGate, effectPort).instance;
  newGate.acquire();
  const newRuntime = runtime(newGate, effectPort).instance;
  assert.equal(dispatch(oldRuntime, "attempt-old").reason, "STALE_FENCE");
  assert.equal(dispatch(newRuntime, "attempt-new").status, "SUCCEEDED_OPERATIONALLY");
  assert.equal(effectPort.calls.length, 1);
});

test("leadership loss after external dispatch remains indeterminate", () => {
  const coordinator = new DeterministicQuorumCoordinator();
  const oldGate = new FencedExecutionGate(coordinator, "node-a");
  const newGate = new FencedExecutionGate(coordinator, "node-b");
  oldGate.acquire();
  const effectPort = {
    calls: [],
    dispatch(request) {
      this.calls.push(structuredClone(request));
      newGate.acquire();
      return "SUCCEEDED";
    },
  };
  const oldRuntime = runtime(oldGate, effectPort);
  assert.equal(dispatch(oldRuntime.instance).status, "QUARANTINED_INDETERMINATE");
  assert.equal(effectPort.calls.length, 1);
  assert.equal(oldRuntime.observationSink.items.at(-1).result, "QUARANTINED");
  assert.equal(oldRuntime.observationSink.items.at(-1).indeterminateEffect, true);
  assert.equal(newGate.recover().accepted, true);
  assert.equal(coordinator.getEffect("effect-1").status, "QUARANTINED_INDETERMINATE");
});

test("coordination evidence contains operational identities but no secret material", () => {
  const coordinator = new DeterministicQuorumCoordinator();
  const gate = new FencedExecutionGate(coordinator, "node-a");
  gate.acquire();
  gate.claim({ effectId: "effect-1", attemptId: "attempt-1" });
  const evidence = JSON.stringify(coordinator.getEvents());
  assert.match(evidence, /effect-1/);
  assert.doesNotMatch(evidence, /tokenValue|credential|privateKey|secretValue/);
});
