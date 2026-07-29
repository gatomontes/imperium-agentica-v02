import { describe, expect, it } from "vitest";
import { ArtifactEnvelope } from "../src/artifact.js";
import { AsyncArtifactStore } from "../src/artifact-store.js";
import { PersistentImperiumReference } from "../src/persistent-reference.js";
import { ImperiumReference } from "../src/reference.js";

class AsyncMemoryStore implements AsyncArtifactStore {
  private readonly values = new Map<string, ArtifactEnvelope<unknown>>();

  async save<T>(artifact: ArtifactEnvelope<T>): Promise<ArtifactEnvelope<T>> {
    this.values.set(
      artifact.identity + "@" + artifact.version,
      artifact as ArtifactEnvelope<unknown>,
    );
    return artifact;
  }

  async get<T>(identity: string, version: number) {
    return this.values.get(identity + "@" + version) as
      | ArtifactEnvelope<T>
      | undefined;
  }

  async findByCorrelationId(correlationId: string) {
    return [...this.values.values()].filter(
      (artifact) => artifact.correlationId === correlationId,
    );
  }

  async supersede<T>(
    previous: ArtifactEnvelope<T>,
    successor: ArtifactEnvelope<T>,
  ) {
    const stored = this.values.get(previous.identity + "@" + previous.version);
    if (!stored) throw new Error("previous artifact is not stored");
    this.values.set(previous.identity + "@" + previous.version, {
      ...stored,
      status: "SUPERSEDED",
    });
    return this.save(successor);
  }
}

describe("PersistentImperiumReference", () => {
  it("persists submitted petition and work", async () => {
    const store = new AsyncMemoryStore();
    const reference = new PersistentImperiumReference(
      new ImperiumReference(),
      store,
    );

    const result = await reference.submit({
      content: "Define the professional pattern.",
      sessionReference: "persistent-session",
    });

    await expect(
      store.get(result.petition.identity, result.petition.version),
    ).resolves.toEqual(result.petition);
    expect(result.work).not.toBeNull();
    await expect(
      store.get(result.work!.identity, result.work!.version),
    ).resolves.toEqual(result.work);
  });

  it("persists clarification supersession", async () => {
    const store = new AsyncMemoryStore();
    const reference = new PersistentImperiumReference(
      new ImperiumReference(),
      store,
    );
    const submitted = await reference.submit({
      content: "Define the professional pattern.",
      sessionReference: "persistent-clarification-session",
    });
    const pending = await reference.requestClarification(
      submitted.petition,
      "scope is materially ambiguous",
    );

    await expect(
      store.get(submitted.petition.identity, submitted.petition.version),
    ).resolves.toMatchObject({ status: "SUPERSEDED" });
    await expect(
      store.get(pending.identity, pending.version),
    ).resolves.toEqual(pending);
  });

  it("persists delivery supersession", async () => {
    const store = new AsyncMemoryStore();
    const reference = new PersistentImperiumReference(
      new ImperiumReference(),
      store,
    );
    const submitted = await reference.submit({
      content: "Define the professional pattern.",
      sessionReference: "persistent-delivery-session",
    });
    const prepared = await reference.prepareResponse(
      submitted.petition,
      "fixture",
    );
    const acknowledged = await reference.dispatchResponse(prepared, true);

    await expect(
      store.get(prepared.identity, prepared.version),
    ).resolves.toMatchObject({ status: "SUPERSEDED" });
    await expect(
      store.get(acknowledged.identity, acknowledged.version),
    ).resolves.toEqual(acknowledged);
  });
});
