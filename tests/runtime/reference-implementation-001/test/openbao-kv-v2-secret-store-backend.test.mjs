import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  OpenBaoContractPin,
  OpenBaoHealthStates,
  OpenBaoKvV2SecretStoreBackend,
  classifyOpenBaoHealth,
} from "../../../../layers/runtime/reference/src/openbao-kv-v2-secret-store-backend.mjs";

const secretReference = "synthetic/provider/recovery";
const secretMarker = "SYNTHETIC_OPENBAO_TOKEN";
const reference = Object.freeze({
  mount: "imperium",
  path: "runtime/provider/recovery",
  field: "credential",
  version: 7,
});

function body(value = secretMarker, version = 7) {
  return new TextEncoder().encode(JSON.stringify({
    data: {
      data: { credential: value },
      metadata: { version },
    },
  }));
}

function backend(handler, references = { [secretReference]: reference }) {
  return new OpenBaoKvV2SecretStoreBackend({
    references,
    transport: { request: handler },
  });
}

test("pins the reviewed OpenBao patch and release evidence", () => {
  assert.deepEqual(OpenBaoContractPin, {
    version: "2.6.1",
    releaseTag: "v2.6.1",
    releaseCommit: "ba7ad88",
    checksumManifestSha256: "e6985523c63e527dc4f25f0121d53fc08c7e79bed955bb28d747d6724bc3535b",
  });
});

test("requests one exact KV v2 version through an injected authenticated transport", async () => {
  let request;
  const rawBody = body();
  const store = backend(async (value) => {
    request = value;
    return { status: 200, body: rawBody };
  });
  const acquired = await store.acquire({ secretReference });
  assert.deepEqual(request, {
    method: "GET",
    path: "/v1/imperium/data/runtime/provider/recovery?version=7",
    accept: "application/json",
  });
  assert.equal(new TextDecoder().decode(acquired.material), secretMarker);
  assert.equal(acquired.classification, "SYNTHETIC_TEST_SECRET");
  assert.equal(acquired.version, "7");
  assert.equal(rawBody.every((byte) => byte === 0), true);
  assert.equal(JSON.stringify(request).includes(secretMarker), false);
});

test("encodes every configured path segment without admitting an implicit latest version", async () => {
  let request;
  const store = backend(async (value) => {
    request = value;
    return { status: 200, body: body() };
  }, {
    [secretReference]: {
      ...reference,
      mount: "imperium store",
      path: "runtime provider/recovery token",
    },
  });
  await store.acquire({ secretReference });
  assert.equal(request.path, "/v1/imperium%20store/data/runtime%20provider/recovery%20token?version=7");
  assert.throws(() => backend(async () => ({ status: 200, body: body() }), {
    [secretReference]: { ...reference, version: undefined },
  }), /OPENBAO_EXACT_VERSION_REQUIRED/);
});

test("unknown references fail before transport contact", async () => {
  let calls = 0;
  const store = backend(async () => {
    calls += 1;
    return { status: 200, body: body() };
  });
  await assert.rejects(store.acquire({ secretReference: "unknown" }), /OPENBAO_SECRET_ACQUISITION_FAILED/);
  assert.equal(calls, 0);
});

test("sealed, absent, malformed, and version-mismatched responses share one failure", async () => {
  const cases = [
    async () => ({ status: 503, body: body() }),
    async () => ({ status: 404, body: body() }),
    async () => ({ status: 200, body: new TextEncoder().encode("{") }),
    async () => ({ status: 200, body: body(secretMarker, 8) }),
    async () => ({ status: 200, body: body("", 7) }),
  ];
  for (const handler of cases) {
    await assert.rejects(backend(handler).acquire({ secretReference }), /^Error: OPENBAO_SECRET_ACQUISITION_FAILED$/);
  }
});

test("transport exceptions do not escape secret-bearing detail", async () => {
  const store = backend(async () => {
    throw new Error(secretMarker);
  });
  await assert.rejects(store.acquire({ secretReference }), (error) => {
    assert.equal(error.message, "OPENBAO_SECRET_ACQUISITION_FAILED");
    assert.equal(error.message.includes(secretMarker), false);
    return true;
  });
});

test("health status classification is explicit and fails closed", () => {
  assert.equal(classifyOpenBaoHealth(200), OpenBaoHealthStates.READY);
  assert.equal(classifyOpenBaoHealth(501), OpenBaoHealthStates.UNINITIALIZED);
  assert.equal(classifyOpenBaoHealth(503), OpenBaoHealthStates.SEALED);
  assert.equal(classifyOpenBaoHealth(429), OpenBaoHealthStates.STANDBY);
  assert.equal(classifyOpenBaoHealth(500), OpenBaoHealthStates.UNAVAILABLE);
  assert.equal(classifyOpenBaoHealth(undefined), OpenBaoHealthStates.UNAVAILABLE);
});

test("health uses the injected transport and clears any response body", async () => {
  let request;
  const rawBody = new TextEncoder().encode("{\"sealed\":false}");
  const store = backend(async (value) => {
    request = value;
    return { status: 200, body: rawBody };
  });
  assert.equal(await store.health(), OpenBaoHealthStates.READY);
  assert.deepEqual(request, {
    method: "GET",
    path: "/v1/sys/health",
    accept: "application/json",
  });
  assert.equal(rawBody.every((byte) => byte === 0), true);
});

test("health transport failure is unavailable rather than ready", async () => {
  const store = backend(async () => {
    throw new Error("network detail");
  });
  assert.equal(await store.health(), OpenBaoHealthStates.UNAVAILABLE);
});

test("adapter source has no network, environment, filesystem, SDK, or credential-header mechanism", () => {
  const source = readFileSync(
    new URL("../../../../layers/runtime/reference/src/openbao-kv-v2-secret-store-backend.mjs", import.meta.url),
    "utf8",
  );
  assert.doesNotMatch(source, /\bfetch\s*\(/);
  assert.doesNotMatch(source, /process\.env/);
  assert.doesNotMatch(source, /node:(?:http|https|net|tls|fs)/);
  assert.doesNotMatch(source, /X-Vault-Token|Authorization/i);
  assert.doesNotMatch(source, /from ["'](?:node-vault|openbao|vault)/);
});
