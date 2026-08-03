import { describe, expect, it } from "vitest";
import { ADMITTED_CASTELLAN_PROFILE } from "../src/castellan-doctrine-profile.js";
import { ADMITTED_RECTOR_AGENT, RECTOR_AGENT_CANDIDATE, rectorAssessmentInstructions } from "../src/rector-agent-definition.js";
import { ADMITTED_RECTOR_BASE_PERSONA, RECTOR_BASE_PERSONA_CANDIDATE } from "../src/rector-base-persona.js";
import { ADMITTED_RECTOR } from "../src/rector-resident-officer-contract.js";
import { ResidentAgentContract, digestPersona } from "../src/resident-agent.js";

describe("Rector Base Persona and resident Agent definition", () => {
  it("keeps analytical behavior separate from Castellan authority", () => {
    expect(ADMITTED_RECTOR_BASE_PERSONA.payload).toMatchObject({ personaId: "rector", release: "0.1.0", status: "ADMITTED" });
    expect(JSON.stringify(ADMITTED_RECTOR_BASE_PERSONA.payload)).not.toMatch(/assess_active_mission_predicate|create_authority|Castellan Office Profile/);
  });

  it("pins the exact Persona, Resident Officer Contract, and Castellan Profile", () => {
    expect(ADMITTED_RECTOR_AGENT).toMatchObject({ producer: "Castellan", payload: {
      state: "ADMITTED",
      personaRef: `${ADMITTED_RECTOR_BASE_PERSONA.identity}@${ADMITTED_RECTOR_BASE_PERSONA.version}`,
      personaRelease: "0.1.0",
      personaDigest: digestPersona(ADMITTED_RECTOR_BASE_PERSONA),
      officeProfileRef: `${ADMITTED_CASTELLAN_PROFILE.identity}@${ADMITTED_CASTELLAN_PROFILE.version}`,
      residentOfficerContractRef: `${ADMITTED_RECTOR.identity}@${ADMITTED_RECTOR.version}`,
      cognitiveProviderSelectedBy: "Locksmith",
    }});
  });

  it("keeps capabilities and prohibitions in the Agent definition", () => {
    expect(ADMITTED_RECTOR_AGENT.payload.capabilities).toContain("assess_active_mission_predicate");
    expect(ADMITTED_RECTOR_AGENT.payload.prohibitions).toContain("accept_reject_or_requery");
    expect(ADMITTED_RECTOR_AGENT.payload.prohibitions).toContain("judge_guildhall_professions");
  });

  it("refuses silent Persona or contract drift", () => {
    const changedPersona = { ...ADMITTED_RECTOR_BASE_PERSONA, version: 3, payload: { ...ADMITTED_RECTOR_BASE_PERSONA.payload, release: "0.2.0" } };
    expect(() => new ResidentAgentContract().assertAssembly(ADMITTED_RECTOR_AGENT, changedPersona, ADMITTED_RECTOR, ADMITTED_CASTELLAN_PROFILE)).toThrow("Base Persona pin is invalid");
    expect(() => new ResidentAgentContract().assertAssembly({ ...ADMITTED_RECTOR_AGENT, payload: { ...ADMITTED_RECTOR_AGENT.payload, residentOfficerContractRef: "other@1" } }, ADMITTED_RECTOR_BASE_PERSONA, ADMITTED_RECTOR, ADMITTED_CASTELLAN_PROFILE)).toThrow("Resident Officer Contract pin is invalid");
  });

  it("builds provider instructions from the admitted Persona without granting authority", () => {
    const instructions = rectorAssessmentInstructions();
    expect(instructions).toContain("Evaluate only the active mission-formation question");
    expect(instructions).toContain("Do not accept, reject, requery, or approve");
    expect(instructions).toContain("Castellan owns every mission-formation disposition");
  });

  it("retains candidate-to-admitted version lineage", () => {
    expect(ADMITTED_RECTOR_BASE_PERSONA.supersedes).toBe(`${RECTOR_BASE_PERSONA_CANDIDATE.identity}@1`);
    expect(ADMITTED_RECTOR_AGENT.supersedes).toBe(`${RECTOR_AGENT_CANDIDATE.identity}@1`);
  });
});
