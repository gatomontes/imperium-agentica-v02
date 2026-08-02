import { describe, expect, it } from "vitest";
import { createArtifact } from "../src/artifact.js";
import { ENACTED_CORE_DOCTRINE_V2 } from "../src/enacted-core-doctrine-v2.js";
import { ENACTED_CORE_DOCTRINE_V1 } from "../src/enacted-core-doctrine-v1.js";
import {
  OfficeDoctrineProfileAdmissionDecision,
  OfficeDoctrineProfileContract,
  OfficeDoctrineProfileDraft,
  OfficeDoctrineProfileJudgment,
} from "../src/office-doctrine-profile.js";

const contract = new OfficeDoctrineProfileContract(
  ENACTED_CORE_DOCTRINE_V2.doctrine.identity + "@2",
  ENACTED_CORE_DOCTRINE_V2.doctrine.payload.lexiconRef,
);

const profileDraft = (
  overrides: Partial<OfficeDoctrineProfileDraft> = {},
): OfficeDoctrineProfileDraft => ({
  officeId: "Secretariat",
  arena: "CITADEL",
  title: "Secretariat Doctrine Profile",
  purpose: "Apply Core Doctrine v2 to Operator-facing mission intake.",
  issuerAuthorityRef: "secretariat-profile-issuer-grant@1",
  applications: ENACTED_CORE_DOCTRINE_V2.doctrine.payload.provisions.map(
    (provision) => ({
      provisionId: provision.provisionId,
      applicability: "APPLIES",
      applicationRule:
        "Secretariat applies " + provision.provisionId + " within intake jurisdiction.",
      verificationMethod:
        "Inspect the Mission Dossier and exact " + provision.provisionId + " evidence.",
      evidenceRequirements: [provision.provisionId + "-evidence"],
      invalidationConditions: [provision.provisionId + "-source-changed"],
    }),
  ),
  domainStandardRefs: ["mission-intake-standard@1"],
  prohibitedInterpretations: [
    "Operator intent is not external-action authority.",
    "Receipt does not prove factual claims.",
  ],
  profileRevisionConditions: [
    "Core Doctrine changes.",
    "Mission-intake jurisdiction changes.",
  ],
  ...overrides,
});

const draftCandidate = () =>
  contract.draft(
    ENACTED_CORE_DOCTRINE_V2.doctrine,
    profileDraft(),
    "profile-secretariat-001",
    {
      identityFactory: (prefix) => prefix + "-secretariat-001",
      now: () => "2026-08-02T02:00:00.000Z",
    },
  );

const judgmentFor = (candidate = draftCandidate(), result: OfficeDoctrineProfileJudgment["result"] = "ACCEPTABLE") =>
  createArtifact<OfficeDoctrineProfileJudgment>(
    "OfficeDoctrineProfileJudgment",
    "Tribunalis",
    candidate.correlationId,
    {
      profileCandidateRef: candidate.identity + "@" + candidate.version,
      coreDoctrineRef: candidate.payload.coreDoctrineRef,
      result,
      mandatoryConditions: [],
      conditionSatisfaction: [],
      findingRefs: ["tribunalis-profile-finding@1"],
    },
    [candidate.identity + "@" + candidate.version],
    { identityFactory: (prefix) => prefix + "-001" },
  );

const decisionFor = (candidate = draftCandidate(), judgment = judgmentFor(candidate)) =>
  createArtifact<OfficeDoctrineProfileAdmissionDecision>(
    "OfficeDoctrineProfileAdmissionDecision",
    "Senator:" + candidate.payload.assignedSenatorId,
    candidate.correlationId,
    {
      profileCandidateRef: candidate.identity + "@" + candidate.version,
      conformanceJudgmentRef: judgment.identity + "@" + judgment.version,
      admissionAuthorityRef: "profile-admission-grant@1",
      authorityFindingRef: "profile-admission-authority-effective@1",
      disposition: "ADMIT",
    },
    [
      candidate.identity + "@" + candidate.version,
      judgment.identity + "@" + judgment.version,
      "profile-admission-grant@1",
      "profile-admission-authority-effective@1",
    ],
    { identityFactory: (prefix) => prefix + "-001" },
  );

describe("Office Doctrine Profile contract", () => {
  it("derives a complete candidate from exact enacted v2", () => {
    const candidate = draftCandidate();
    expect(candidate).toMatchObject({
      artifactType: "OfficeDoctrineProfile",
      producer: "Secretariat",
      version: 1,
      payload: {
        officeId: "Secretariat",
        arena: "CITADEL",
        coreDoctrineRef: ENACTED_CORE_DOCTRINE_V2.doctrine.identity + "@2",
        assignedSenatorId: "senator-core-doctrine-001",
        issuerAuthorityRef: "secretariat-profile-issuer-grant@1",
        state: "CANDIDATE",
      },
    });
    expect(candidate.payload.applications).toHaveLength(19);
  });

  it("refuses a superseded doctrine envelope whose local status still says CURRENT", () => {
    expect(ENACTED_CORE_DOCTRINE_V1.doctrine.status).toBe("CURRENT");
    expect(() =>
      contract.draft(
        ENACTED_CORE_DOCTRINE_V1.doctrine,
        profileDraft({
          applications: ENACTED_CORE_DOCTRINE_V1.doctrine.payload.provisions.map(
            (provision) => ({
              provisionId: provision.provisionId,
              applicability: "APPLIES",
              applicationRule: "Historical v1 application.",
              verificationMethod: "Historical verification.",
              evidenceRequirements: ["historical-evidence"],
              invalidationConditions: ["v1-superseded"],
            }),
          ),
        }),
        "stale-v1",
      ),
    ).toThrow("Office profile doctrine does not match the current doctrine pointer");
  });

  it("refuses omitted or duplicate Core Doctrine provisions", () => {
    expect(() =>
      contract.draft(
        ENACTED_CORE_DOCTRINE_V2.doctrine,
        profileDraft({ applications: profileDraft().applications.slice(1) }),
        "profile-incomplete",
      ),
    ).toThrow("profile must address every exact Core Doctrine provision");
    expect(() =>
      contract.draft(
        ENACTED_CORE_DOCTRINE_V2.doctrine,
        profileDraft({ applications: [...profileDraft().applications, profileDraft().applications[0]] }),
        "profile-duplicate",
      ),
    ).toThrow("duplicate Core Doctrine application");
  });

  it("requires exact issuer authority and revision conditions", () => {
    expect(() => contract.draft(ENACTED_CORE_DOCTRINE_V2.doctrine, profileDraft({ issuerAuthorityRef: "" }), "missing-authority")).toThrow("profile issuer authority is required");
    expect(() => contract.draft(ENACTED_CORE_DOCTRINE_V2.doctrine, profileDraft({ profileRevisionConditions: [] }), "missing-revision")).toThrow("profile revision conditions are required");
  });

  it("requires evidence, verification, and invalidation for every application", () => {
    const applications = profileDraft().applications;
    applications[0] = { ...applications[0], evidenceRequirements: [] };
    expect(() => contract.draft(ENACTED_CORE_DOCTRINE_V2.doctrine, profileDraft({ applications }), "missing-evidence")).toThrow("application evidence and invalidation conditions are required");
  });

  it("permits NOT_APPLICABLE only with complete lineage", () => {
    const applications = profileDraft().applications;
    applications[0] = {
      ...applications[0],
      applicability: "NOT_APPLICABLE",
      nonApplicabilityBasis: {
        governingRuleRef: "CORE-000@2",
        determinationAuthorityRef: "applicability-authority@1",
        evidenceRefs: ["applicability-evidence@1"],
        scope: "Secretariat has no Runtime execution surface.",
        revisionConditions: ["Secretariat jurisdiction changes."],
      },
    };
    expect(contract.draft(ENACTED_CORE_DOCTRINE_V2.doctrine, profileDraft({ applications }), "not-applicable").payload.applications[0].applicability).toBe("NOT_APPLICABLE");
    applications[0] = { ...applications[0], nonApplicabilityBasis: undefined };
    expect(() => contract.draft(ENACTED_CORE_DOCTRINE_V2.doctrine, profileDraft({ applications }), "bad-not-applicable")).toThrow("NOT_APPLICABLE requires exact governing, authority, evidence, scope, and revision basis");
  });

  it("does not allow APPLIES to smuggle an exemption", () => {
    const applications = profileDraft().applications;
    applications[0] = {
      ...applications[0],
      nonApplicabilityBasis: {
        governingRuleRef: "CORE-000@2",
        determinationAuthorityRef: "authority@1",
        evidenceRefs: ["evidence@1"],
        scope: "hidden exemption",
        revisionConditions: ["change"],
      },
    };
    expect(() => contract.draft(ENACTED_CORE_DOCTRINE_V2.doctrine, profileDraft({ applications }), "smuggled-exemption")).toThrow("APPLIES may not carry a non-applicability basis");
  });

  it("revises by immutable successor without changing Office identity", () => {
    const first = draftCandidate();
    const second = contract.revise(
      first,
      ENACTED_CORE_DOCTRINE_V2.doctrine,
      profileDraft({ title: "Secretariat Doctrine Profile Revised" }),
    );
    expect(second.identity).toBe(first.identity);
    expect(second.version).toBe(2);
    expect(second.supersedes).toBe(first.identity + "@1");
    expect(() => contract.revise(first, ENACTED_CORE_DOCTRINE_V2.doctrine, profileDraft({ officeId: "Castellan" }))).toThrow("profile revision may not change Office identity");
  });

  it("admits only an exact acceptable Tribunalis judgment and authority decision", () => {
    const candidate = draftCandidate();
    const judgment = judgmentFor(candidate);
    const admitted = contract.admit(candidate, judgment, decisionFor(candidate, judgment));
    expect(admitted.payload).toMatchObject({
      state: "ADMITTED",
      conformanceJudgmentRef: judgment.identity + "@1",
    });
    expect(admitted.version).toBe(candidate.version + 1);
    expect(admitted.supersedes).toBe(candidate.identity + "@" + candidate.version);
  });

  it("refuses unresolved or unacceptable judgment", () => {
    for (const result of ["UNRESOLVED", "NOT_ACCEPTABLE"] as const) {
      const candidate = draftCandidate();
      const judgment = judgmentFor(candidate, result);
      expect(() => contract.admit(candidate, judgment, decisionFor(candidate, judgment))).toThrow("profile judgment is not acceptable");
    }
  });

  it("requires evidence for every mandatory conditional judgment", () => {
    const candidate = draftCandidate();
    const base = judgmentFor(candidate, "ACCEPTABLE_WITH_CONDITIONS");
    const judgment = {
      ...base,
      payload: {
        ...base.payload,
        mandatoryConditions: ["repair-boundary"],
        conditionSatisfaction: [],
      },
    };
    expect(() => contract.admit(candidate, judgment, decisionFor(candidate, judgment))).toThrow("every mandatory judgment condition requires exact satisfaction evidence");
  });

  it("refuses mismatched judgment and admission lineage", () => {
    const candidate = draftCandidate();
    const other = { ...candidate, identity: "other-profile" };
    const judgment = judgmentFor(other);
    expect(() => contract.admit(candidate, judgment, decisionFor(candidate, judgment))).toThrow("judgment does not match candidate and doctrine");
  });

  it("refuses admission without an exact authority grant", () => {
    const candidate = draftCandidate();
    const judgment = judgmentFor(candidate);
    const decision = decisionFor(candidate, judgment);
    decision.payload.admissionAuthorityRef = "";
    expect(() => contract.admit(candidate, judgment, decision)).toThrow("effective profile admission authority is required");
  });

  it("refuses admission by anyone except the doctrine-assigned Senator", () => {
    const candidate = draftCandidate();
    const judgment = judgmentFor(candidate);
    const decision = {
      ...decisionFor(candidate, judgment),
      producer: "Senator:unassigned",
    };
    expect(() => contract.admit(candidate, judgment, decision)).toThrow(
      "only the doctrine-assigned Senator may admit the profile",
    );
  });

  it("refuses authority labels that are absent from decision lineage", () => {
    const candidate = draftCandidate();
    const judgment = judgmentFor(candidate);
    const decision = decisionFor(candidate, judgment);
    decision.sourceRefs = decision.sourceRefs.filter(
      (ref) => ref !== decision.payload.authorityFindingRef,
    );
    expect(() => contract.admit(candidate, judgment, decision)).toThrow(
      "effective profile admission authority is required",
    );
  });
});
