const SYNTHETIC_TEST_SECRET = "SYNTHETIC_TEST_SECRET";

export const OpenBaoContractPin = Object.freeze({
  version: "2.6.1",
  releaseTag: "v2.6.1",
  releaseCommit: "ba7ad88",
  checksumManifestSha256: "e6985523c63e527dc4f25f0121d53fc08c7e79bed955bb28d747d6724bc3535b",
});

export const OpenBaoHealthStates = Object.freeze({
  READY: "READY",
  UNINITIALIZED: "UNINITIALIZED",
  SEALED: "SEALED",
  STANDBY: "STANDBY",
  UNAVAILABLE: "UNAVAILABLE",
});

function requireText(value, code) {
  if (typeof value !== "string" || value.length === 0) throw new Error(code);
}

function encodePath(path) {
  return path.split("/").map((segment) => {
    requireText(segment, "OPENBAO_REFERENCE_PATH_REQUIRED");
    return encodeURIComponent(segment);
  }).join("/");
}

function validateReference(reference) {
  requireText(reference?.mount, "OPENBAO_REFERENCE_MOUNT_REQUIRED");
  requireText(reference?.path, "OPENBAO_REFERENCE_PATH_REQUIRED");
  requireText(reference?.field, "OPENBAO_REFERENCE_FIELD_REQUIRED");
  if (!Number.isSafeInteger(reference?.version) || reference.version <= 0) {
    throw new Error("OPENBAO_EXACT_VERSION_REQUIRED");
  }
}

function parseKvV2Body(body, reference) {
  if (!(body instanceof Uint8Array) || body.byteLength === 0) {
    throw new Error("OPENBAO_RESPONSE_REFUSED");
  }
  const text = new TextDecoder("utf-8", { fatal: true }).decode(body);
  const parsed = JSON.parse(text);
  const version = parsed?.data?.metadata?.version;
  const value = parsed?.data?.data?.[reference.field];
  if (version !== reference.version || typeof value !== "string" || value.length === 0) {
    throw new Error("OPENBAO_RESPONSE_REFUSED");
  }
  return {
    material: new TextEncoder().encode(value),
    classification: SYNTHETIC_TEST_SECRET,
    version: String(version),
  };
}

export function classifyOpenBaoHealth(status) {
  if (status === 200) return OpenBaoHealthStates.READY;
  if (status === 501) return OpenBaoHealthStates.UNINITIALIZED;
  if (status === 503) return OpenBaoHealthStates.SEALED;
  if (status === 429) return OpenBaoHealthStates.STANDBY;
  return OpenBaoHealthStates.UNAVAILABLE;
}

export class OpenBaoKvV2SecretStoreBackend {
  acquisitionMode = "ASYNC";
  #references;
  #transport;

  constructor({ transport, references } = {}) {
    if (!transport || typeof transport.request !== "function") {
      throw new Error("OPENBAO_AUTHENTICATED_TRANSPORT_REQUIRED");
    }
    if (!references || typeof references !== "object" || Array.isArray(references)) {
      throw new Error("OPENBAO_REFERENCE_CATALOG_REQUIRED");
    }
    const catalog = new Map();
    for (const [secretReference, reference] of Object.entries(references)) {
      requireText(secretReference, "OPENBAO_SECRET_REFERENCE_REQUIRED");
      validateReference(reference);
      catalog.set(secretReference, Object.freeze({ ...reference }));
    }
    this.#transport = transport;
    this.#references = catalog;
  }

  async acquire({ secretReference } = {}) {
    requireText(secretReference, "OPENBAO_SECRET_REFERENCE_REQUIRED");
    const reference = this.#references.get(secretReference);
    if (!reference) throw new Error("OPENBAO_SECRET_ACQUISITION_FAILED");

    let response;
    try {
      const path = `/v1/${encodeURIComponent(reference.mount)}/data/${encodePath(reference.path)}?version=${reference.version}`;
      response = await this.#transport.request(Object.freeze({
        method: "GET",
        path,
        accept: "application/json",
      }));
      if (response?.status !== 200) throw new Error("OPENBAO_RESPONSE_REFUSED");
      return parseKvV2Body(response.body, reference);
    } catch {
      throw new Error("OPENBAO_SECRET_ACQUISITION_FAILED");
    } finally {
      response?.body?.fill?.(0);
    }
  }

  async health() {
    try {
      const response = await this.#transport.request(Object.freeze({
        method: "GET",
        path: "/v1/sys/health",
        accept: "application/json",
      }));
      response?.body?.fill?.(0);
      return classifyOpenBaoHealth(response?.status);
    } catch {
      return OpenBaoHealthStates.UNAVAILABLE;
    }
  }
}
