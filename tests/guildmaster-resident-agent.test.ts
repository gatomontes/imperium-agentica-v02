import { describe, expect, it } from "vitest";
import { ADMITTED_GUILDHALL_PROFILE } from "../src/guildhall-doctrine-profile.js";
import { ADMITTED_GUILDMASTER_AGENT, guildmasterAdjudicationInstructions } from "../src/guildmaster-agent-definition.js";
import { ADMITTED_GUILDMASTER_BASE_PERSONA } from "../src/guildmaster-base-persona.js";
import { ADMITTED_GUILDMASTER } from "../src/guildmaster-resident-officer-contract.js";
import { ResidentAgentContract, digestPersona } from "../src/resident-agent.js";

describe("Guildmaster resident Agent", () => {
  it("pins the exact Persona, Resident Officer Contract, and Guildhall profile", () => {
    expect(ADMITTED_GUILDMASTER_AGENT.payload).toMatchObject({
      state: "ADMITTED", servesOffice: "Guildhall",
      personaRef: `${ADMITTED_GUILDMASTER_BASE_PERSONA.identity}@${ADMITTED_GUILDMASTER_BASE_PERSONA.version}`,
      personaDigest: digestPersona(ADMITTED_GUILDMASTER_BASE_PERSONA),
      residentOfficerContractRef: `${ADMITTED_GUILDMASTER.identity}@${ADMITTED_GUILDMASTER.version}`,
      officeProfileRef: `${ADMITTED_GUILDHALL_PROFILE.identity}@${ADMITTED_GUILDHALL_PROFILE.version}`,
    });
    expect(() => new ResidentAgentContract().assertAssembly(ADMITTED_GUILDMASTER_AGENT, ADMITTED_GUILDMASTER_BASE_PERSONA, ADMITTED_GUILDMASTER, ADMITTED_GUILDHALL_PROFILE)).not.toThrow();
  });

  it("owns professional suitability without inheriting Castellan or execution authority", () => {
    expect(ADMITTED_GUILDMASTER_AGENT.payload.capabilities).toContain("determine_profession_suitability");
    expect(ADMITTED_GUILDMASTER_AGENT.payload.prohibitions).toEqual(expect.arrayContaining(["alter_mission_intent", "select_people_personas_operatives_or_officers", "plan_or_execute_mission", "access_credentials"]));
    const instructions = guildmasterAdjudicationInstructions();
    expect(instructions).toContain("Own the final professional-suitability determination as Guildmaster.");
    expect(instructions).toContain("Do not defer professional judgment to Castellan or Rector.");
  });
});
