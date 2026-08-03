import { describe, expect, it } from "vitest";
import { ADMITTED_ISOLDE_AGENT, ISOLDE_AGENT_CANDIDATE, isoldeTransportInstructions } from "../src/isolde-agent-definition.js";
import { ADMITTED_ISOLDE_BASE_PERSONA, ISOLDE_BASE_PERSONA_CANDIDATE } from "../src/isolde-base-persona.js";
import { ADMITTED_ISOLDE } from "../src/isolde-resident-officer-contract.js";
import { ResidentAgentContract, digestPersona } from "../src/resident-agent.js";
import { ADMITTED_SECRETARIAT_PROFILE } from "../src/secretariat-doctrine-profile.js";

describe("Isolde Base Persona and resident Agent definition", () => {
  it("keeps behavior separate from Secretariat authority", () => {
    expect(ADMITTED_ISOLDE_BASE_PERSONA.payload).toMatchObject({ personaId: "isolde", release: "0.1.0", status: "ADMITTED" });
    expect(JSON.stringify(ADMITTED_ISOLDE_BASE_PERSONA.payload)).not.toMatch(/receive_operator_input|judge_relevance|Secretariat Office Profile/);
  });

  it("pins the exact Persona version, release, digest, and Office Profile", () => {
    expect(ADMITTED_ISOLDE_AGENT.payload).toMatchObject({
      state: "ADMITTED",
      personaRef: `${ADMITTED_ISOLDE_BASE_PERSONA.identity}@${ADMITTED_ISOLDE_BASE_PERSONA.version}`,
      personaRelease: "0.1.0",
      personaDigest: digestPersona(ADMITTED_ISOLDE_BASE_PERSONA),
      officeProfileRef: `${ADMITTED_SECRETARIAT_PROFILE.identity}@${ADMITTED_SECRETARIAT_PROFILE.version}`,
      residentOfficerContractRef: `${ADMITTED_ISOLDE.identity}@${ADMITTED_ISOLDE.version}`,
      cognitiveProviderSelectedBy: "Locksmith",
    });
  });

  it("keeps capabilities and prohibitions in the Agent definition", () => {
    expect(ADMITTED_ISOLDE_AGENT.payload.capabilities).toContain("explain_or_rephrase");
    expect(ADMITTED_ISOLDE_AGENT.payload.prohibitions).toContain("judge_relevance");
  });

  it("refuses silent Persona upgrades or digest drift", () => {
    const changedPersona = { ...ADMITTED_ISOLDE_BASE_PERSONA, version: 3, payload: { ...ADMITTED_ISOLDE_BASE_PERSONA.payload, release: "0.2.0", communicationStyle: [...ADMITTED_ISOLDE_BASE_PERSONA.payload.communicationStyle, "Use shorter questions."] } };
    expect(() => new ResidentAgentContract().assertAssembly(ADMITTED_ISOLDE_AGENT, changedPersona, ADMITTED_ISOLDE, ADMITTED_SECRETARIAT_PROFILE)).toThrow("Base Persona pin is invalid");
    expect(() => new ResidentAgentContract().admit({ ...ISOLDE_AGENT_CANDIDATE, payload: { ...ISOLDE_AGENT_CANDIDATE.payload, personaDigest: "sha256:wrong" } }, ADMITTED_ISOLDE_BASE_PERSONA, ADMITTED_ISOLDE, ADMITTED_SECRETARIAT_PROFILE)).toThrow("exact Base Persona version and digest");
    expect(() => new ResidentAgentContract().assertAssembly({ ...ADMITTED_ISOLDE_AGENT, payload: { ...ADMITTED_ISOLDE_AGENT.payload, residentOfficerContractRef: "other@1" } }, ADMITTED_ISOLDE_BASE_PERSONA, ADMITTED_ISOLDE, ADMITTED_SECRETARIAT_PROFILE)).toThrow("Resident Officer Contract pin is invalid");
  });

  it("builds provider instructions from the admitted Persona", () => {
    const instructions = isoldeTransportInstructions();
    expect(instructions).toContain("Ask only one question at a time.");
    expect(instructions).toContain("Explain unfamiliar or obscure wording when asked, then rephrase the question plainly.");
    expect(instructions).toContain("transport only the exact Castellan-provided question");
  });

  it("retains candidate-to-admitted version lineage", () => {
    expect(ADMITTED_ISOLDE_BASE_PERSONA.supersedes).toBe(`${ISOLDE_BASE_PERSONA_CANDIDATE.identity}@1`);
    expect(ADMITTED_ISOLDE_AGENT.supersedes).toBe(`${ISOLDE_AGENT_CANDIDATE.identity}@1`);
  });
});
