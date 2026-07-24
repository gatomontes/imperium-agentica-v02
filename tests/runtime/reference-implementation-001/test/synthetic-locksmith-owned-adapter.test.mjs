import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  LocksmithOperationIds,
} from "../../../../layers/runtime/reference/src/locksmith-access-port.mjs";
import {
  SyntheticLocksmithOwnedAdapter,
  createSyntheticLocksmithAccessPort,
} from "../../../../layers/runtime/reference/src/synthetic-locksmith-owned-adapter.mjs";

const now = 1_000;
const record = Object.freeze({
  recordId: "record-001",
  operationId: LocksmithOperationIds.SYNTHETIC_PROVIDER_RECOVERY_V1,
  operationVersion: "1",
  missionId: "mission-001",
  deploymentId: "deployment-001",
  operativeBindingId: "binding-001",
  providerId: "synthetic-provider",
  environment: "test",
  component: "worker",
  scope: "component",
  purpose: "recovery",
  active: true,
});

const request = Object.freeze({
  operationId: record.operationId,
  operationVersion: record.operationVersion,
  authorityFindingReference: "authority-finding-001",
  correlationFindingReference: "correlation-finding-001",
  missionId: record.missionId,
  deploymentId: record.deploymentId,
  operativeBindingId: record.operativeBindingId,
  ticketId: "ticket-001",
  providerId: record.providerId,
  expiresAt: now + 1_000,
  parameters: Object.freeze({
    environment: record.environment,
    component: record.component,
    scope: record.scope,
    purpose: record.purpose,
  }),
});

function fixture({ records = [record], availability = () => true } = {}) {
  const events = [];
  return {
    events,
    port: createSyntheticLocksmithAccessPort({
      records,
      availability,
      auditSink: { append: (event) => events.push(event) },
      clock: () => now,
      idFactory: () => "001",
    }),
  };
}

test("synthetic adapter is internal and has no package export", () => {
  const manifest = JSON.parse(readFileSync(new URL(
    "../../../../layers/runtime/reference/package.json",
    import.meta.url,
  ), "utf8"));
  assert.equal(manifest.exports["./security/synthetic-locksmith-adapter"], undefined);
  assert.equal(manifest.exports["./security/locksmith-access"], "./src/locksmith-access-port.mjs");
});

test("exact active record fulfills only through the Locksmith port", async () => {
  const { port, events } = fixture();
  const result = await port.request(request);
  assert.equal(result.status, "FULFILLED");
  assert.deepEqual(result.result, { status: "RECOVERY_INITIATED" });
  assert.equal(events[0].stage, "OPERATION");
  assert.equal(events[0].result, "FULFILLED");
});

test("inactive record refuses generically and preserves redacted evidence", async () => {
  const { port, events } = fixture({ records: [{ ...record, active: false }] });
  const result = await port.request(request);
  assert.equal(result.status, "REFUSED");
  assert.equal(result.code, "LOCKSMITH_OPERATION_REFUSED");
  assert.equal(events[0].result, "REFUSED");
  assert.equal(events[0].secretRedactionStatus, "NO_SECRETS_RECORDED");
});

test("cross-mission, deployment, binding, provider, and operation parameter mismatches refuse", async () => {
  for (const candidate of [
    { ...request, missionId: "mission-002" },
    { ...request, deploymentId: "deployment-002" },
    { ...request, operativeBindingId: "binding-002" },
    { ...request, providerId: "provider-002" },
    { ...request, parameters: { ...request.parameters, scope: "wider" } },
  ]) {
    const { port } = fixture();
    assert.equal((await port.request(candidate)).status, "REFUSED");
  }
});

test("unavailable adapter refuses without leaking its internal failure", async () => {
  const { port, events } = fixture({ availability: () => false });
  const result = await port.request(request);
  assert.deepEqual(result, {
    status: "REFUSED",
    code: "LOCKSMITH_OPERATION_REFUSED",
    correlationFindingReference: "correlation-finding-001",
  });
  assert.equal(JSON.stringify({ result, events }).includes("UNAVAILABLE"), false);
});

test("a ticket is one-use and replay refuses", async () => {
  const { port } = fixture();
  assert.equal((await port.request(request)).status, "FULFILLED");
  assert.equal((await port.request(request)).status, "REFUSED");
});

test("malformed, duplicate, and non-admitted records fail construction", () => {
  assert.throws(() => new SyntheticLocksmithOwnedAdapter({ records: [] }), /CONFIGURATION_REQUIRED/);
  assert.throws(
    () => new SyntheticLocksmithOwnedAdapter({ records: [{ ...record, path: "/secret" }] }),
    /RECORD_INVALID/,
  );
  assert.throws(
    () => new SyntheticLocksmithOwnedAdapter({ records: [record, { ...record, recordId: "record-002" }] }),
    /RECORD_DUPLICATE/,
  );
  assert.throws(
    () => new SyntheticLocksmithOwnedAdapter({ records: [{ ...record, operationId: "admin" }] }),
    /RECORD_INVALID/,
  );
});

test("adapter records contain no credential material, backend address, or administration field", () => {
  assert.deepEqual(Object.keys(record).sort(), [
    "active",
    "component",
    "deploymentId",
    "environment",
    "missionId",
    "operationId",
    "operationVersion",
    "operativeBindingId",
    "providerId",
    "purpose",
    "recordId",
    "scope",
  ]);
});

test("source contains no device, transport, environment, filesystem, or credential mechanism", () => {
  const source = readFileSync(new URL(
    "../../../../layers/runtime/reference/src/synthetic-locksmith-owned-adapter.mjs",
    import.meta.url,
  ), "utf8");
  assert.doesNotMatch(
    source,
    /process\.env|node:fs|node:http|node:https|fetch\(|child_process|openbao|postgres|sqlite|credential|secret|token|mount|policy/i,
  );
});
