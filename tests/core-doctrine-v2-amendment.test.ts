import { describe, expect, it } from "vitest";
import { CORE_DOCTRINE_V2_PROVISIONS, coreDoctrineV2Bill } from "../src/core-doctrine-v2.js";
import { ENACTED_CORE_DOCTRINE_V1 } from "../src/enacted-core-doctrine-v1.js";
import { Senate } from "../src/senate.js";

describe("Blackquill Core Doctrine v2 amendment", () => {
  it("uses one complete exact normative provision array", () => {
    expect(CORE_DOCTRINE_V2_PROVISIONS).toHaveLength(19);
    expect(CORE_DOCTRINE_V2_PROVISIONS[0].provisionId).toBe("CORE-000");
    expect(new Set(CORE_DOCTRINE_V2_PROVISIONS.map((p) => p.provisionId)).size).toBe(19);
    expect(CORE_DOCTRINE_V2_PROVISIONS.every((p) => p.rule.length > 100)).toBe(true);
  });

  it("amends v1 as edition two with mandatory revalidation", () => {
    const result = new Senate("coredoctrine-core-v1@2#embedded-controlling-definitions").amend(
      ENACTED_CORE_DOCTRINE_V1.doctrine,
      coreDoctrineV2Bill(
        "senate-decision-core-v2@1",
        "senator-core-doctrine-001",
        "2026-08-03T00:00:00.000Z",
      ),
      {
        identityFactory: (prefix) => prefix + "-core-v2",
        now: () => "2026-08-03T00:00:00.000Z",
      },
    );
    expect(result.doctrine).toMatchObject({
      identity: ENACTED_CORE_DOCTRINE_V1.doctrine.identity,
      version: 2,
      supersedes: ENACTED_CORE_DOCTRINE_V1.doctrine.identity + "@1",
      payload: {
        edition: 2,
        transitionRule: "MANDATORY_REVALIDATION",
        assignedSenatorId: "senator-core-doctrine-001",
      },
    });
    expect(result.doctrine.payload.provisions).toEqual(CORE_DOCTRINE_V2_PROVISIONS);
    expect(result.propagation.payload.requiredAction).toBe("REVALIDATE");
  });

  it("defines every Blackquill-targeted trigger", () => {
    const definitions = CORE_DOCTRINE_V2_PROVISIONS[0].rule;
    for (const term of [
      "Governed action",
      "Governed artifact",
      "Exact means",
      "Material means",
      "Competent means",
      "Native steward",
      "Unresolved means",
      "Bounded scope completeness",
    ]) expect(definitions).toContain(term);
  });

  it("uses observable evidence selection behavior rather than inferred motive", () => {
    const rule = CORE_DOCTRINE_V2_PROVISIONS.find((p) => p.provisionId === "CORE-004")!.rule;
    expect(rule).toContain("declared question-relevant method");
    expect(rule).toContain("must not change because");
    expect(rule).toContain("Unequal evidentiary weight is permitted");
    expect(rule).not.toContain("intent");
  });

  it("recognizes obligations as independent of Imperium records", () => {
    const rule = CORE_DOCTRINE_V2_PROVISIONS.find((p) => p.provisionId === "CORE-015")!.rule;
    expect(rule).toContain("exist independently of Imperium's records");
    expect(rule).toContain("denies only the dependent claim or action");
  });

  it("makes conditional proceed and non-applicability exact", () => {
    const judgment = CORE_DOCTRINE_V2_PROVISIONS.find((p) => p.provisionId === "CORE-013")!.rule;
    const envelope = CORE_DOCTRINE_V2_PROVISIONS.find((p) => p.provisionId === "CORE-007")!.rule;
    expect(judgment).toContain("every mandatory condition evidenced as satisfied");
    expect(envelope).toContain("cited governing rule and competent determination");
    expect(envelope).toContain("scope, expiry when applicable, and revision conditions");
  });

  it("bounds Senator coverage instead of claiming omniscience", () => {
    const definitions = CORE_DOCTRINE_V2_PROVISIONS[0].rule;
    const propagation = CORE_DOCTRINE_V2_PROVISIONS.find((p) => p.provisionId === "CORE-018")!.rule;
    expect(definitions).toContain("it is not a claim of omniscience");
    expect(propagation).toContain("declares the discovery method and bounded scope");
    expect(propagation).toContain("Citadel and Colosseum prove conformance independently");
  });
});
