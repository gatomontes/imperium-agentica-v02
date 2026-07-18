import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Contracts, DispositionForms } from "../src/contracts.mjs";
import { FileBackedStore, appendCorruptTail, writeUnknownSchemaJournal } from "../src/file-store.mjs";
import { InMemoryObservationSink, MutableFindingPort, SimulatedEffectPort } from "../src/in-memory-ports.mjs";
import { ReferenceRuntime } from "../src/reference-runtime.mjs";

function directory() {
  return mkdtempSync(join(tmpdir(), "imperium-runtime-store-"));
}

function cleanup(path) {
  rmSync(path, { recursive: true, force: true });
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

function runtime(store, effectPort = new SimulatedEffectPort()) {
  return {
    effectPort,
    runtime: new ReferenceRuntime({
      store,
      authorityPort: new MutableFindingPort({ effective: true, reference: "authority-finding-1" }),
      correlationPort: new MutableFindingPort({ exact: true, reference: "correlation-finding-1" }),
      procedurePort: new MutableFindingPort({ permits: true, reference: Contracts.maintenanceProcedure }),
      effectPort,
      observationSink: new InMemoryObservationSink(),
      clock: () => "2026-07-18T21:00:00.000Z",
    }),
  };
}

test("reconstructs components, realizations, and completed effects after restart", () => {
  const path = directory();
  try {
    let store = new FileBackedStore(path);
    store.addComponent("worker");
    const first = runtime(store).runtime;
    assert.equal(first.accept(realization()).status, "ACCEPTED");
    assert.equal(first.dispatch({ realizationId: "realization-1", attemptId: "attempt-1", effectId: "effect-1", disposition: disposition(), plan: plan() }).status, "SUCCEEDED_OPERATIONALLY");
    store.close();

    store = new FileBackedStore(path);
    assert.equal(store.hasComponent("worker"), true);
    assert.equal(store.getRealization("realization-1").id, "realization-1");
    assert.equal(store.getEffect("effect-1").status, "SUCCEEDED_OPERATIONALLY");
    store.close();
  } finally {
    cleanup(path);
  }
});

test("permits only one writer for a store directory", () => {
  const path = directory();
  try {
    const first = new FileBackedStore(path);
    assert.throws(() => new FileBackedStore(path), /STORE_ALREADY_OPEN/);
    first.close();
    const reopened = new FileBackedStore(path);
    reopened.close();
  } finally {
    cleanup(path);
  }
});

test("refuses a truncated or corrupt journal tail", () => {
  const path = directory();
  try {
    const store = new FileBackedStore(path);
    store.addComponent("worker");
    store.close();
    appendCorruptTail(path);
    assert.throws(() => new FileBackedStore(path), /JOURNAL_TRUNCATED_OR_CORRUPT/);
  } finally {
    cleanup(path);
  }
});

test("refuses an unknown journal schema", () => {
  const path = directory();
  try {
    writeUnknownSchemaJournal(path);
    assert.throws(() => new FileBackedStore(path), /JOURNAL_SCHEMA_OR_SEQUENCE_MISMATCH/);
  } finally {
    cleanup(path);
  }
});

test("reclassifies a persisted DISPATCHED effect as indeterminate on restart", () => {
  const path = directory();
  try {
    let store = new FileBackedStore(path);
    store.saveEffect("effect-1", { effectId: "effect-1", attemptId: "attempt-1", status: "DISPATCHED" });
    store.close();
    store = new FileBackedStore(path);
    assert.deepEqual(store.getEffect("effect-1"), {
      effectId: "effect-1",
      attemptId: "attempt-1",
      status: "QUARANTINED_INDETERMINATE",
      recoveryReason: "PROCESS_RESTART_AFTER_DISPATCH",
    });
    store.close();
  } finally {
    cleanup(path);
  }
});

test("preserves an already quarantined effect across restart", () => {
  const path = directory();
  try {
    let store = new FileBackedStore(path);
    const { runtime: first, effectPort } = runtime(store);
    store.addComponent("worker");
    first.accept(realization());
    effectPort.setResult("INDETERMINATE");
    assert.equal(first.dispatch({ realizationId: "realization-1", attemptId: "attempt-1", effectId: "effect-1", disposition: disposition(), plan: plan() }).status, "QUARANTINED_INDETERMINATE");
    store.close();
    store = new FileBackedStore(path);
    assert.equal(store.getEffect("effect-1").status, "QUARANTINED_INDETERMINATE");
    store.close();
  } finally {
    cleanup(path);
  }
});

test("a recovered Runtime refuses repeat of an indeterminate effect", () => {
  const path = directory();
  try {
    let store = new FileBackedStore(path);
    store.addComponent("worker");
    store.saveRealization("realization-1", realization());
    store.saveEffect("effect-1", { effectId: "effect-1", attemptId: "attempt-1", status: "DISPATCHED" });
    store.close();
    store = new FileBackedStore(path);
    const recovered = runtime(store);
    const result = recovered.runtime.dispatch({ realizationId: "realization-1", attemptId: "attempt-2", effectId: "effect-1", disposition: disposition(), plan: plan() });
    assert.equal(result.reason, "INDETERMINATE_EFFECT_QUARANTINED");
    assert.equal(recovered.effectPort.calls.length, 0);
    store.close();
  } finally {
    cleanup(path);
  }
});

test("journal contains operational references but no secret material", () => {
  const path = directory();
  try {
    const store = new FileBackedStore(path);
    store.addComponent("worker");
    store.saveRealization("realization-1", realization());
    store.close();
    const journal = readFileSync(join(path, "runtime-reference.journal"), "utf8");
    assert.match(journal, /realization-1/);
    assert.doesNotMatch(journal, /token|privateKey|credentialValue|secretValue/);
  } finally {
    cleanup(path);
  }
});
