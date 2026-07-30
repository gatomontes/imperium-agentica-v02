import { describe, expect, it } from "vitest";
import { Castellan } from "../src/castellan.js";
import { Conscription } from "../src/conscription.js";
import { Foundry } from "../src/foundry.js";
import { Garrison } from "../src/garrison.js";
import { Guildhall } from "../src/guildhall.js";
import { Hagiography } from "../src/hagiography.js";
import { Pit } from "../src/pit.js";
import { Secretariat } from "../src/secretariat.js";
import { Studium } from "../src/studium.js";
import { ReferenceCreationTrace } from "../src/reference-trace.js";
import { InvalidationCoordinator } from "../src/invalidation.js";

describe("creation boundary closure", () => {
  it("refuses, returns, or withholds advancement at every creation boundary", () => {
    const secretariat = new Secretariat();
    const castellan = new Castellan();
    const petition = secretariat.receive({ content: "", sessionReference: "closure" });
    expect(petition.payload.finding).toBe("PETITION_UNRESOLVED");
    expect(castellan.receivePetition(petition)).toBeNull();

    const trace = new ReferenceCreationTrace().run();
    const guildhall = new Guildhall();
    const unresolvedProfession = guildhall.resolve(trace.work, {});
    expect(unresolvedProfession.payload.finding).toBe("PROFESSION_UNRESOLVED");

    const unresolvedDoctrine = new Studium().authorPersonaDoctrine({
      profession: unresolvedProfession,
    });
    expect(unresolvedDoctrine.payload.finding).toBe("DOCTRINE_UNRESOLVED");

    const unresolvedCanon = new Hagiography().canonize({ syntheticSource: true });
    expect(unresolvedCanon.payload.finding).toBe("TRAIT_CANON_UNRESOLVED");

    const unresolvedCandidate = new Foundry().integrate({
      profession: trace.profession,
      doctrineRef: trace.doctrine.identity + "@" + trace.doctrine.version,
      doctrine: unresolvedDoctrine,
      canons: [trace.canon],
      canonRefs: [trace.canon.identity + "@" + trace.canon.version],
      provenanceComplete: true,
    });
    expect(unresolvedCandidate.payload.finding).toBe("PERSONA_INPUTS_UNRESOLVED");

    const unresolvedPit = new Pit().test(unresolvedCandidate, ["lineage mismatch"]);
    expect(unresolvedPit.payload.finding).toBe("PERSONA_TEST_UNRESOLVED");

    const unresolvedDisposition = guildhall.dispose(unresolvedCandidate, unresolvedPit, "RECYCLE");
    const notAdmitted = new Garrison().admit(unresolvedCandidate, unresolvedPit, unresolvedDisposition);
    expect(notAdmitted.payload.status).toBe("NOT_ADMITTED");

    const unresolvedPackage = new Conscription().package(notAdmitted, "node-reference", "A2");
    expect(unresolvedPackage.payload.finding).toBe("OPERATIVE_PACKAGE_UNRESOLVED");
    expect(unresolvedPackage.payload.state).toBe("PACKAGED");
  });

  it("preserves escalation and stop obligations in a conformant doctrine without granting authority", () => {
    const trace = new ReferenceCreationTrace().run();
    expect(trace.doctrine.payload.escalationTriggers.length).toBeGreaterThan(0);
    expect(trace.doctrine.payload.stopConditions.length).toBeGreaterThan(0);
    expect(trace.operative.payload.autonomyClass).toBe("A2");
    expect(trace.operative.payload.state).toBe("PACKAGED");
  });

  it("preserves owner-attributed conflicts and requires an immutable successor after revision", () => {
    const trace = new ReferenceCreationTrace().run();
    const correlatedCanon = new Hagiography().canonize({
      correlationId: trace.profession.correlationId,
      ...trace.canon.payload,
      ec01Disposition: "ADMISSIBLE FOR CANON REVIEW",
    });
    const conflicted = new Foundry().integrate({
      profession: trace.profession,
      doctrineRef: trace.doctrine.identity + "@" + trace.doctrine.version,
      doctrine: trace.doctrine,
      canons: [correlatedCanon],
      canonRefs: [correlatedCanon.identity + "@" + correlatedCanon.version],
      provenanceComplete: true,
      inputConflicts: [{
        owner: "Studium",
        claims: ["escalate on contradiction", "continue on contradiction"],
      }],
    });
    expect(conflicted.payload.finding).toBe("PERSONA_INPUTS_REFUSED");
    expect(conflicted.payload.inputConflicts[0]).toEqual({
      owner: "Studium",
      claims: ["escalate on contradiction", "continue on contradiction"],
    });
    expect(new Pit().test(conflicted, ["conflict handling"])
      .payload.finding).toBe("PERSONA_TEST_UNRESOLVED");

    const invalidation = new InvalidationCoordinator().record(
      trace.doctrine.identity + "@" + trace.doctrine.version,
      [trace.candidate.identity + "@" + trace.candidate.version, trace.pit.identity + "@" + trace.pit.version],
      "material doctrine revision",
      "IDENTIFIED",
    );
    expect(invalidation.payload.status).toBe("SUSPENDED");
    expect(invalidation.payload.affectedRefs).toContain(trace.candidate.identity + "@" + trace.candidate.version);

    const successor = new Foundry().integrate({
      profession: trace.profession,
      doctrineRef: trace.doctrine.identity + "@" + trace.doctrine.version,
      doctrine: trace.doctrine,
      canons: [correlatedCanon],
      canonRefs: [correlatedCanon.identity + "@" + correlatedCanon.version],
      provenanceComplete: true,
    });
    expect(successor.identity).not.toBe(trace.candidate.identity);
    expect(successor.supersedes).toBeUndefined();
    expect(successor.payload.finding).toBe("PERSONA_INPUTS_CONFORMANT");
  });

  it("propagates an upstream invalidation through stale downstream artifacts before successor re-entry", () => {
    const trace = new ReferenceCreationTrace().run();
    const invalidation = new InvalidationCoordinator().record(
      trace.doctrine.identity + "@" + trace.doctrine.version,
      [
        trace.candidate.identity + "@" + trace.candidate.version,
        trace.pit.identity + "@" + trace.pit.version,
        trace.persona.identity + "@" + trace.persona.version,
        trace.operative.identity + "@" + trace.operative.version,
      ],
      "upstream doctrine withdrawal",
      "IDENTIFIED",
    );

    expect(invalidation.payload.status).toBe("SUSPENDED");
    expect(invalidation.payload.affectedRefs).toHaveLength(4);

    const staleCandidate = { ...trace.candidate, status: "SUPERSEDED" as const };
    const stalePit = { ...trace.pit, status: "SUPERSEDED" as const };
    const stalePersona = { ...trace.persona, status: "SUPERSEDED" as const };

    expect(new Pit().test(staleCandidate, ["retest after invalidation"]).payload.finding)
      .toBe("PERSONA_TEST_UNRESOLVED");
    const staleDisposition = new Guildhall().dispose(staleCandidate, stalePit, "ADMIT");
    const refusedPersona = new Garrison().admit(staleCandidate, stalePit, staleDisposition);
    expect(refusedPersona.payload.status).toBe("NOT_ADMITTED");
    expect(new Conscription().package(stalePersona, "node-reference", "A2")
      .payload.finding).toBe("OPERATIVE_PACKAGE_UNRESOLVED");

    const successor = new ReferenceCreationTrace().run();
    expect(successor.candidate.identity).not.toBe(trace.candidate.identity);
    expect(successor.persona.payload.status).toBe("ADMITTED");
    expect(successor.operative.payload.state).toBe("PACKAGED");
    expect(successor.operative.payload.finding).toBe("OPERATIVE_PACKAGE_CONFORMANT");

    const mismatchedDisposition = new Guildhall().dispose(successor.candidate, trace.pit, "ADMIT");
    const mismatchedPersona = new Garrison().admit(successor.candidate, trace.pit, mismatchedDisposition);
    expect(mismatchedPersona.payload.status).toBe("NOT_ADMITTED");
  });

  it("reconciles correlation and immediate lineage across the complete inactive chain", () => {
    const trace = new ReferenceCreationTrace().run();
    const correlation = trace.petition.correlationId;
    const artifacts = [trace.petition, trace.work, trace.profession, trace.doctrine, trace.canon, trace.candidate, trace.pit, trace.persona, trace.operative];

    for (const artifact of artifacts) expect(artifact.correlationId).toBe(correlation);
    expect(trace.work.sourceRefs).toContain(trace.petition.identity + "@" + trace.petition.version);
    expect(trace.profession.sourceRefs).toContain(trace.work.identity + "@" + trace.work.version);
    expect(trace.doctrine.sourceRefs).toContain(trace.profession.identity + "@" + trace.profession.version);
    expect(trace.candidate.sourceRefs).toEqual(expect.arrayContaining([
      trace.profession.identity + "@" + trace.profession.version,
      trace.doctrine.identity + "@" + trace.doctrine.version,
      trace.canon.identity + "@" + trace.canon.version,
    ]));
    expect(trace.pit.sourceRefs).toContain(trace.candidate.identity + "@" + trace.candidate.version);
    expect(trace.persona.sourceRefs).toEqual(expect.arrayContaining([
      trace.candidate.identity + "@" + trace.candidate.version,
      trace.pit.identity + "@" + trace.pit.version,
    ]));
    expect(trace.operative.sourceRefs).toContain(trace.persona.identity + "@" + trace.persona.version);
    expect(trace.operative.payload.state).toBe("PACKAGED");
    expect(trace.operative.payload.state).not.toBe("DEPLOYED");
  });
});
