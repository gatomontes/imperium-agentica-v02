import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const referenceRoot = new URL("../../../../layers/runtime/reference/", import.meta.url);

test("Locksmith is the sole active security persistence surface", () => {
  const manifest = JSON.parse(readFileSync(new URL("package.json", referenceRoot), "utf8"));
  const securityExports = Object.keys(manifest.exports)
    .filter((name) => name.includes("/security/") || name.includes("/synthetic-credentials"))
    .sort();
  assert.deepEqual(securityExports, ["./security/locksmith-access"]);
  assert.equal(
    manifest.exports["./security/locksmith-access"],
    "./src/locksmith-access-port.mjs",
  );
});

test("five direct credential and store exports are absent", () => {
  const manifest = JSON.parse(readFileSync(new URL("package.json", referenceRoot), "utf8"));
  for (const retired of [
    "./security/synthetic-credentials",
    "./providers/node-process-supervisor/synthetic-credentials",
    "./security/synthetic-secret-store",
    "./security/openbao-kv-v2",
    "./security/openbao-imperium-service-port",
  ]) {
    assert.equal(manifest.exports[retired], undefined);
  }
});

test("retired source remains available as historical evidence", () => {
  for (const source of [
    "src/synthetic-credential-broker.mjs",
    "src/synthetic-credential-node-process-supervisor-adapter.mjs",
    "src/synthetic-secret-store-port.mjs",
    "src/openbao-kv-v2-secret-store-backend.mjs",
    "src/openbao-imperium-service-port-backend.mjs",
  ]) {
    assert.equal(existsSync(new URL(source, referenceRoot)), true);
  }
});
