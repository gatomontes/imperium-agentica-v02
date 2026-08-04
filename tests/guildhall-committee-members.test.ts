import { describe, expect, it } from "vitest";
import { ADMITTED_GUILDHALL_PROFILE } from "../src/guildhall-doctrine-profile.js";
import { ADMITTED_GUILDHALL_COMMITTEE_MEMBERS, guildhallCommitteeMemberInstructions } from "../src/guildhall-committee-members.js";
import { ResidentAgentContract } from "../src/resident-agent.js";

describe("governed Guildhall committee members", () => {
  it("admits three distinct, exactly pinned resident members", () => {
    expect(ADMITTED_GUILDHALL_COMMITTEE_MEMBERS.map((member) => member.seatId)).toEqual(["disciplinary-fit", "composition", "boundary-challenge"]);
    expect(new Set(ADMITTED_GUILDHALL_COMMITTEE_MEMBERS.map((member) => member.agent.identity)).size).toBe(3);
    for (const member of ADMITTED_GUILDHALL_COMMITTEE_MEMBERS) {
      expect(() => new ResidentAgentContract().assertAssembly(member.agent, member.persona, member.officer, ADMITTED_GUILDHALL_PROFILE)).not.toThrow();
      expect(member.agent.payload).toMatchObject({ state: "ADMITTED", servesOffice: "Guildhall", cognitiveProviderSelectedBy: "Locksmith" });
      expect(member.agent.payload.prohibitions).toContain("determine_profession_suitability");
      expect(member.agent.sourceRefs).toEqual(expect.arrayContaining([member.agent.payload.personaRef, member.agent.payload.residentOfficerContractRef, member.agent.payload.officeProfileRef]));
    }
  });

  it("generates seat-specific instructions without granting Guildmaster authority", () => {
    const instructions = ADMITTED_GUILDHALL_COMMITTEE_MEMBERS.map((member) => guildhallCommitteeMemberInstructions(member.seatId));
    expect(new Set(instructions).size).toBe(3);
    for (const text of instructions) {
      expect(text).toContain("Recommend possibilities; do not admit, reject, order, or determine suitability.");
      expect(text).toContain("Do not impersonate another committee member or Guildmaster.");
    }
  });
});
