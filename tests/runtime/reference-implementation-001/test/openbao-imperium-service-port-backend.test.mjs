import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  OpenBaoImperiumServicePortBackend,
  OpenBaoImperiumServicePortPin,
} from "../../../../layers/runtime/reference/src/openbao-imperium-service-port-backend.mjs";

const secretReference = "synthetic/provider/recovery";
const secretMarker = "SYNTHETIC_SERVICE_PORT_MATERIAL";
const operationId = "synthetic-provider-recovery-v1";
const version = 7;

function response({
  material = secretMarker,
  responseOperationId = operationId,
  correlationId = "imperium-service-port-request-001",
  responseVersion = version,
  additions = {},
  envelope = {},
} = {}) {
  return new TextEncoder().encode(JSON.stringify({
    auth: null,
    wrap_info: null,
    ...envelope,
    data: {
      operation_id: responseOperationId,
      correlation_id: correlationId,
      version: responseVersion,
      material,
      ...additions,
    },
  }));
}

function backend(handler, bindings = {
  [secretReference]: { operationId, version },
}) {
  return new OpenBaoImperiumServicePortBackend({
    bindings,
    idFactory: () => "request-001",
    transport: { executeFixedOperation: handler },
  });
}

test("pins the OpenBao workflow contract without selecting a plugin or core fork", () => {
  assert.deepEqual(OpenBaoImperiumServicePortPin, {
    openBaoVersion: "2.6.1",
    openBaoReleaseTag: "v2.6.1",
    workflowApi: "sys/workflows/unauthed-execute",
    responseSchema: "imperium-service-port-response-v1",
  });
});

test("executes only a catalogued operation and exposes no path or OpenBao token", async () => {
  let request;
  const rawBody = response();
  const store = backend(async (value) => {
    request = value;
    return { status: 200, body: rawBody };
  });
  const acquired = await store.acquire({ secretReference });
  assert.deepEqual(request, {
    operationId,
    correlationId: "imperium-service-port-request-001",
  });
  assert.equal(Object.isFrozen(request), true);
  assert.equal("path" in request, false);
  assert.equal("token" in request, false);
  assert.equal(new TextDecoder().decode(acquired.material), secretMarker);
  assert.equal(acquired.classification, "SYNTHETIC_TEST_SECRET");
  assert.equal(acquired.version, "7");
  assert.equal(rawBody.every((byte) => byte === 0), true);
});

test("unknown references fail before service-port transport contact", async () => {
  let calls = 0;
  const store = backend(async () => {
    calls += 1;
    return { status: 200, body: response() };
  });
  await assert.rejects(
    store.acquire({ secretReference: "unknown" }),
    /^Error: OPENBAO_SERVICE_ACQUISITION_FAILED$/,
  );
  assert.equal(calls, 0);
});

test("invalid correlation generation fails before service-port transport contact", async () => {
  for (const invalid of ["", " ", "../request", "request_001", "x".repeat(129)]) {
    let calls = 0;
    const store = new OpenBaoImperiumServicePortBackend({
      bindings: { [secretReference]: { operationId, version } },
      idFactory: () => invalid,
      transport: {
        executeFixedOperation() {
          calls += 1;
        },
      },
    });
    await assert.rejects(
      store.acquire({ secretReference }),
      /^Error: OPENBAO_SERVICE_ACQUISITION_FAILED$/,
    );
    assert.equal(calls, 0);
  }
});

test("binding catalog refuses generic paths, fields, policies, and implicit versions", () => {
  for (const extra of [
    { path: "secret/data/other" },
    { field: "other" },
    { policy: "root" },
    { version: undefined },
  ]) {
    assert.throws(() => backend(async () => ({ status: 200, body: response() }), {
      [secretReference]: { operationId, version, ...extra },
    }), /OPENBAO_SERVICE_(?:BINDING_FIELDS_REFUSED|EXACT_VERSION_REQUIRED)/);
  }
});

test("operation, correlation, and exact-version mismatches share one refusal", async () => {
  const bodies = [
    response({ responseOperationId: "other-operation-v1" }),
    response({ correlationId: "other-correlation" }),
    response({ responseVersion: 8 }),
    response({ material: "" }),
  ];
  for (const body of bodies) {
    await assert.rejects(
      backend(async () => ({ status: 200, body })).acquire({ secretReference }),
      /^Error: OPENBAO_SERVICE_ACQUISITION_FAILED$/,
    );
    assert.equal(body.every((byte) => byte === 0), true);
  }
});

test("token-bearing or enlarged workflow output is refused and cleared", async () => {
  const bodies = [
    response({ additions: { client_token: "SYNTHETIC_FORBIDDEN_TOKEN" } }),
    response({ additions: { unexpected: "detail" } }),
    response({ envelope: { auth: { client_token: "SYNTHETIC_FORBIDDEN_TOKEN" } } }),
    response({ envelope: { wrap_info: { token: "SYNTHETIC_FORBIDDEN_TOKEN" } } }),
  ];
  for (const body of bodies) {
    await assert.rejects(
      backend(async () => ({ status: 200, body })).acquire({ secretReference }),
      /^Error: OPENBAO_SERVICE_ACQUISITION_FAILED$/,
    );
    assert.equal(body.every((byte) => byte === 0), true);
  }
});

test("transport and malformed response detail never escape the generic boundary", async () => {
  await assert.rejects(
    backend(async () => {
      throw new Error(secretMarker);
    }).acquire({ secretReference }),
    (error) => error.message === "OPENBAO_SERVICE_ACQUISITION_FAILED" &&
      !error.message.includes(secretMarker),
  );
  const malformed = new TextEncoder().encode("{");
  await assert.rejects(
    backend(async () => ({ status: 200, body: malformed })).acquire({ secretReference }),
    /^Error: OPENBAO_SERVICE_ACQUISITION_FAILED$/,
  );
  assert.equal(malformed.every((byte) => byte === 0), true);
});

test("local revocation reports no server-side mutation claim", () => {
  assert.equal(backend(async () => ({ status: 200, body: response() })).revoke(), false);
});

test("client source has no network, environment, filesystem, credential header, or generic request path", () => {
  const source = readFileSync(
    new URL("../../../../layers/runtime/reference/src/openbao-imperium-service-port-backend.mjs", import.meta.url),
    "utf8",
  );
  assert.doesNotMatch(source, /\bfetch\s*\(/);
  assert.doesNotMatch(source, /process\.env/);
  assert.doesNotMatch(source, /node:(?:http|https|net|tls|fs)/);
  assert.doesNotMatch(source, /X-Vault-Token|Authorization/i);
  assert.doesNotMatch(source, /request\s*\(\s*\{\s*(?:method|path)/);
});

test("workflow and AppRole artifacts fix the entire internal operation", () => {
  const root = new URL(
    "../../../../layers/runtime/reference/openbao/imperium-service-port/synthetic-provider-recovery-v1/",
    import.meta.url,
  );
  const workflow = readFileSync(new URL("workflow.hcl", root), "utf8");
  const policy = readFileSync(new URL("policy.hcl", root), "utf8");
  const contract = JSON.parse(readFileSync(new URL("contract.json", root), "utf8"));

  const order = ["lookup", "unwrap", "login", "read", "revoke"]
    .map((name) => workflow.indexOf(`request "${name}"`));
  assert.equal(order.every((index) => index >= 0), true);
  assert.deepEqual(order, [...order].sort((left, right) => left - right));
  assert.ok(workflow.indexOf("output {") > order.at(-1));

  assert.match(workflow, /path\s*=\s*"sys\/wrapping\/lookup"/);
  assert.match(workflow, /path\s*=\s*"sys\/wrapping\/unwrap"/);
  assert.match(workflow, /creation_path == 'auth\/approle\/role\/imperium-service-port-synthetic\/secret-id'/);
  assert.match(workflow, /path\s*=\s*"auth\/approle\/login"/);
  assert.match(workflow, /path\s*=\s*"imperium-synthetic\/data\/runtime\/provider\/recovery"/);
  assert.match(workflow, /request "read"[\s\S]*data\s*=\s*\{\s*version\s*=\s*7\s*\}/);
  assert.doesNotMatch(workflow, /\?version=/);
  assert.match(workflow, /path\s*=\s*"auth\/token\/revoke-self"/);
  assert.doesNotMatch(workflow, /eval_source\s*=\s*"template"/);
  assert.doesNotMatch(workflow, /field_name\s*=\s*"(?:mount|path|field|version|role_id)"/);

  assert.deepEqual(contract.approle, {
    roleName: "imperium-service-port-synthetic",
    roleId: "IMPERIUM_SYNTHETIC_ROLE_ID",
    bindSecretId: true,
    secretIdNumUses: 1,
    secretIdTtlSeconds: 60,
    tokenPolicies: ["imperium-service-port-synthetic-read"],
    tokenNoDefaultPolicy: true,
    tokenNumUses: 2,
    tokenTtlSeconds: 30,
    tokenMaxTtlSeconds: 30,
    tokenExplicitMaxTtlSeconds: 30,
    tokenPeriodSeconds: 0,
    tokenType: "service",
  });
  assert.equal(contract.workflow.allowUnauthenticated, true);
  assert.equal(contract.workflow.casRequired, true);
  assert.equal(contract.wrapping.singleUse, true);
  assert.equal(contract.binding.version, 7);

  assert.match(policy, /path "imperium-synthetic\/data\/runtime\/provider\/recovery"/);
  assert.match(policy, /path "auth\/token\/revoke-self"/);
  assert.doesNotMatch(policy, /\*/);
  assert.doesNotMatch(policy, /sudo|create|delete|list|patch/);
});
