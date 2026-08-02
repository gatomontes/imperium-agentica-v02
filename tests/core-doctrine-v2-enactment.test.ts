import { describe, expect, it } from "vitest";
import { CORE_DOCTRINE_V2_PROVISIONS } from "../src/core-doctrine-v2.js";
import {
  CORE_DOCTRINE_V2_ASSIGNED_SENATOR,
  CORE_DOCTRINE_V2_DECISION_REF,
  ENACTED_CORE_DOCTRINE_V2,
} from "../src/enacted-core-doctrine-v2.js";
import { ENACTED_CORE_DOCTRINE_V1 } from "../src/enacted-core-doctrine-v1.js";
import { Senator } from "../src/senate.js";

describe("Core Doctrine v2 enactment", () => {
  it("supersedes exact v1 identity and version without rewriting it", () => {
    expect(ENACTED_CORE_DOCTRINE_V2.doctrine).toMatchObject({
      identity: ENACTED_CORE_DOCTRINE_V1.doctrine.identity,
      version: 2,
      supersedes: ENACTED_CORE_DOCTRINE_V1.doctrine.identity + "@1",
      producer: "Senate",
      status: "CURRENT",
      payload: {
        edition: 2,
        senateDecisionRef: CORE_DOCTRINE_V2_DECISION_REF,
        transitionRule: "MANDATORY_REVALIDATION",
        affectedOfficeProfiles: ["ALL"],
        assignedSenatorId: CORE_DOCTRINE_V2_ASSIGNED_SENATOR,
        state: "ENACTED",
      },
    });
    expect(ENACTED_CORE_DOCTRINE_V1.doctrine.version).toBe(1);
    expect(ENACTED_CORE_DOCTRINE_V1.doctrine.supersedes).toBeUndefined();
  });

  it("enacts the exact single-source provision array without condensation", () => {
    expect(ENACTED_CORE_DOCTRINE_V2.doctrine.payload.provisions).toEqual(
      CORE_DOCTRINE_V2_PROVISIONS,
    );
    expect(ENACTED_CORE_DOCTRINE_V2.doctrine.payload.provisions).toHaveLength(19);
  });

  it("emits mandatory revalidation assigned to the Senator", () => {
    expect(ENACTED_CORE_DOCTRINE_V2.propagation.payload).toMatchObject({
      doctrineRef: ENACTED_CORE_DOCTRINE_V2.doctrine.identity + "@2",
      affectedOfficeProfiles: ["ALL"],
      assignedSenatorId: CORE_DOCTRINE_V2_ASSIGNED_SENATOR,
      requiredAction: "REVALIDATE",
      state: "AWAITING_OFFICE_CONFORMANCE",
    });
  });

  it("starts revalidation open with no fabricated scope completeness", () => {
    const dossier = new Senator(
      CORE_DOCTRINE_V2_ASSIGNED_SENATOR,
    ).assessPropagation(
      ENACTED_CORE_DOCTRINE_V2.propagation,
      [],
      false,
      [],
      [],
    );
    expect(dossier.payload).toMatchObject({
      doctrineRef: ENACTED_CORE_DOCTRINE_V2.doctrine.identity + "@2",
      scopeComplete: false,
      assessments: [],
      state: "IN_PROGRESS",
    });
  });
});
