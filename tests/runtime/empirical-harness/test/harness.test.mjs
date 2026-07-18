import test from "node:test";
import assert from "node:assert/strict";
import { Actions, AuthorityRegistry, MasterMason, Modes, RuntimeHarness, checkConformance, validateObservation } from "../src/harness.mjs";

const procedure = "runtime-maintenance-procedure-draft-001";
function setup(mode = Modes.BOUNDED) {
  const authority = new AuthorityRegistry();
  authority.issue({ id: "grant-1", version: "1", effective: true, environment: "test", components: ["worker"], actions: Object.values(Actions), mode, instructionId: "instruction-1", findings: ["RUNTIME_MAINTENANCE_ELIGIBLE"], procedure });
  const runtime = new RuntimeHarness({ authority, clock: () => "2026-07-18T12:00:00.000Z" });
  runtime.addComponent("worker");
  return { authority, runtime, mason: new MasterMason(runtime) };
}
function request(overrides = {}) {
  return { attemptId: "attempt-1", effectId: "effect-1", scope: "scope-1", environment: "test", component: "worker", action: Actions.ACTIVATE, grantId: "grant-1", diagnosis: "RUNTIME_MAINTENANCE_ELIGIBLE", procedure, correlation: "correlation-1", instructionId: "instruction-1", ...overrides };
}

test("bounded activation and deactivation change operational state only", () => {
  const { runtime } = setup();
  assert.equal(runtime.dispatch(request(), () => "SUCCEEDED").status, "SUCCEEDED_OPERATIONALLY");
  assert.equal(runtime.components.get("worker").active, true);
  assert.equal(runtime.dispatch(request({ attemptId: "attempt-2", effectId: "effect-2", action: Actions.DEACTIVATE }), () => "SUCCEEDED").status, "SUCCEEDED_OPERATIONALLY");
  assert.equal(runtime.components.get("worker").active, false);
});

test("blocked worker preserves queued semantic intent", () => {
  const { runtime } = setup();
  runtime.enqueue(request());
  runtime.blockWorker("worker");
  assert.equal(runtime.dispatch(request(), () => "SUCCEEDED").reason, "COMPONENT_BLOCKED");
  runtime.clearBlockage("worker");
  assert.equal(runtime.queue.length, 1);
  assert.equal(runtime.queue[0].effectId, "effect-1");
});

test("resource tuning is bounded by fresh authority and diagnosis", () => {
  const { runtime } = setup();
  assert.equal(runtime.dispatch(request({ action: Actions.TUNE, targetLimit: 2 }), () => "SUCCEEDED").status, "SUCCEEDED_OPERATIONALLY");
  assert.equal(runtime.components.get("worker").resourceLimit, 2);
  assert.equal(runtime.dispatch(request({ attemptId: "a2", effectId: "e2", action: Actions.TUNE, targetLimit: 99, diagnosis: "STRUCTURAL_CHANGE_REQUIRED" }), () => "SUCCEEDED").status, "REFUSED");
});

test("crash before dispatch is recoverable; crash after dispatch is quarantined", () => {
  const { runtime } = setup();
  assert.equal(runtime.dispatch(request({ crashAt: "before-dispatch" }), () => "SUCCEEDED").status, "CRASHED_BEFORE_DISPATCH");
  assert.equal(runtime.dispatch(request({ attemptId: "a2", effectId: "e2", crashAt: "after-dispatch" }), () => "SUCCEEDED").status, "INDETERMINATE");
  assert.equal(runtime.dispatch(request({ attemptId: "a3", effectId: "e2" }), () => "SUCCEEDED").reason, "INDETERMINATE_EFFECT_QUARANTINED");
});

test("duplicate and concurrent effect attempts cannot duplicate effect", async () => {
  const { runtime } = setup();
  const results = await Promise.all([Promise.resolve().then(() => runtime.dispatch(request(), () => "SUCCEEDED")), Promise.resolve().then(() => runtime.dispatch(request({ attemptId: "attempt-2" }), () => "SUCCEEDED"))]);
  assert.deepEqual(results.map(x => x.status).sort(), ["REFUSED", "SUCCEEDED_OPERATIONALLY"]);
});

test("withdrawn authority is rechecked at dispatch", () => {
  const { authority, runtime } = setup();
  runtime.enqueue(request());
  authority.withdraw("grant-1");
  assert.equal(runtime.dispatch(request(), () => "SUCCEEDED").reason, "WITHDRAWN_OR_ABSENT");
});

test("exact-instruction and bounded-discretion modes remain distinct", () => {
  const { runtime: exact } = setup(Modes.EXACT);
  assert.equal(exact.dispatch(request({ instructionId: "wrong" }), () => "SUCCEEDED").reason, "EXACT_INSTRUCTION_MISMATCH");
  const { runtime: bounded } = setup(Modes.BOUNDED);
  assert.equal(bounded.dispatch(request({ instructionId: undefined }), () => "SUCCEEDED").status, "SUCCEEDED_OPERATIONALLY");
});

test("incompatible migration and history-rewriting rollback are refused", () => {
  const { runtime } = setup();
  const migrateRequest = request({ action: Actions.MIGRATE });
  assert.match(runtime.migrate({ component: "worker", targetMapping: "map-2", preserves: ["semanticStates"], grantRequest: migrateRequest }).reason, /^LOSSY_MIGRATION/);
  runtime.dispatch(request({ attemptId: "a2", effectId: "unknown", crashAt: "after-dispatch" }), () => "SUCCEEDED");
  assert.equal(runtime.rollback(request({ attemptId: "a3", effectId: "rollback", action: Actions.ROLLBACK, claimsExternalReversal: true })).reason, "ROLLBACK_CANNOT_REWRITE_HISTORY_OR_EXTERNAL_EFFECTS");
});

test("every durable observation satisfies the candidate envelope", () => {
  const { runtime } = setup();
  runtime.dispatch(request(), () => "SUCCEEDED");
  assert.ok(runtime.observations.length >= 2);
  assert.ok(runtime.observations.every(validateObservation));
  assert.ok(runtime.observations.every(o => !("credential" in o.details)));
});

test("state machine conforms bidirectionally to PRB-001 mission closure and release", () => {
  const admitted = {
    contract: "layers/procedure/production/mission-closure-and-release-procedure.md@PRB-001",
    transitions: ["ASSEMBLE_CLOSURE_SITUATION", "CEO_CLOSURE_DECISION", "BEGIN_WIND_DOWN", "AWAIT_TERMINAL_FIELD_PACKET", "TERMINAL_ASSESSMENT", "MISSION_CLOSED", "CREATE_CLOSURE_RECORD"],
    prohibitedTransitions: ["CLAIM_IS_NOT_COMPLETION", "CLOSURE_IS_NOT_RELEASE", "MISSING_RETURN_IS_NOT_CLEAN_CESSATION"],
    independentBranches: ["RELEASE_BRANCH", "SESSION_END_BRANCH", "REPORTING_AND_DELIVERY_BRANCH"],
  };
  const machine = structuredClone(admitted);
  assert.deepEqual(checkConformance(admitted, machine), { conforms: true, errors: [] });
  machine.transitions.pop();
  assert.deepEqual(checkConformance(admitted, machine), { conforms: false, errors: ["missing:CREATE_CLOSURE_RECORD"] });
});

test("Master Mason diagnoses, restores, withholds, and escalates", () => {
  const { runtime, mason } = setup();
  runtime.blockWorker("worker");
  const diagnosis = mason.diagnose({ component: "worker", symptom: "BLOCKED" });
  assert.equal(mason.maintain(request({ action: Actions.RECOVER, diagnosis }), () => "SUCCEEDED").exit, "OPERATIONALLY_RESTORED");
  assert.equal(mason.maintain(request({ attemptId: "a2", effectId: "e2", diagnosis }), () => "INDETERMINATE").exit, "CONDITION_REMAINS_INDETERMINATE");
  assert.equal(mason.maintain(request({ attemptId: "a3", effectId: "e3", diagnosis: mason.diagnose({ component: "worker", structural: true }) })).exit, "STRUCTURAL_ESCALATION_REQUIRED");
});
