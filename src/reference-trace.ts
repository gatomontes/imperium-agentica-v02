import { Castellan } from "./castellan.js";
import { Conscription } from "./conscription.js";
import { Foundry } from "./foundry.js";
import { Garrison } from "./garrison.js";
import { Guildhall } from "./guildhall.js";
import { Hagiography } from "./hagiography.js";
import { Pit } from "./pit.js";
import { Secretariat } from "./secretariat.js";
import { Studium } from "./studium.js";

export class ReferenceCreationTrace {
  run() {
    const petition = new Secretariat().receive({
      content: "Research the applicable professional pattern.",
      sessionReference: "opaque-reference-trace-session",
    });
    const work = new Castellan().receivePetition(petition);
    if (!work) throw new Error("Work Specification was not produced");

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
      correlationId: petition.correlationId,
      syntheticSource: true,
      sourceRef: "synthetic-saint-trace@1",
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
      doctrine,
      canons: [canon],
      canonRefs: [canon.identity + "@" + canon.version],
      provenanceComplete: true,
    });
    const pit = new Pit().test(candidate, ["conflicting evidence"]);
    const disposition = new Guildhall().dispose(candidate, pit, "ADMIT");
    const persona = new Garrison().admit(candidate, pit, disposition);
    const operative = new Conscription().package(persona, "node-reference", "A2");

    return { petition, work, profession, doctrine, canon, candidate, pit, persona, operative };
  }
}
