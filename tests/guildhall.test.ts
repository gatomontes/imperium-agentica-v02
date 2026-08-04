import { describe, expect, it } from "vitest";
import { Castellan } from "../src/castellan.js";
import { Guildhall } from "../src/guildhall.js";
import { ADMITTED_GUILDMASTER_AGENT } from "../src/guildmaster-agent-definition.js";
import { Secretariat } from "../src/secretariat.js";

function workSpecification() {
  const petition = new Secretariat().receive({
    content: "Research the applicable professional pattern.",
    sessionReference: "opaque-session-guildhall",
  });
  return new Castellan().receivePetition(petition)!;
}

describe("Guildhall reference resolver", () => {
  it("queues task-driven professional work without multi-persona coordination", () => {
    const queue = new Guildhall().queue(workSpecification(), [
      { position: 1, professionIdentity: "Music Virality Researcher", taskCluster: "research audience reach", rationale: "distribution insight" },
      { position: 2, professionIdentity: "Gothic Metal Producer", taskCluster: "shape the song", rationale: "genre and production coherence" },
      { position: 3, professionIdentity: "Lyricist", taskCluster: "write lyrics", rationale: "lyrics follow the musical direction" },
      { position: 4, professionIdentity: "Chorus Specialist", taskCluster: "strengthen the chorus", rationale: "chorus refinement follows lyric material" },
    ]);
    expect(queue.payload.finding).toBe("QUEUE_CONFORMANT");
    expect(queue.payload.items).toHaveLength(4);
    expect(queue.payload.items.map((item) => item.position)).toEqual([1, 2, 3, 4]);
  });

  it("rejects a queue with missing or non-sequential positions", () => {
    const queue = new Guildhall().queue(workSpecification(), [
      { position: 2, professionIdentity: "Lyricist", taskCluster: "write lyrics", rationale: "missing first station" },
    ]);
    expect(queue.payload.finding).toBe("QUEUE_UNRESOLVED");
  });

  it("hands the first queue assignment into the single-profession path", () => {
    const work = workSpecification();
    const queue = new Guildhall().queue(work, [
      { position: 1, professionIdentity: "Lyricist", taskCluster: "write lyrics", rationale: "lyrics" },
      { position: 2, professionIdentity: "Chorus Specialist", taskCluster: "refine chorus", rationale: "chorus follows lyrics" },
    ]);
    const profession = new Guildhall().resolveQueueItem(work, queue, 1, {
      requiredCompetence: ["drafting"],
      practiceBoundaries: ["no unsupported claims"],
      suitabilityCriteria: ["clarity"],
    });

    expect(profession.payload.finding).toBe("PROFESSION_CONFORMANT");
    expect(profession.payload.professionIdentity).toBe("Lyricist");
    expect(profession.payload.queuePosition).toBe(1);
    expect(profession.payload.professionQueueRef).toBe(queue.identity + "@" + queue.version);
    expect(profession.sourceRefs).toContain(queue.identity + "@" + queue.version);
  });

  it("does not skip ahead in the profession queue", () => {
    const work = workSpecification();
    const queue = new Guildhall().queue(work, [
      { position: 1, professionIdentity: "Lyricist", taskCluster: "write lyrics", rationale: "lyrics" },
      { position: 2, professionIdentity: "Chorus Specialist", taskCluster: "refine chorus", rationale: "chorus follows lyrics" },
    ]);
    const profession = new Guildhall().resolveQueueItem(work, queue, 2, {
      requiredCompetence: ["drafting"],
      practiceBoundaries: ["no unsupported claims"],
      suitabilityCriteria: ["clarity"],
    });

    expect(profession.payload.finding).toBe("PROFESSION_UNRESOLVED");
  });

  it("advances the same packet to the next queue item through the prior specification", () => {
    const work = workSpecification();
    const queue = new Guildhall().queue(work, [
      { position: 1, professionIdentity: "Lyricist", taskCluster: "write lyrics", rationale: "lyrics" },
      { position: 2, professionIdentity: "Chorus Specialist", taskCluster: "refine chorus", rationale: "chorus follows lyrics" },
    ]);
    const guildhall = new Guildhall();
    const first = guildhall.resolveQueueItem(work, queue, 1, {
      requiredCompetence: ["drafting"], practiceBoundaries: ["no unsupported claims"], suitabilityCriteria: ["clarity"],
    });
    const second = guildhall.resolveQueueItem(work, queue, 2, {
      requiredCompetence: ["refrain analysis"], practiceBoundaries: ["preserve meaning"], suitabilityCriteria: ["memorability"],
    }, first);

    expect(second.payload.finding).toBe("PROFESSION_CONFORMANT");
    expect(second.payload.queuePosition).toBe(2);
    expect(second.payload.professionIdentity).toBe("Chorus Specialist");
    expect(second.sourceRefs).toContain(first.identity + "@" + first.version);
  });

  it("rejects a later queue item when the preceding specification is stale or mismatched", () => {
    const work = workSpecification();
    const queue = new Guildhall().queue(work, [
      { position: 1, professionIdentity: "Lyricist", taskCluster: "write lyrics", rationale: "lyrics" },
      { position: 2, professionIdentity: "Chorus Specialist", taskCluster: "refine chorus", rationale: "chorus follows lyrics" },
    ]);
    const stale = new Guildhall().resolve(work, {
      professionIdentity: "Other profession", requiredCompetence: ["x"], practiceBoundaries: ["y"], suitabilityCriteria: ["z"],
    });
    const second = new Guildhall().resolveQueueItem(work, queue, 2, {
      requiredCompetence: ["refrain analysis"], practiceBoundaries: ["preserve meaning"], suitabilityCriteria: ["memorability"],
    }, stale);

    expect(second.payload.finding).toBe("PROFESSION_UNRESOLVED");
  });

  it("produces a conformant Profession Specification", () => {
    const work = workSpecification();
    const profession = new Guildhall().resolve(work, {
      professionIdentity: "research analyst",
      requiredCompetence: ["source evaluation"],
      practiceBoundaries: ["no unsupported conclusions"],
      suitabilityCriteria: ["evidence discipline"],
    });

    expect(profession.payload.finding).toBe("PROFESSION_CONFORMANT");
    expect(profession.payload.workSpecificationRef).toBe(
      work.identity + "@" + work.version,
    );
    expect(profession.correlationId).toBe(work.correlationId);
  });

  it("blocks incomplete professional resolution", () => {
    const profession = new Guildhall().resolve(workSpecification(), {
      professionIdentity: "research analyst",
    });

    expect(profession.payload.finding).toBe("PROFESSION_UNRESOLVED");
  });

  it("admits a conformant Profession Specification only under Guildmaster authority", () => {
    const candidate = new Guildhall().resolve(workSpecification(), {
      professionIdentity: "research analyst", requiredCompetence: ["source evaluation"], practiceBoundaries: ["no unsupported conclusions"], suitabilityCriteria: ["evidence discipline"],
    });
    const guildmasterRef = `${ADMITTED_GUILDMASTER_AGENT.identity}@${ADMITTED_GUILDMASTER_AGENT.version}`;
    const admitted = new Guildhall().admitProfessionSpecification(candidate, guildmasterRef);
    expect(admitted.payload.admissionState).toBe("ADMITTED");
    expect(admitted.payload.admissionAuthorityRef).toBe(guildmasterRef);
    expect(admitted.supersedes).toBe(`${candidate.identity}@1`);
  });
});
