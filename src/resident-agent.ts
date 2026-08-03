import { createHash } from "node:crypto";
import { ArtifactContext, ArtifactEnvelope, createArtifact } from "./artifact.js";
import { OfficeDoctrineProfile } from "./office-doctrine-profile.js";
import { ResidentOfficerContract as ResidentOfficerContractPayload } from "./resident-officer-contract.js";
import { assertArtifactEnvelope } from "./schema.js";

export interface BasePersona {
  personaId: string;
  displayName: string;
  release: string;
  status: "PROVISIONAL" | "ADMITTED";
  purpose: string;
  reasoningStyle: string[];
  communicationStyle: string[];
  behavioralTraits: string[];
  interactionRules: string[];
  revisionConditions: string[];
}

export interface ResidentAgentDefinition {
  agentId: string;
  displayName: string;
  kind: "RESIDENT_AGENT";
  servesOffice: string;
  officeProfileRef: string;
  residentOfficerContractRef: string;
  personaRef: string;
  personaRelease: string;
  personaDigest: string;
  capabilities: string[];
  prohibitions: string[];
  cognitiveProviderSelectedBy: "Locksmith";
  state: "CANDIDATE" | "ADMITTED";
}

export class ResidentAgentContract {
  admitPersona(persona: ArtifactEnvelope<BasePersona>): ArtifactEnvelope<BasePersona> {
    assertArtifactEnvelope(persona);
    if (persona.artifactType !== "BasePersona" || persona.status !== "CURRENT" || persona.payload.status !== "PROVISIONAL") throw new Error("exact provisional Base Persona is required");
    assertComplete(persona.payload.reasoningStyle, persona.payload.communicationStyle, persona.payload.behavioralTraits, persona.payload.interactionRules, persona.payload.revisionConditions);
    return { ...persona, version: persona.version + 1, supersedes: ref(persona), payload: { ...persona.payload, status: "ADMITTED" } };
  }

  define(persona: ArtifactEnvelope<BasePersona>, officer: ArtifactEnvelope<ResidentOfficerContractPayload>, office: ArtifactEnvelope<OfficeDoctrineProfile>, draft: Omit<ResidentAgentDefinition, "officeProfileRef" | "residentOfficerContractRef" | "personaRef" | "personaRelease" | "personaDigest" | "state">, correlationId: string, context: ArtifactContext = {}): ArtifactEnvelope<ResidentAgentDefinition> {
    assertArtifactEnvelope(persona); assertArtifactEnvelope(officer); assertArtifactEnvelope(office);
    if (persona.artifactType !== "BasePersona" || persona.status !== "CURRENT" || persona.payload.status !== "ADMITTED") throw new Error("exact admitted Base Persona is required");
    if (office.artifactType !== "OfficeDoctrineProfile" || office.status !== "CURRENT" || office.payload.state !== "ADMITTED" || office.payload.officeId !== draft.servesOffice) throw new Error("exact admitted matching Office Profile is required");
    if (officer.artifactType !== "ResidentOfficerContract" || officer.status !== "CURRENT" || officer.payload.state !== "ADMITTED" || officer.payload.officeId !== draft.servesOffice || officer.payload.officeProfileRef !== ref(office)) throw new Error("exact admitted matching Resident Officer Contract is required");
    if (officer.payload.officerId !== draft.agentId) throw new Error("resident Agent identity must match its Resident Officer Contract");
    if (draft.agentId !== persona.payload.personaId) throw new Error("resident Agent identity must match its Base Persona");
    assertComplete(draft.capabilities, draft.prohibitions);
    const officeProfileRef = ref(office); const residentOfficerContractRef = ref(officer); const personaRef = ref(persona);
    return createArtifact("ResidentAgentDefinition", draft.servesOffice, correlationId, { ...draft, officeProfileRef, residentOfficerContractRef, personaRef, personaRelease: persona.payload.release, personaDigest: digestPersona(persona), state: "CANDIDATE" }, [personaRef, residentOfficerContractRef, officeProfileRef], context);
  }

  admit(definition: ArtifactEnvelope<ResidentAgentDefinition>, persona: ArtifactEnvelope<BasePersona>, officer: ArtifactEnvelope<ResidentOfficerContractPayload>, office: ArtifactEnvelope<OfficeDoctrineProfile>): ArtifactEnvelope<ResidentAgentDefinition> {
    assertArtifactEnvelope(definition); assertArtifactEnvelope(persona); assertArtifactEnvelope(officer); assertArtifactEnvelope(office);
    if (definition.artifactType !== "ResidentAgentDefinition" || definition.status !== "CURRENT" || definition.payload.state !== "CANDIDATE") throw new Error("exact candidate resident Agent definition is required");
    if (definition.payload.personaRef !== ref(persona) || definition.payload.personaRelease !== persona.payload.release || definition.payload.personaDigest !== digestPersona(persona)) throw new Error("resident Agent definition does not pin the exact Base Persona version and digest");
    if (officer.artifactType !== "ResidentOfficerContract" || officer.status !== "CURRENT" || officer.payload.state !== "ADMITTED" || definition.payload.residentOfficerContractRef !== ref(officer) || officer.payload.officerId !== definition.payload.agentId || officer.payload.officeProfileRef !== definition.payload.officeProfileRef) throw new Error("resident Agent definition does not pin the exact matching Resident Officer Contract");
    if (definition.payload.officeProfileRef !== ref(office) || definition.payload.servesOffice !== office.payload.officeId) throw new Error("resident Agent definition does not bind the exact Office Profile");
    return { ...definition, version: definition.version + 1, supersedes: ref(definition), payload: { ...definition.payload, state: "ADMITTED" } };
  }

  assertAssembly(definition: ArtifactEnvelope<ResidentAgentDefinition>, persona: ArtifactEnvelope<BasePersona>, officer: ArtifactEnvelope<ResidentOfficerContractPayload>, office: ArtifactEnvelope<OfficeDoctrineProfile>): void {
    if (definition.payload.state !== "ADMITTED") throw new Error("admitted resident Agent definition is required");
    if (definition.payload.personaRef !== ref(persona) || definition.payload.personaRelease !== persona.payload.release || definition.payload.personaDigest !== digestPersona(persona)) throw new Error("resident Agent Base Persona pin is invalid");
    if (definition.payload.residentOfficerContractRef !== ref(officer) || officer.artifactType !== "ResidentOfficerContract" || officer.status !== "CURRENT" || officer.payload.state !== "ADMITTED" || officer.payload.officerId !== definition.payload.agentId || officer.payload.officeProfileRef !== definition.payload.officeProfileRef) throw new Error("resident Agent Resident Officer Contract pin is invalid");
    if (definition.payload.officeProfileRef !== ref(office) || definition.payload.servesOffice !== office.payload.officeId) throw new Error("resident Agent Office binding is invalid");
  }
}

export function digestPersona(persona: ArtifactEnvelope<BasePersona>): string {
  return "sha256:" + createHash("sha256").update(canonical(persona.payload)).digest("hex");
}

function canonical(value: unknown): string {
  if (Array.isArray(value)) return "[" + value.map(canonical).join(",") + "]";
  if (value && typeof value === "object") return "{" + Object.entries(value as Record<string, unknown>).sort(([a], [b]) => a.localeCompare(b)).map(([key, item]) => JSON.stringify(key) + ":" + canonical(item)).join(",") + "}";
  return JSON.stringify(value);
}
function assertComplete(...lists: string[][]): void { if (lists.some((list) => !list.length || list.some((item) => !item.trim()))) throw new Error("complete nonblank resident Agent contract lists are required"); }
function ref(value: { identity: string; version: number }): string { return value.identity + "@" + value.version; }
