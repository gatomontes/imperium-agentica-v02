import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  LocksmithAccessPort,
  LocksmithAccessResults,
  LocksmithOperationIds,
} from "../../../../layers/runtime/reference/src/locksmith-access-port.mjs";

const now = 1_000;
const validRequest = Object.freeze({
  operationId: LocksmithOperationIds.SYNTHETIC_PROVIDER_RECOVERY_V1,
  operationVersion: "1",
  authorityFindingReference: "authority-finding-001",
  correlationFindingReference: "correlation-finding-001",
  missionId: "mission-001",
  deploymentId: "deployment-001",
  operativeBindingId: "binding-001",
  ticketId: "ticket-001",
  providerId: "synthetic-provider",
  expiresAt: now + 1_000,
  parameters: Object.freeze({
    environment: "test",
    component: "worker",
    scope: "component",
    purpose: "recovery",
  }),
});

function fixture(perform = async () => ({ status: "RECOVERY_INITIATED" })) {
  const events = [];
  return {
    events,
    port: new LocksmithAccessPort({
      executor: { perform },
      auditSink: { append: (event) => events.push(event) },
      clock: () => now,
      idFactory: () => "001",
    }),
  };
}

test("private package exposes only the Runtime-facing Locksmith port", () => {
  const manifest = JSON.parse(readFileSync(new URL(
    "../../../../layers/runtime/reference/package.json",
    import.meta.url,
  ), "utf8"));
  assert.equal(
    manifest.exports["./security/locksmith-access"],
    "./src/locksmith-access-port.mjs",
  );
});

test("exact admitted request is fulfilled through the injected Locksmith executor", async () => {
  let received;
  const { port, events } = fixture(async (request) => {
    received = request;
    return { status: "RECOVERY_INITIATED" };
  });
  const result = await port.request(validRequest);
  assert.equal(result.status, LocksmithAccessResults.FULFILLED);
  assert.deepEqual(result.result, { status: "RECOVERY_INITIATED" });
  assert.equal(received.operationId, LocksmithOperationIds.SYNTHETIC_PROVIDER_RECOVERY_V1);
  assert.equal(Object.isFrozen(received), true);
  assert.equal(Object.isFrozen(received.parameters), true);
  assert.equal(events[0].result, "FULFILLED");
});

test("unknown operation identity and version refuse without invoking executor", async () => {
  let calls = 0;
  const { port } = fixture(async () => {
    calls += 1;
    return { status: "RECOVERY_INITIATED" };
  });
  assert.equal((await port.request({ ...validRequest, operationId: "caller-selected" })).status, "REFUSED");
  assert.equal((await port.request({ ...validRequest, operationVersion: "2" })).status, "REFUSED");
  assert.equal(calls, 0);
});

test("missing Authority or Provenance finding refuses before execution", async () => {
  let calls = 0;
  const { port } = fixture(async () => {
    calls += 1;
    return { status: "RECOVERY_INITIATED" };
  });
  assert.equal((await port.request({ ...validRequest, authorityFindingReference: "" })).status, "REFUSED");
  assert.equal((await port.request({ ...validRequest, correlationFindingReference: "" })).status, "REFUSED");
  assert.equal(calls, 0);
});

test("expired request refuses before execution", async () => {
  let calls = 0;
  const { port } = fixture(async () => {
    calls += 1;
    return { status: "RECOVERY_INITIATED" };
  });
  const result = await port.request({ ...validRequest, expiresAt: now });
  assert.equal(result.status, "REFUSED");
  assert.equal(calls, 0);
});

test("backend-native top-level and parameter inputs are structurally impossible", async () => {
  let calls = 0;
  const { port } = fixture(async () => {
    calls += 1;
    return { status: "RECOVERY_INITIATED" };
  });
  for (const request of [
    { ...validRequest, path: "secret/data/value" },
    { ...validRequest, token: "device-token" },
    { ...validRequest, parameters: { ...validRequest.parameters, mount: "secret" } },
    { ...validRequest, parameters: { ...validRequest.parameters, policy: "admin" } },
  ]) {
    assert.equal((await port.request(request)).status, "REFUSED");
  }
  assert.equal(calls, 0);
});

test("executor exception becomes one generic refusal without detail leakage", async () => {
  const marker = "DEVICE_TOKEN_MUST_NOT_LEAK";
  const { port, events } = fixture(async () => {
    throw new Error(marker);
  });
  const result = await port.request(validRequest);
  assert.deepEqual(result, {
    status: "REFUSED",
    code: "LOCKSMITH_OPERATION_REFUSED",
    correlationFindingReference: "correlation-finding-001",
  });
  assert.equal(JSON.stringify({ result, events }).includes(marker), false);
  assert.equal(events[0].stage, "OPERATION");
  assert.equal(events[0].secretRedactionStatus, "NO_SECRETS_RECORDED");
});

test("unexpected executor result is refused and preserved as result-validation evidence", async () => {
  const { port, events } = fixture(async () => ({ status: "DEVICE_SESSION", token: "hidden" }));
  const result = await port.request(validRequest);
  assert.equal(result.status, "REFUSED");
  assert.equal(events[0].stage, "RESULT_VALIDATION");
  assert.equal(JSON.stringify({ result, events }).includes("hidden"), false);
});

test("audit sink failure cannot expand the external response", async () => {
  const port = new LocksmithAccessPort({
    executor: { perform: async () => ({ status: "RECOVERY_INITIATED" }) },
    auditSink: { append() { throw new Error("audit detail"); } },
    clock: () => now,
  });
  assert.equal((await port.request(validRequest)).status, "FULFILLED");
});

test("port source contains no persistence, transport, environment, or provider mechanism", () => {
  const source = readFileSync(new URL(
    "../../../../layers/runtime/reference/src/locksmith-access-port.mjs",
    import.meta.url,
  ), "utf8");
  assert.doesNotMatch(
    source,
    /process\.env|node:fs|node:http|node:https|fetch\(|child_process|openbao|postgres|sqlite|keychain/i,
  );
});
