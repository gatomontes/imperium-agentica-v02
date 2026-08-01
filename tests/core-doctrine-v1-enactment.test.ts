import { describe, expect, it } from "vitest";
import {
  CORE_DOCTRINE_V1_ASSIGNED_SENATOR,
  CORE_DOCTRINE_V1_DECISION_REF,
  ENACTED_CORE_DOCTRINE_V1,
} from "../src/enacted-core-doctrine-v1.js";
import { Senator } from "../src/senate.js";

describe("Core Doctrine v1 enactment", () => {
  it("enacts all eighteen provisions together under DR-071", () => {
    expect(ENACTED_CORE_DOCTRINE_V1.doctrine).toMatchObject({
      artifactType: "CoreDoctrine",
      identity: "coredoctrine-core-v1",
      version: 1,
      status: "CURRENT",
      producer: "Senate",
      correlationId: "core-doctrine-v1-enactment",
      payload: {
        edition: 1,
        state: "ENACTED",
        senateDecisionRef: CORE_DOCTRINE_V1_DECISION_REF,
        assignedSenatorId: CORE_DOCTRINE_V1_ASSIGNED_SENATOR,
        transitionRule: "PROSPECTIVE_ADOPTION",
        affectedOfficeProfiles: ["ALL"],
      },
    });
    expect(ENACTED_CORE_DOCTRINE_V1.doctrine.payload.provisions).toHaveLength(18);
    expect(
      ENACTED_CORE_DOCTRINE_V1.doctrine.payload.provisions.map(
        (provision) => provision.provisionId,
      ),
    ).toEqual(Array.from({ length: 18 }, (_, index) =>
      "CORE-" + String(index + 1).padStart(3, "0"),
    ));
  });

  it("emits the first notice assigned to the functional Senator", () => {
    expect(ENACTED_CORE_DOCTRINE_V1.propagation).toMatchObject({
      artifactType: "DoctrinePropagationNotice",
      identity: "doctrinepropagationnotice-core-v1",
      producer: "Senate",
      correlationId: "core-doctrine-v1-enactment",
      payload: {
        doctrineRef: "coredoctrine-core-v1@1",
        affectedOfficeProfiles: ["ALL"],
        assignedSenatorId: CORE_DOCTRINE_V1_ASSIGNED_SENATOR,
        requiredAction: "ADOPT_PROSPECTIVELY",
        state: "AWAITING_OFFICE_CONFORMANCE",
      },
    });
  });

  it("begins propagation open rather than claiming Office conformance", () => {
    const senator = new Senator(CORE_DOCTRINE_V1_ASSIGNED_SENATOR);
    const dossier = senator.assessPropagation(
      ENACTED_CORE_DOCTRINE_V1.propagation,
      [],
      false,
      [],
      [],
      { identityFactory: (prefix) => prefix + "-core-v1" },
    );
    expect(dossier.payload).toMatchObject({
      scopeComplete: false,
      assessments: [],
      state: "IN_PROGRESS",
    });
  });
});
