import { describe, expect, it } from "vitest";
import { createArtifact } from "../src/artifact.js";
import { DoctrineBill, Senate } from "../src/senate.js";

const bill = (overrides: Partial<DoctrineBill> = {}): DoctrineBill => ({
  title: "Core Imperium Doctrine",
  rationale: "Establish common institutional invariants.",
  senateDecisionRef: "senate-minute-001@1",
  effectiveAt: "2026-08-02T00:00:00.000Z",
  provisions: [
    {
      provisionId: "CORE-001",
      title: "Evidence does not create authority",
      rule: "Evidence and conformance may not be treated as operational authority.",
    },
  ],
  affectedOfficeProfiles: ["Tribunalis", "Studium", "Castellan"],
  transitionRule: "PROSPECTIVE_ADOPTION",
  ...overrides,
});

describe("Senate Core Doctrine stewardship", () => {
  it("enacts versioned Core Doctrine and emits a propagation notice", () => {
    const result = new Senate().enact(bill(), "legislation-001", {
      identityFactory: (prefix) => prefix + "-001",
      now: () => "2026-08-01T22:30:00.000Z",
    });

    expect(result.doctrine).toMatchObject({
      artifactType: "CoreDoctrine",
      producer: "Senate",
      version: 1,
      payload: {
        edition: 1,
        state: "ENACTED",
        senateDecisionRef: "senate-minute-001@1",
      },
    });
    expect(result.propagation).toMatchObject({
      artifactType: "DoctrinePropagationNotice",
      producer: "Senate",
      payload: {
        doctrineRef: result.doctrine.identity + "@1",
        affectedOfficeProfiles: ["Castellan", "Studium", "Tribunalis"],
        requiredAction: "ADOPT_PROSPECTIVELY",
        state: "AWAITING_OFFICE_CONFORMANCE",
      },
    });
  });

  it("amends only exact current Senate-enacted doctrine", () => {
    const senate = new Senate();
    const first = senate.enact(bill(), "legislation-002").doctrine;
    const result = senate.amend(
      first,
      bill({
        senateDecisionRef: "senate-minute-002@1",
        rationale: "Require affected Offices to revalidate.",
        transitionRule: "MANDATORY_REVALIDATION",
      }),
    );

    expect(result.doctrine.identity).toBe(first.identity);
    expect(result.doctrine.version).toBe(2);
    expect(result.doctrine.supersedes).toBe(first.identity + "@1");
    expect(result.doctrine.payload.edition).toBe(2);
    expect(result.doctrine.sourceRefs).toEqual([
      first.identity + "@1",
      "senate-minute-002@1",
    ]);
    expect(result.propagation.payload.requiredAction).toBe("REVALIDATE");

    expect(() =>
      senate.amend({ ...first, status: "SUPERSEDED" }, bill()),
    ).toThrow("only current enacted Core Doctrine may be amended");

    const foreign = createArtifact(
      "CoreDoctrine",
      "Studium",
      "foreign-doctrine",
      first.payload,
    );
    expect(() => senate.amend(foreign, bill())).toThrow(
      "Senate may amend only Senate-enacted Core Doctrine",
    );
  });

  it("refuses legislation without complete authority and provisions", () => {
    const senate = new Senate();
    expect(() =>
      senate.enact(bill({ senateDecisionRef: "" }), "legislation-003"),
    ).toThrow("Senate decision reference is required");
    expect(() =>
      senate.enact(
        bill({
          provisions: [
            ...bill().provisions,
            { ...bill().provisions[0] },
          ],
        }),
        "legislation-004",
      ),
    ).toThrow("duplicate doctrine provision: CORE-001");
  });
});
