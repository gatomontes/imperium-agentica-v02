import { describe, expect, it } from "vitest";
import {
  CORE_DOCTRINE_V1_PROVISIONS,
  coreDoctrineV1Bill,
} from "../src/core-doctrine-v1.js";
import { Senate, Senator } from "../src/senate.js";

describe("Core Doctrine v1 bill pressure boundary", () => {
  it("contains one exact complete provision set", () => {
    expect(CORE_DOCTRINE_V1_PROVISIONS).toHaveLength(18);
    expect(new Set(CORE_DOCTRINE_V1_PROVISIONS.map(([id]) => id)).size).toBe(18);
    expect(CORE_DOCTRINE_V1_PROVISIONS.every((entry) => entry[2].length > 40)).toBe(true);
  });

  it("covers every accepted constitutional family without Office procedure", () => {
    const text = CORE_DOCTRINE_V1_PROVISIONS.flat().join(" ").toLowerCase();
    for (const required of [
      "authority",
      "evidence",
      "provenance",
      "identity",
      "steward",
      "containment",
      "tribunalis",
      "curia",
      "operator intent",
      "external obligations",
      "recourse",
      "senator",
    ]) {
      expect(text).toContain(required);
    }
    for (const implementationDetail of ["HTTP", "Postgres", "queue", "provider API"])
      expect(text).not.toContain(implementationDetail.toLowerCase());
  });

  it("enacts only through Senate with an assigned Senator", () => {
    const senate = new Senate();
    const result = senate.enact(
      coreDoctrineV1Bill(
        "senate-decision-core-v1@1",
        "senator-cassian-001",
        "2026-08-03T00:00:00.000Z",
      ),
      "core-doctrine-v1",
      { identityFactory: (prefix) => prefix + "-v1" },
    );
    expect(result.doctrine.payload).toMatchObject({
      edition: 1,
      state: "ENACTED",
      assignedSenatorId: "senator-cassian-001",
      affectedOfficeProfiles: ["ALL"],
    });
    expect(result.doctrine.payload.provisions).toHaveLength(18);
    expect(result.propagation.payload).toMatchObject({
      assignedSenatorId: "senator-cassian-001",
      requiredAction: "ADOPT_PROSPECTIVELY",
      state: "AWAITING_OFFICE_CONFORMANCE",
    });
  });

  it("keeps Citadel and Colosseum conformance independent", () => {
    const result = new Senate().enact(
      coreDoctrineV1Bill(
        "senate-decision-core-v1@1",
        "senator-cassian-001",
        "2026-08-03T00:00:00.000Z",
      ),
      "core-doctrine-v1",
    );
    const senator = new Senator("senator-cassian-001");
    const dossier = senator.assessPropagation(
      result.propagation,
      [
        {
          surfaceRef: "arena:Citadel",
          disposition: "ADOPTED",
          evidenceRefs: ["citadel-adoption@1"],
          instruction: "Apply Core Doctrine v1 prospectively.",
        },
        {
          surfaceRef: "arena:Colosseum",
          disposition: "UNRESOLVED",
          evidenceRefs: [],
          instruction: "Hold dependent use pending Colosseum profile evidence.",
        },
      ],
      ["senate-escalation-colosseum@1"],
    );
    expect(dossier.payload.state).toBe("IN_PROGRESS");
    expect(dossier.payload.assessments).toHaveLength(2);
  });

  it("does not mistake confidence or arithmetic for Tribunalis acceptability", () => {
    const judgmentRule = CORE_DOCTRINE_V1_PROVISIONS.find(
      ([id]) => id === "CORE-012",
    )?.[2];
    expect(judgmentRule).toContain("no average");
    expect(judgmentRule).toContain("mandatory failure");
    expect(judgmentRule).toContain("unresolved determination");
  });

  it("denies only the unsupported consequence when failing closed", () => {
    const failClosedRule = CORE_DOCTRINE_V1_PROVISIONS.find(
      ([id]) => id === "CORE-009",
    )?.[2];
    expect(failClosedRule).toContain("only its exact dependent consequence");
    expect(failClosedRule).toContain("termination remain separately governed");
  });
});
