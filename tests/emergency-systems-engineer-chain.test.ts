import { describe, expect, it } from "vitest";
import { Castellan } from "../src/castellan.js";
import { Conscription } from "../src/conscription.js";
import { Foundry } from "../src/foundry.js";
import { Garrison } from "../src/garrison.js";
import { Guildhall } from "../src/guildhall.js";
import { Hagiography } from "../src/hagiography.js";
import { InvalidationCoordinator } from "../src/invalidation.js";
import { Pit } from "../src/pit.js";
import { Secretariat } from "../src/secretariat.js";
import { Studium } from "../src/studium.js";

describe("synthetic emergency-systems-engineer creation chain", () => {
  it("refuses incomplete Secretariat intake and keeps it out of Castellan", () => {
    const petition = new Secretariat().receive({
      content: "   ",
      sessionReference: "opaque-incomplete-intake-test",
    });

    expect(petition.payload.finding).toBe("PETITION_UNRESOLVED");
    expect(new Castellan().receivePetition(petition)).toBeNull();

    const missingSession = new Secretariat().receive({
      content: "Create a synthetic emergency-systems-engineer persona.",
      sessionReference: "   ",
    });
    expect(missingSession.payload.finding).toBe("PETITION_UNRESOLVED");
    expect(new Castellan().receivePetition(missingSession)).toBeNull();
  });

  it("requires clarification before Castellan can form work", () => {
    const secretariat = new Secretariat();
    const castellan = new Castellan();
    const petition = secretariat.receive({
      content: "Create a synthetic emergency-systems-engineer persona.",
      sessionReference: "opaque-clarification-test",
    });

    const awaitingClarification = secretariat.requestClarification(
      petition,
      "specify the profession boundary",
    );
    expect(awaitingClarification.payload.finding).toBe(
      "PETITION_NEEDS_CLARIFICATION",
    );
    expect(castellan.receivePetition(awaitingClarification)).toBeNull();

    const resolved = secretariat.resolveClarification(
      awaitingClarification,
      "Create a synthetic emergency-systems-engineer persona for bounded incident response.",
    );
    expect(resolved.payload.finding).toBe("PETITION_RECEIVED");

    const work = castellan.receivePetition(resolved);
    expect(work).not.toBeNull();
    expect(work?.payload.missionNeed).toContain(
      "bounded incident response",
    );
    expect(work?.payload.petitionRef).toBe(
      resolved.identity + "@" + resolved.version,
    );
    expect(work?.correlationId).toBe(resolved.correlationId);
  });

  it("does not let Castellan bypass Secretariat routing state", () => {
    const petition = new Secretariat().receive({
      content: "Create a synthetic emergency-systems-engineer persona.",
      sessionReference: "opaque-routing-boundary-test",
    });
    const routed = new Secretariat().markRouted(petition);

    expect(routed.payload.finding).toBe("PETITION_ROUTED_TO_CASTELLAN");
    expect(new Castellan().receivePetition(routed)).toBeNull();
  });

  it("blocks incomplete downstream artifacts from advancing", () => {
    const petition = new Secretariat().receive({
      content: "Create a synthetic emergency-systems-engineer persona.",
      sessionReference: "opaque-downstream-refusal-test",
    });
    const work = new Castellan().receivePetition(petition)!;

    const unresolvedProfession = new Guildhall().resolve(work, {});
    expect(unresolvedProfession.payload.finding).toBe("PROFESSION_UNRESOLVED");

    const unresolvedDoctrine = new Studium().authorPersonaDoctrine({
      profession: unresolvedProfession,
    });
    expect(unresolvedDoctrine.payload.finding).toBe("DOCTRINE_UNRESOLVED");

    const unresolvedCanon = new Hagiography().canonize({
      syntheticSource: false,
    });
    expect(unresolvedCanon.payload.finding).toBe("TRAIT_CANON_UNRESOLVED");

    const unresolvedCandidate = new Foundry().integrate({
      profession: unresolvedProfession,
      provenanceComplete: false,
    });
    expect(unresolvedCandidate.payload.finding).toBe(
      "PERSONA_INPUTS_UNRESOLVED",
    );

    const unresolvedPit = new Pit().test(unresolvedCandidate, []);
    expect(unresolvedPit.payload.finding).toBe("PERSONA_TEST_UNRESOLVED");

    const notAdmitted = new Garrison().admit(unresolvedCandidate, unresolvedPit);
    expect(notAdmitted.payload.finding).toBe(
      "CANONICAL_PERSONA_ADMISSION_UNRESOLVED",
    );
    expect(notAdmitted.payload.status).toBe("NOT_ADMITTED");

    const unresolvedPackage = new Conscription().package(notAdmitted, "");
    expect(unresolvedPackage.payload.finding).toBe(
      "OPERATIVE_PACKAGE_UNRESOLVED",
    );
    expect(unresolvedPackage.payload.state).toBe("PACKAGED");
  });

  it("passes every stage and stops at inactive packaging", () => {
    const petition = new Secretariat().receive({
      content: "Create a synthetic emergency-systems-engineer persona.",
      sessionReference: "opaque-emergency-systems-engineer-test",
    });
    expect(petition.payload.finding).toBe("PETITION_RECEIVED");
    expect(petition.payload.originalContent).toBe(
      "Create a synthetic emergency-systems-engineer persona.",
    );
    expect(petition.payload.normalizedContent).toBe(
      "Create a synthetic emergency-systems-engineer persona.",
    );

    const work = new Castellan().receivePetition(petition)!;
    expect(work.payload.missionNeed).toBe(
      "Create a synthetic emergency-systems-engineer persona.",
    );
    expect(work.payload.requestedWork).toBe(
      "Create a synthetic emergency-systems-engineer persona.",
    );
    expect(work.payload.petitionRef).toBe(
      petition.identity + "@" + petition.version,
    );
    expect(work.correlationId).toBe(petition.correlationId);

    const profession = new Guildhall().resolve(work, {
      professionIdentity: "emergency systems engineer",
      requiredCompetence: [
        "incident diagnosis",
        "safe service restoration",
        "systems coordination",
      ],
      practiceBoundaries: [
        "do not invent telemetry",
        "do not exceed granted authority",
        "stop unsafe restoration",
      ],
      suitabilityCriteria: [
        "calm under pressure",
        "evidence-disciplined diagnosis",
        "reversible intervention preference",
      ],
    });
    expect(profession.payload.finding).toBe("PROFESSION_CONFORMANT");

    const doctrine = new Studium().authorPersonaDoctrine({
      profession,
      mandatoryConduct: ["establish current system state before action"],
      prohibitedConduct: ["conceal uncertainty or fabricate system state"],
      evidenceDuties: ["record observations, hypotheses, and confidence"],
      refusalConditions: ["insufficient evidence or unsafe authority"],
      escalationTriggers: ["material risk, contradiction, or authority gap"],
      stopConditions: ["continued action could worsen the incident"],
    });
    expect(doctrine.payload.finding).toBe("DOCTRINE_CONFORMANT");

    const canon = new Hagiography().canonize({
      syntheticSource: true,
      sourceRef: "synthetic-emergency-engineer-exemplar@1",
      performanceEvidence: "Restored a failing service through staged diagnosis.",
      observedBehavior: "Separated known facts from hypotheses and stopped unsafe changes.",
      boundedTrait: "calm, reversible, evidence-first incident reasoning",
      conditions: ["under incomplete telemetry and time pressure"],
      limits: ["does not replace domain authority or missing evidence"],
      counterweights: ["escalate when risk or uncertainty exceeds bounds"],
      ec01Disposition: "ADMISSIBLE FOR CANON REVIEW",
    });
    expect(canon.payload.finding).toBe("TRAIT_CANON_CONFORMANT");
    expect(canon.payload.syntheticSource).toBe(true);

    const candidate = new Foundry().integrate({
      profession,
      doctrineRef: doctrine.identity + "@" + doctrine.version,
      canonRefs: [canon.identity + "@" + canon.version],
      provenanceComplete: true,
    });
    expect(candidate.payload.finding).toBe("PERSONA_INPUTS_CONFORMANT");

    const pit = new Pit().test(candidate, [
      "incomplete telemetry",
      "contradictory alerts",
      "unsafe requested restoration",
    ]);
    expect(pit.payload.finding).toBe("PERSONA_TEST_CONFORMANT");

    const persona = new Garrison().admit(candidate, pit);
    expect(persona.payload.finding).toBe("CANONICAL_PERSONA_ADMITTED");
    expect(persona.payload.status).toBe("ADMITTED");

    const operative = new Conscription().package(persona, "node-reference");
    expect(operative.payload.finding).toBe("OPERATIVE_PACKAGE_CONFORMANT");
    expect(operative.payload.state).toBe("PACKAGED");
    expect(operative.payload.state).not.toBe("ACTIVATION_PENDING");
    expect(operative.payload.state).not.toBe("DEPLOYED");

    for (const artifact of [profession, doctrine, candidate, pit, persona, operative]) {
      expect(artifact.correlationId).toBe(petition.correlationId);
    }
  });

  it("preserves lifecycle references and requires owned invalidation", () => {
    const petition = new Secretariat().receive({
      content: "Create a synthetic emergency-systems-engineer persona.",
      sessionReference: "opaque-integrity-test",
    });
    const work = new Castellan().receivePetition(petition)!;
    const profession = new Guildhall().resolve(work, {
      professionIdentity: "emergency systems engineer",
      requiredCompetence: ["incident diagnosis"],
      practiceBoundaries: ["do not exceed granted authority"],
      suitabilityCriteria: ["evidence-disciplined reasoning"],
    });
    const doctrine = new Studium().authorPersonaDoctrine({
      profession,
      mandatoryConduct: ["establish current system state"],
      prohibitedConduct: ["fabricate system state"],
      evidenceDuties: ["record uncertainty"],
      refusalConditions: ["insufficient evidence"],
      escalationTriggers: ["material risk"],
      stopConditions: ["unsafe continuation"],
    });
    const canon = new Hagiography().canonize({
      syntheticSource: true,
      sourceRef: "synthetic-emergency-engineer-exemplar@1",
      performanceEvidence: "Restored a failing service through staged diagnosis.",
      observedBehavior: "Separated facts from hypotheses.",
      boundedTrait: "evidence-first reasoning",
      conditions: ["incomplete telemetry"],
      limits: ["does not replace domain authority"],
      counterweights: ["escalate when uncertainty exceeds bounds"],
      ec01Disposition: "ADMISSIBLE FOR CANON REVIEW",
    });
    const candidate = new Foundry().integrate({
      profession,
      doctrineRef: doctrine.identity + "@" + doctrine.version,
      canonRefs: [canon.identity + "@" + canon.version],
      provenanceComplete: true,
    });
    const pit = new Pit().test(candidate, ["contradictory alerts"]);
    const persona = new Garrison().admit(candidate, pit);
    const operative = new Conscription().package(persona, "node-reference");

    expect(candidate.payload.doctrineRef).toBe(
      doctrine.identity + "@" + doctrine.version,
    );
    expect(candidate.payload.canonRefs).toEqual([
      canon.identity + "@" + canon.version,
    ]);
    expect(operative.sourceRefs).toContain(persona.identity + "@" + persona.version);
    expect(operative.payload.state).toBe("PACKAGED");

    const unresolved = new InvalidationCoordinator().record(
      doctrine.identity + "@" + doctrine.version,
      [candidate.identity + "@" + candidate.version, persona.identity + "@" + persona.version],
      "synthetic doctrine revision requires reassessment",
      "DISPUTED",
    );
    expect(unresolved.payload.status).toBe("OWNERSHIP_UNRESOLVED");

    const owned = new InvalidationCoordinator().record(
      doctrine.identity + "@" + doctrine.version,
      [candidate.identity + "@" + candidate.version, persona.identity + "@" + persona.version],
      "synthetic doctrine revision requires reassessment",
      "IDENTIFIED",
    );
    expect(owned.payload.status).toBe("SUSPENDED");
    expect(operative.payload.state).toBe("PACKAGED");
    expect(operative.payload.state).not.toBe("ACTIVATION_PENDING");
    expect(operative.payload.state).not.toBe("DEPLOYED");
  });
});
