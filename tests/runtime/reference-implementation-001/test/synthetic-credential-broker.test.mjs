import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  SyntheticCredentialBroker,
  SyntheticCredentialClassification,
  SyntheticCredentialResults,
} from "../../../../layers/runtime/reference/src/synthetic-credential-broker.mjs";

const binding = Object.freeze({
  environment: "synthetic-test-environment",
  component: "synthetic-component",
  scope: "synthetic-scope",
  purpose: "synthetic-recovery-test",
});

function brokerFixture() {
  const events = [];
  const ids = ["handle-001", "audit-001", "handle-002", "audit-002"];
  return {
    events,
    broker: new SyntheticCredentialBroker({
      auditSink: { append: (event) => events.push(event) },
      idFactory: () => ids.shift(),
    }),
  };
}

function register(broker, material = Uint8Array.from([115, 121, 110, 116, 104])) {
  const handle = broker.register({
    material,
    classification: SyntheticCredentialClassification,
    ...binding,
  });
  return { handle, material };
}

test("private package exposes the synthetic credential boundary", () => {
  const manifest = JSON.parse(readFileSync(new URL("../../../../layers/runtime/reference/package.json", import.meta.url), "utf8"));
  assert.equal(manifest.exports["./security/synthetic-credentials"], "./src/synthetic-credential-broker.mjs");
});

test("registration accepts only byte material with the exact synthetic classification", () => {
  const { broker } = brokerFixture();
  assert.throws(() => broker.register({ material: "not-bytes", classification: SyntheticCredentialClassification, ...binding }), /SYNTHETIC_CREDENTIAL_BYTES_REQUIRED/);
  assert.throws(() => broker.register({ material: new Uint8Array(), classification: SyntheticCredentialClassification, ...binding }), /SYNTHETIC_CREDENTIAL_BYTES_REQUIRED/);
  assert.throws(() => broker.register({ material: Uint8Array.from([1]), classification: "REAL_SECRET", ...binding }), /SYNTHETIC_CREDENTIAL_CLASSIFICATION_REQUIRED/);
});

test("registration transfers custody by zeroing the caller buffer", () => {
  const { broker } = brokerFixture();
  const { material } = register(broker);
  assert.deepEqual([...material], [0, 0, 0, 0, 0]);
});

test("handle is opaque and audit uses a separate non-capability identity", () => {
  const { broker, events } = brokerFixture();
  const { handle } = register(broker);
  assert.equal(handle, "synthetic-handle-handle-001");
  assert.equal(events[0].credentialIdentity, "synthetic-audit-audit-001");
  assert.equal(JSON.stringify(events).includes(handle), false);
  assert.equal(handle.includes("synth"), true);
});

test("binding mismatch refuses without invoking or consuming", () => {
  const { broker } = brokerFixture();
  const { handle } = register(broker);
  let calls = 0;
  const refused = broker.consume({ handle, ...binding, scope: "wider-scope" }, () => ++calls);
  assert.equal(refused, SyntheticCredentialResults.REFUSED);
  const consumed = broker.consume({ handle, ...binding }, () => {
    calls += 1;
    return SyntheticCredentialResults.CONSUMED;
  });
  assert.equal(consumed, SyntheticCredentialResults.CONSUMED);
  assert.equal(calls, 1);
});

test("exactly bound synchronous consumer receives the registered bytes", () => {
  const { broker } = brokerFixture();
  const { handle } = register(broker);
  let observed;
  const result = broker.consume({ handle, ...binding }, (view) => {
    observed = [...view];
    return SyntheticCredentialResults.CONSUMED;
  });
  assert.equal(result, SyntheticCredentialResults.CONSUMED);
  assert.deepEqual(observed, [115, 121, 110, 116, 104]);
});

test("consumer view is zeroed immediately after callback return", () => {
  const { broker } = brokerFixture();
  const { handle } = register(broker);
  let captured;
  broker.consume({ handle, ...binding }, (view) => {
    captured = view;
    return SyntheticCredentialResults.CONSUMED;
  });
  assert.deepEqual([...captured], [0, 0, 0, 0, 0]);
});

test("async consumers are refused and their view is zeroed", () => {
  const { broker } = brokerFixture();
  const { handle } = register(broker);
  let captured;
  assert.throws(() => broker.consume({ handle, ...binding }, (view) => {
    captured = view;
    return Promise.resolve(SyntheticCredentialResults.CONSUMED);
  }), /ASYNC_CONSUMER_REFUSED/);
  assert.deepEqual([...captured], [0, 0, 0, 0, 0]);
});

test("credential is one-use and replay is unknown", () => {
  const { broker } = brokerFixture();
  const { handle } = register(broker);
  broker.consume({ handle, ...binding }, () => SyntheticCredentialResults.CONSUMED);
  assert.equal(broker.consume({ handle, ...binding }, () => SyntheticCredentialResults.CONSUMED), SyntheticCredentialResults.UNKNOWN);
});

test("revoke and close remove remaining broker custody", () => {
  const first = brokerFixture();
  const firstHandle = register(first.broker).handle;
  assert.equal(first.broker.revoke(firstHandle), SyntheticCredentialResults.REFUSED);
  assert.equal(first.broker.consume({ handle: firstHandle, ...binding }, () => SyntheticCredentialResults.CONSUMED), SyntheticCredentialResults.UNKNOWN);

  const secondHandle = register(first.broker, Uint8Array.from([1, 2, 3])).handle;
  first.broker.close();
  assert.equal(first.broker.consume({ handle: secondHandle, ...binding }, () => SyntheticCredentialResults.CONSUMED), SyntheticCredentialResults.UNKNOWN);
});

test("audit records and surfaced errors exclude material and capability handles", () => {
  const { broker, events } = brokerFixture();
  const secretMarker = "NEVER_LOG_THIS";
  const { handle } = register(broker, new TextEncoder().encode(secretMarker));
  let error;
  try {
    broker.consume({ handle, ...binding }, () => {
      throw new Error(secretMarker);
    });
  } catch (caught) {
    error = caught;
  }
  const surfaced = `${error?.message}\n${JSON.stringify(events)}`;
  assert.equal(surfaced.includes(secretMarker), false);
  assert.equal(surfaced.includes(handle), false);
  assert.match(error.message, /CREDENTIAL_CONSUMER_FAILED/);
});

test("source contains no real secret acquisition, persistence, transport, or provider mechanism", () => {
  const source = readFileSync(new URL("../../../../layers/runtime/reference/src/synthetic-credential-broker.mjs", import.meta.url), "utf8");
  assert.doesNotMatch(source, /process\.env|node:fs|node:http|node:https|fetch\(|child_process|keychain|credential provider/i);
});
