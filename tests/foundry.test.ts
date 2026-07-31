import { describe, expect, it } from "vitest";
import { Castellan } from "../src/castellan.js";
import { Foundry } from "../src/foundry.js";
import { Guildhall } from "../src/guildhall.js";
import { Secretariat } from "../src/secretariat.js";
import { Pit } from "../src/pit.js";
import { Garrison } from "../src/garrison.js";
import { Studium } from "../src/studium.js";

function profession() {
  const petition = new Secretariat().receive({
    content: "Research the applicable professional pattern.",
    sessionReference: "opaque-session-foundry",
  });
  const work = new Castellan().receivePetition(petition)!;
  return new Guildhall().resolve(work, {
    professionIdentity: "research analyst",
    requiredCompetence: ["source evaluation"],
    practiceBoundaries: ["no unsupported conclusions"],
    suitabilityCriteria: ["evidence discipline"],
  });
}

describe("Foundry input validator", () => {
  it("accepts a complete exact input set", () => {
    const result = new Foundry().integrate({
      profession: profession(),
      doctrineRef: "pgd-synthetic-001@1",
      canonRefs: ["canon-synthetic-001@1"],
      provenanceComplete: true,
    });

    expect(result.payload.finding).toBe("PERSONA_INPUTS_UNRESOLVED");
    expect(result.payload.unresolvedInputs).toEqual(["doctrine evidence"]);
  });

  it("blocks incomplete inputs without silent repair", () => {
    const result = new Foundry().integrate({
      profession: profession(),
      provenanceComplete: false,
    });

    expect(result.payload.finding).toBe("PERSONA_INPUTS_UNRESOLVED");
    expect(result.payload.unresolvedInputs).toEqual(["doctrine", "provenance"]);
  });

  it("preserves a conformant queue assignment into the candidate", () => {
    const professionArtifact = profession();
    professionArtifact.payload.professionQueueRef = "professionqueue-001@1";
    professionArtifact.payload.queuePosition = 1;
    const result = new Foundry().integrate({ profession: professionArtifact, provenanceComplete: false });
    expect(result.payload.professionQueueRef).toBe("professionqueue-001@1");
    expect(result.payload.queuePosition).toBe(1);
  });

  it("preserves the queue assignment through Pit", () => {
    const professionArtifact = profession();
    professionArtifact.payload.professionQueueRef = "professionqueue-001@1";
    professionArtifact.payload.queuePosition = 1;
    const candidate = new Foundry().integrate({
      profession: professionArtifact,
      provenanceComplete: true,
      doctrineRef: "pgd-synthetic-001@1",
      doctrine: undefined,
    });
    const result = new Pit().test(candidate, ["source conflict"]);
    expect(result.payload.professionQueueRef).toBe("professionqueue-001@1");
    expect(result.payload.queuePosition).toBe(1);
    expect(result.payload.finding).toBe("PERSONA_TEST_UNRESOLVED");
  });

  it("rejects a candidate with an incomplete queue assignment", () => {
    const professionArtifact = profession();
    professionArtifact.payload.professionQueueRef = "professionqueue-001@1";
    const candidate = new Foundry().integrate({ profession: professionArtifact, provenanceComplete: true });
    const result = new Pit().test(candidate, ["source conflict"]);
    expect(result.payload.failures).toContain("profession queue assignment is unresolved");
  });

  it("carries a conformant queue assignment through Garrison", () => {
    const professionArtifact = profession();
    professionArtifact.payload.professionQueueRef = "professionqueue-001@1";
    professionArtifact.payload.queuePosition = 1;
    const doctrine = new Studium().authorPersonaDoctrine({
      profession: professionArtifact,
      mandatoryConduct: ["cite sources"],
      prohibitedConduct: ["invent evidence"],
      evidenceDuties: ["state uncertainty"],
      refusalConditions: ["missing evidence"],
      escalationTriggers: ["material conflict"],
      stopConditions: ["unsafe continuation"],
    });
    const candidate = new Foundry().integrate({
      profession: professionArtifact,
      provenanceComplete: true,
      doctrineRef: doctrine.identity + "@" + doctrine.version,
      doctrine,
      canonRefs: ["canon-synthetic-001@1"],
    });
    const pit = new Pit().test(candidate, ["source conflict"]);
    const disposition = new Guildhall().dispose(candidate, pit, "ADMIT");
    const persona = new Garrison().admit(candidate, pit, disposition);
    expect(persona.payload.finding).toBe("CANONICAL_PERSONA_ADMITTED");
    expect(persona.payload.professionQueueRef).toBe("professionqueue-001@1");
    expect(persona.payload.queuePosition).toBe(1);

    pit.payload.queuePosition = 2;
    const mismatch = new Garrison().admit(candidate, pit, disposition);
    expect(mismatch.payload.finding).toBe("CANONICAL_PERSONA_ADMISSION_UNRESOLVED");
  });
});
