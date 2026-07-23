import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  LocalEnvSyntheticSecretStoreBackend,
  LocalEnvSyntheticSecretStorePin,
} from "../../../../layers/runtime/reference/src/local-env-synthetic-secret-store-backend.mjs";

const secretReference = "synthetic/provider/recovery";
const binding = Object.freeze({
  materialVariable: "IMPERIUM_SYNTHETIC_PROVIDER_RECOVERY_B64",
  versionVariable: "IMPERIUM_SYNTHETIC_PROVIDER_RECOVERY_VERSION",
});
const marker = "SYNTHETIC_LOCAL_ENV_MATERIAL";
const values = Object.freeze({
  [binding.materialVariable]: Buffer.from(marker).toString("base64"),
  [binding.versionVariable]: "7",
});

function backend(readVariable = (name) => values[name], bindings = {
  [secretReference]: binding,
}) {
  return new LocalEnvSyntheticSecretStoreBackend({ bindings, readVariable });
}

test("pins local environment custody as a nonproduction synthetic bridge", () => {
  assert.deepEqual(LocalEnvSyntheticSecretStorePin, {
    source: "INJECTED_LOCAL_ENV",
    encoding: "BASE64",
    classification: "SYNTHETIC_TEST_SECRET",
    productionEligible: false,
  });
  assert.equal(backend().acquisitionMode, "SYNC");
});

test("acquires one bound base64 value and explicit version", () => {
  const reads = [];
  const acquired = backend((name) => {
    reads.push(name);
    return values[name];
  }).acquire({ secretReference });
  assert.deepEqual(reads, [binding.versionVariable, binding.materialVariable]);
  assert.equal(new TextDecoder().decode(acquired.material), marker);
  assert.equal(acquired.classification, "SYNTHETIC_TEST_SECRET");
  assert.equal(acquired.version, "7");
  acquired.material.fill(0);
});

test("unknown references fail before environment contact", () => {
  let reads = 0;
  assert.throws(
    () => backend(() => {
      reads += 1;
    }).acquire({ secretReference: "unknown" }),
    /^Error: LOCAL_ENV_SECRET_ACQUISITION_FAILED$/,
  );
  assert.equal(reads, 0);
});

test("bindings refuse extra authority and non-Imperium variable names", () => {
  assert.throws(() => backend(undefined, {
    [secretReference]: { ...binding, path: "/tmp/secret" },
  }), /LOCAL_ENV_SECRET_BINDING_FIELDS_REFUSED/);
  for (const invalid of [
    { ...binding, materialVariable: "AWS_SECRET_ACCESS_KEY" },
    { ...binding, materialVariable: "IMPERIUM_SYNTHETIC_PROVIDER_RECOVERY" },
    { ...binding, versionVariable: "IMPERIUM_SYNTHETIC_PROVIDER_RECOVERY_B64" },
  ]) {
    assert.throws(
      () => backend(undefined, { [secretReference]: invalid }),
      /LOCAL_ENV_SECRET_(?:VARIABLE_REFUSED|BINDING_REFUSED)/,
    );
  }
});

test("missing, malformed, empty, or noncanonical material refuses generically", () => {
  for (const material of [undefined, "", "%%%", "QQ=", "QQ==\n"]) {
    const source = { ...values, [binding.materialVariable]: material };
    assert.throws(
      () => backend((name) => source[name]).acquire({ secretReference }),
      /^Error: LOCAL_ENV_SECRET_ACQUISITION_FAILED$/,
    );
  }
});

test("implicit, zero, negative, or malformed versions refuse generically", () => {
  for (const version of [undefined, "", "0", "-1", "1.0", "latest", "01"]) {
    const source = { ...values, [binding.versionVariable]: version };
    assert.throws(
      () => backend((name) => source[name]).acquire({ secretReference }),
      /^Error: LOCAL_ENV_SECRET_ACQUISITION_FAILED$/,
    );
  }
});

test("reader failures do not escape source detail", () => {
  assert.throws(
    () => backend(() => {
      throw new Error(marker);
    }).acquire({ secretReference }),
    (error) => error.message === "LOCAL_ENV_SECRET_ACQUISITION_FAILED" &&
      !error.message.includes(marker),
  );
});

test("backend does not claim mutation of the local environment", () => {
  assert.equal(backend().revoke(secretReference), false);
});

test("adapter source owns no file, process environment, dotenv, or network mechanism", () => {
  const source = readFileSync(
    new URL("../../../../layers/runtime/reference/src/local-env-synthetic-secret-store-backend.mjs", import.meta.url),
    "utf8",
  );
  assert.doesNotMatch(source, /process\.env/);
  assert.doesNotMatch(source, /node:fs|readFile|dotenv/);
  assert.doesNotMatch(source, /\bfetch\s*\(|node:(?:http|https|net|tls)/);
});
