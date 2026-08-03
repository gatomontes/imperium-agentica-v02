import { describe, expect, it } from "vitest";
import { CastellanMissionFormation } from "../src/castellan-mission-formation.js";
import { CastellanGuildhallRouter, GuildhallMissionCommittee } from "../src/guildhall-mission-committee.js";
import { IsoldeSecretariatOfficer } from "../src/isolde-secretariat-officer.js";
import { ADMITTED_GUILDMASTER_AGENT } from "../src/guildmaster-agent-definition.js";

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

  it("adjudicates the brainstorm into an ordered queue while separating capabilities and tools", () => {
    const mission = candidate();
    const handoff = new CastellanGuildhallRouter().handoff(mission);
    const committee = new GuildhallMissionCommittee();
    const recommendation = committee.recordBrainstorm(mission, handoff, {
      possibilities: [
        { professionIdentity: "YouTube Comment Researcher", contribution: "collect comments", rationale: "source collection", collaborationMode: "INDEPENDENT", dependsOn: [] },
        { professionIdentity: "Qualitative Data Analyst", contribution: "rank themes", rationale: "thematic analysis", collaborationMode: "SEQUENTIAL", dependsOn: ["YouTube Comment Researcher"] },
        { professionIdentity: "Content Analyst", contribution: "categorize comments", rationale: "classification alternative", collaborationMode: "INDEPENDENT", dependsOn: [] },
      ], overlaps: ["Qualitative Data Analyst and Content Analyst overlap."], missingSpecialties: ["YouTube API expertise"],
    });
    const adjudicated = committee.adjudicate(mission, recommendation, {
      decisions: [
        { professionIdentity: "YouTube Comment Researcher", disposition: "ADMIT", rationale: "collection is distinct" },
        { professionIdentity: "Qualitative Data Analyst", disposition: "ADMIT", rationale: "analysis is required" },
        { professionIdentity: "Content Analyst", disposition: "CONSOLIDATE", targetProfessionIdentity: "Qualitative Data Analyst", rationale: "duplicates thematic analysis" },
      ],
      queue: [
        { position: 1, professionIdentity: "YouTube Comment Researcher", contribution: "collect comments", rationale: "source collection", collaborationMode: "INDEPENDENT", dependsOn: [] },
        { position: 2, professionIdentity: "Qualitative Data Analyst", contribution: "rank themes", rationale: "thematic analysis", collaborationMode: "SEQUENTIAL", dependsOn: ["YouTube Comment Researcher"] },
      ], capabilityRequirements: ["YouTube-comment sampling"], toolOrAccessRequirements: ["YouTube Data API access"],
    });
    expect(adjudicated.payload.queue.map((item) => item.professionIdentity)).toEqual(["YouTube Comment Researcher", "Qualitative Data Analyst"]);
    expect(adjudicated.payload.decisions[2]).toMatchObject({ disposition: "CONSOLIDATE", targetProfessionIdentity: "Qualitative Data Analyst" });
    expect(adjudicated.payload.toolOrAccessRequirements).toEqual(["YouTube Data API access"]);
    expect(adjudicated.producer).toBe("Guildmaster");
    expect(adjudicated.payload).toMatchObject({ finding: "PROFESSION_QUEUE_RECOMMENDED", peopleSelected: false, operativesSelected: false, officersSelected: false, suitabilityDetermined: true, guildmasterAgentDefinitionRef: `${ADMITTED_GUILDMASTER_AGENT.identity}@${ADMITTED_GUILDMASTER_AGENT.version}` });
    expect(adjudicated.sourceRefs).toContain(`${ADMITTED_GUILDMASTER_AGENT.identity}@${ADMITTED_GUILDMASTER_AGENT.version}`);
  });

  it("refuses adjudication that drops a possibility or targets a nonqueued profession", () => {
    const mission = candidate();
    const handoff = new CastellanGuildhallRouter().handoff(mission);
    const committee = new GuildhallMissionCommittee();
    const recommendation = committee.recordBrainstorm(mission, handoff, { possibilities: [
      { professionIdentity: "Researcher", contribution: "collect", rationale: "needed", collaborationMode: "INDEPENDENT", dependsOn: [] },
      { professionIdentity: "Analyst", contribution: "analyze", rationale: "needed", collaborationMode: "INDEPENDENT", dependsOn: [] },
    ], overlaps: [], missingSpecialties: [] });
    expect(() => committee.adjudicate(mission, recommendation, {
      decisions: [{ professionIdentity: "Researcher", disposition: "ADMIT", rationale: "needed" }],
      queue: [{ position: 1, professionIdentity: "Researcher", contribution: "collect", rationale: "needed", collaborationMode: "INDEPENDENT", dependsOn: [] }], capabilityRequirements: [], toolOrAccessRequirements: [],
    })).toThrow("exactly one decision");
    expect(() => committee.adjudicate(mission, recommendation, {
      decisions: [
        { professionIdentity: "Researcher", disposition: "ADMIT", rationale: "needed" },
        { professionIdentity: "Analyst", disposition: "CONSOLIDATE", targetProfessionIdentity: "Statistician", rationale: "overlap" },
      ],
      queue: [{ position: 1, professionIdentity: "Researcher", contribution: "collect", rationale: "needed", collaborationMode: "INDEPENDENT", dependsOn: [] }], capabilityRequirements: [], toolOrAccessRequirements: [],
    })).toThrow("different queued profession");
  });
});
