import { Buffer } from "node:buffer";
import { SyntheticCredentialClassification } from "./synthetic-credential-broker.mjs";

export const LocalEnvSyntheticSecretStorePin = Object.freeze({
  source: "INJECTED_LOCAL_ENV",
  encoding: "BASE64",
  classification: SyntheticCredentialClassification,
  productionEligible: false,
});

const BindingFields = Object.freeze(["materialVariable", "versionVariable"]);
const VariablePattern = /^IMPERIUM_SYNTHETIC_[A-Z0-9_]+$/;
const CanonicalBase64Pattern =
  /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

function requireText(value, code) {
  if (typeof value !== "string" || value.length === 0) throw new Error(code);
}

function sameFields(actual, expected) {
  return actual.length === expected.length &&
    actual.every((field, index) => field === expected[index]);
}

function requireVariableName(value, suffix) {
  requireText(value, "LOCAL_ENV_SECRET_VARIABLE_REQUIRED");
  if (!VariablePattern.test(value) || !value.endsWith(suffix)) {
    throw new Error("LOCAL_ENV_SECRET_VARIABLE_REFUSED");
  }
}

function validateBinding(binding) {
  if (!binding || typeof binding !== "object" || Array.isArray(binding)) {
    throw new Error("LOCAL_ENV_SECRET_BINDING_REQUIRED");
  }
  if (!sameFields(Object.keys(binding).sort(), [...BindingFields].sort())) {
    throw new Error("LOCAL_ENV_SECRET_BINDING_FIELDS_REFUSED");
  }
  requireVariableName(binding.materialVariable, "_B64");
  requireVariableName(binding.versionVariable, "_VERSION");
  if (binding.materialVariable === binding.versionVariable) {
    throw new Error("LOCAL_ENV_SECRET_BINDING_REFUSED");
  }
}

function decodeMaterial(value) {
  requireText(value, "LOCAL_ENV_SECRET_MATERIAL_REQUIRED");
  if (value.length % 4 !== 0 || !CanonicalBase64Pattern.test(value)) {
    throw new Error("LOCAL_ENV_SECRET_MATERIAL_REFUSED");
  }
  const decoded = Buffer.from(value, "base64");
  try {
    if (decoded.byteLength === 0 || decoded.toString("base64") !== value) {
      throw new Error("LOCAL_ENV_SECRET_MATERIAL_REFUSED");
    }
    return Uint8Array.from(decoded);
  } finally {
    decoded.fill(0);
  }
}

export class LocalEnvSyntheticSecretStoreBackend {
  acquisitionMode = "SYNC";
  #bindings;
  #readVariable;

  constructor({ bindings, readVariable } = {}) {
    if (!bindings || typeof bindings !== "object" || Array.isArray(bindings)) {
      throw new Error("LOCAL_ENV_SECRET_BINDING_CATALOG_REQUIRED");
    }
    if (typeof readVariable !== "function") {
      throw new Error("LOCAL_ENV_SECRET_READER_REQUIRED");
    }
    const catalog = new Map();
    for (const [secretReference, binding] of Object.entries(bindings)) {
      requireText(secretReference, "LOCAL_ENV_SECRET_REFERENCE_REQUIRED");
      validateBinding(binding);
      catalog.set(secretReference, Object.freeze({ ...binding }));
    }
    this.#bindings = catalog;
    this.#readVariable = readVariable;
  }

  acquire({ secretReference } = {}) {
    requireText(secretReference, "LOCAL_ENV_SECRET_REFERENCE_REQUIRED");
    const binding = this.#bindings.get(secretReference);
    if (!binding) throw new Error("LOCAL_ENV_SECRET_ACQUISITION_FAILED");

    try {
      const version = this.#readVariable(binding.versionVariable);
      if (typeof version !== "string" || !/^[1-9]\d*$/.test(version)) {
        throw new Error("LOCAL_ENV_SECRET_VERSION_REFUSED");
      }
      const material = decodeMaterial(this.#readVariable(binding.materialVariable));
      return {
        material,
        classification: SyntheticCredentialClassification,
        version,
      };
    } catch {
      throw new Error("LOCAL_ENV_SECRET_ACQUISITION_FAILED");
    }
  }

  revoke() {
    return false;
  }
}
