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

function chain() {
  const petition = new Secretariat().receive({
    content: "Research the applicable professional pattern.",
    sessionReference: "opaque-session-chain",
  });
  const work = new Castellan().receivePetition(petition)!;
  const profession = new Guildhall().resolve(work, {
    professionIdentity: "research analyst",
    requiredCompetence: ["source evaluation"],
    practiceBoundaries: ["no unsupported conclusions"],
    suitabilityCriteria: ["evidence discipline"],
  });
  const doctrine = new Studium().authorPersonaDoctrine({
    profession,
    mandatoryConduct: ["cite evidence"],
    prohibitedConduct: ["invent evidence"],
    evidenceDuties: ["state uncertainty"],
    refusalConditions: ["missing evidence"],
    escalationTriggers: ["material contradiction"],
    stopConditions: ["unsafe continuation"],
  });
  const canon = new Hagiography().canonize({
    syntheticSource: true,
    sourceRef: "synthetic-saint-001@1",
    performanceEvidence: "Compared conflicting reports.",
    observedBehavior: "Checked sources before deciding.",
    boundedTrait: "evidence-first comparison",
    conditions: ["when sources conflict"],
    limits: ["not sufficient alone"],
    counterweights: ["seek corroboration"],
    ec01Disposition: "ADMISSIBLE FOR CANON REVIEW",
  });
  const candidate = new Foundry().integrate({
    profession,
    doctrineRef: doctrine.identity + "@" + doctrine.version,
    canonRefs: [canon.identity + "@" + canon.version],
    provenanceComplete: true,
  });
  const pit = new Pit().test(candidate, ["missing evidence", "conflicting evidence"]);
  const persona = new Garrison().admit(candidate, pit);
  const operative = new Conscription().package(persona, "node-reference");

  return { work, profession, doctrine, canon, candidate, pit, persona, operative };
}

describe("synthetic creation chain", () => {
  it("preserves the chain through inactive Operative packaging", () => {
    const result = chain();
    expect(result.persona.payload.finding).toBe("CANONICAL_PERSONA_ADMITTED");
    expect(result.operative.payload.finding).toBe("OPERATIVE_PACKAGE_CONFORMANT");
    expect(result.operative.payload.medium).toBe("node-reference");
  });

  it("blocks packaging when the medium is absent", () => {
    const result = chain();
    const blocked = new Conscription().package(result.persona, " ");
    expect(blocked.payload.finding).toBe("OPERATIVE_PACKAGE_UNRESOLVED");
  });
});
