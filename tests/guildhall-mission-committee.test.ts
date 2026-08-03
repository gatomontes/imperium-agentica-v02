import { describe, expect, it } from "vitest";
import { CastellanMissionFormation } from "../src/castellan-mission-formation.js";
import { CastellanGuildhallRouter, GuildhallMissionCommittee } from "../src/guildhall-mission-committee.js";
import { IsoldeSecretariatOfficer } from "../src/isolde-secretariat-officer.js";

function candidate() {
  const dossier = new IsoldeSecretariatOfficer().openMission("operator@1", "Research the top ten sadcore audience pain points from YouTube comments", "guildhall-mission-001");
  return new CastellanMissionFormation().evaluateGapDriven(dossier);
}

describe("Castellan to Guildhall profession brainstorming", () => {
  it("records several possible professions without selecting people, operatives, or Officers", () => {
    const mission = candidate();
    const handoff = new CastellanGuildhallRouter().handoff(mission);
    const packet = new GuildhallMissionCommittee().recordBrainstorm(mission, handoff, {
      possibilities: [
        { professionIdentity: "YouTube Comment Researcher", contribution: "collect relevant comments", rationale: "the requested evidence lives in YouTube comments", collaborationMode: "INDEPENDENT", dependsOn: [] },
        { professionIdentity: "Qualitative Data Analyst", contribution: "identify and rank recurring pain points", rationale: "the mission requires thematic synthesis and ranking", collaborationMode: "SEQUENTIAL", dependsOn: ["YouTube Comment Researcher"] },
        { professionIdentity: "Sadcore Audience Researcher", contribution: "interpret findings within the audience context", rationale: "genre-specific language can change meaning", collaborationMode: "TANDEM", dependsOn: ["Qualitative Data Analyst"] },
      ],
      overlaps: ["Audience research and qualitative analysis overlap in theme interpretation."],
      missingSpecialties: [],
    });
    expect(packet.payload.possibilities).toHaveLength(3);
    expect(packet.payload.finding).toBe("PROFESSION_POSSIBILITIES_RECORDED");
    expect(packet.payload).toMatchObject({ peopleSelected: false, operativesSelected: false, officersSelected: false });
    expect(packet.sourceRefs).toEqual([mission.identity + "@1", handoff.identity + "@1"]);
  });

  it("preserves alternatives instead of forcing a single profession", () => {
    const mission = candidate();
    const handoff = new CastellanGuildhallRouter().handoff(mission);
    const packet = new GuildhallMissionCommittee().recordBrainstorm(mission, handoff, {
      possibilities: [
        { professionIdentity: "Social Listening Analyst", contribution: "analyze audience language", rationale: "broad social-listening approach", collaborationMode: "INDEPENDENT", dependsOn: [] },
        { professionIdentity: "Qualitative Data Analyst", contribution: "perform thematic analysis", rationale: "research-analysis alternative", collaborationMode: "INDEPENDENT", dependsOn: [] },
      ], overlaps: ["Both can categorize recurring themes."], missingSpecialties: ["YouTube data-access specialist may be required during planning."],
    });
    expect(packet.payload.possibilities.map((item) => item.professionIdentity)).toEqual(["Social Listening Analyst", "Qualitative Data Analyst"]);
    expect(packet.payload.missingSpecialties).toHaveLength(1);
  });

  it("refuses malformed, duplicated, or out-of-order committee drafts", () => {
    const mission = candidate();
    const handoff = new CastellanGuildhallRouter().handoff(mission);
    expect(() => new GuildhallMissionCommittee().recordBrainstorm(mission, handoff, { possibilities: [], overlaps: [], missingSpecialties: [] })).toThrow("one to eight");
    expect(() => new GuildhallMissionCommittee().recordBrainstorm(mission, handoff, { possibilities: [
      { professionIdentity: "Analyst", contribution: "first", rationale: "first", collaborationMode: "INDEPENDENT", dependsOn: [] },
      { professionIdentity: "analyst", contribution: "second", rationale: "second", collaborationMode: "INDEPENDENT", dependsOn: [] },
    ], overlaps: [], missingSpecialties: [] })).toThrow("distinct");
    expect(() => new GuildhallMissionCommittee().recordBrainstorm(mission, handoff, { possibilities: [
      { professionIdentity: "Analyst", contribution: "analyze", rationale: "needed", collaborationMode: "SEQUENTIAL", dependsOn: ["Researcher"] },
    ], overlaps: [], missingSpecialties: [] })).toThrow("earlier profession");
  });
});
