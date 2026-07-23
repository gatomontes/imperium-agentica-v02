import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const testDirectory = dirname(fileURLToPath(import.meta.url));
const referenceDirectory = fileURLToPath(new URL("../../../../layers/runtime/reference/", import.meta.url));

test("stable reference package is private and exposes only the approved surface", () => {
  const manifest = JSON.parse(readFileSync(join(referenceDirectory, "package.json"), "utf8"));
  assert.equal(manifest.name, "@imperium-agentica/runtime-reference");
  assert.equal(manifest.private, true);
  assert.deepEqual(manifest.exports, {
    ".": "./src/reference-runtime.mjs",
    "./contracts": "./src/contracts.mjs",
    "./adapters/in-memory": "./src/in-memory-ports.mjs",
    "./adapters/file": "./src/file-store.mjs",
    "./coordination/deterministic": "./src/distributed-coordinator.mjs",
    "./providers/node-process-supervisor": "./src/node-process-supervisor-adapter.mjs",
    "./security/synthetic-credentials": "./src/synthetic-credential-broker.mjs",
    "./providers/node-process-supervisor/synthetic-credentials": "./src/synthetic-credential-node-process-supervisor-adapter.mjs",
    "./security/synthetic-secret-store": "./src/synthetic-secret-store-port.mjs",
    "./security/openbao-kv-v2": "./src/openbao-kv-v2-secret-store-backend.mjs",
  });
});

test("every approved export resolves to the expected reference API", async () => {
  const runtime = await import(new URL("../../../../layers/runtime/reference/src/reference-runtime.mjs", import.meta.url));
  const contracts = await import(new URL("../../../../layers/runtime/reference/src/contracts.mjs", import.meta.url));
  const memory = await import(new URL("../../../../layers/runtime/reference/src/in-memory-ports.mjs", import.meta.url));
  const file = await import(new URL("../../../../layers/runtime/reference/src/file-store.mjs", import.meta.url));
  const coordination = await import(new URL("../../../../layers/runtime/reference/src/distributed-coordinator.mjs", import.meta.url));
  const provider = await import(new URL("../../../../layers/runtime/reference/src/node-process-supervisor-adapter.mjs", import.meta.url));
  const credentials = await import(new URL("../../../../layers/runtime/reference/src/synthetic-credential-broker.mjs", import.meta.url));
  const projection = await import(new URL("../../../../layers/runtime/reference/src/synthetic-credential-node-process-supervisor-adapter.mjs", import.meta.url));
  const secretStore = await import(new URL("../../../../layers/runtime/reference/src/synthetic-secret-store-port.mjs", import.meta.url));
  const openBao = await import(new URL("../../../../layers/runtime/reference/src/openbao-kv-v2-secret-store-backend.mjs", import.meta.url));
  assert.equal(typeof runtime.ReferenceRuntime, "function");
  assert.equal(typeof contracts.validatePlan, "function");
  assert.equal(typeof memory.InMemoryStore, "function");
  assert.equal(typeof file.FileBackedStore, "function");
  assert.equal(typeof coordination.FencedExecutionGate, "function");
  assert.equal(typeof provider.NodeProcessSupervisorAdapter, "function");
  assert.equal(typeof credentials.SyntheticCredentialBroker, "function");
  assert.equal(typeof projection.SyntheticCredentialNodeProcessSupervisorAdapter, "function");
  assert.equal(typeof secretStore.SyntheticSecretStorePort, "function");
  assert.equal(typeof openBao.OpenBaoKvV2SecretStoreBackend, "function");
});

test("the evidence package contains no duplicate implementation source tree", () => {
  const legacyDirectory = join(testDirectory, "..", "src");
  const legacyModules = existsSync(legacyDirectory)
    ? readdirSync(legacyDirectory).filter((name) => name.endsWith(".mjs"))
    : [];
  assert.deepEqual(legacyModules, []);
});

test("all executable consumers import the stable layer-owned path", () => {
  const sources = readdirSync(testDirectory)
    .filter((name) => name.endsWith(".test.mjs"))
    .map((name) => readFileSync(join(testDirectory, name), "utf8"));
  assert.equal(sources.some((source) => /from "\.\.\/src\//.test(source)), false);
  assert.equal(sources.some((source) => /import\("\.\.\/src\//.test(source)), false);
  assert.equal(sources.some((source) => source.includes("layers/runtime/reference")), true);
});

test("placement documentation refuses production and semantic ownership claims", () => {
  const readme = readFileSync(join(referenceDirectory, "README.md"), "utf8");
  assert.match(readme, /Stable nonproduction placement/);
  assert.match(readme, /not part of the admitted `RTB-002` production manifest/);
  assert.match(readme, /does not transfer their semantic ownership/);
  assert.match(readme, /external-effect authority/);
});
