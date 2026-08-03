import { describe, expect, it } from "vitest";
import { createArtifact } from "../src/artifact.js";
import { ADMITTED_COGNITIONIST_PROFILE, COGNITIONIST_PROFILE_ADMISSION_DECISION, COGNITIONIST_PROFILE_CANDIDATE } from "../src/cognitionist-doctrine-profile.js";
import { AdapterAdmissionDecision, Cognitionist, createCognitivePort, createConnectionRequest } from "../src/cognitionist.js";
import { ENACTED_CORE_DOCTRINE_V6 } from "../src/enacted-core-doctrine-v6.js";
import { ENACTED_IMPERIUM_LEXICON_V4 } from "../src/imperium-lexicon-v4.js";
import { ADMITTED_ISOLDE } from "../src/isolde-resident-officer-contract.js";
import { ADMITTED_SECRETARIAT_PROFILE } from "../src/secretariat-doctrine-profile.js";

const context = { identityFactory: (prefix: string) => prefix + "-cognitionist-test", now: () => "2026-08-03T04:00:00.000Z" };
const ref = (value: { identity: string; version: number }) => value.identity + "@" + value.version;
const cognitionist = new Cognitionist();
const port = createCognitivePort({ portId: "isolde.intent.v1", operations: ["interpret_intent"], inputSchemaRefs: ["schema:intent@1"], outputSchemaRefs: ["schema:interpretation@1"], failureModes: ["UNSUPPORTED_INTERPRETATION"], evidenceRequirements: ["source_excerpt"] }, "Secretariat", "cognitionist-flow", ref(ADMITTED_SECRETARIAT_PROFILE), context);
const adapterDraft = { providerRef: "provider:example@1", modelRef: "model:example@1", adapterVersion: "1.0.0", supportedOperations: ["interpret_intent"], structuredOutput: true, configurationSchemaRef: "schema:adapter-config@1", failureModes: ["PROVIDER_UNAVAILABLE"], usageEvidenceFields: ["provider_request_id"], credentialRequirementClass: "provider_api_credential" };
const connectionPayload = { residentOfficerContractRef: ref(ADMITTED_ISOLDE), officeProfileRef: ref(ADMITTED_SECRETARIAT_PROFILE), providerRef: adapterDraft.providerRef, modelRef: adapterDraft.modelRef, resourceEnvelopeRef: "resource-envelope@1", authorityRef: "mission-authority@1" };

function admittedAdapter() {
  const candidate = cognitionist.registerAdapter(port, adapterDraft, "cognitionist-flow", context);
  const decision = createArtifact<AdapterAdmissionDecision>("AdapterAdmissionDecision", "Cognitionist", candidate.correlationId, { adapterCandidateRef: ref(candidate), conformanceEvidenceRefs: ["adapter-conformance@1"], authorityRef: "DR-090#adapter-admission", disposition: "ADMIT" }, [ref(candidate), "adapter-conformance@1", "DR-090#adapter-admission"], context);
  return cognitionist.admitAdapter(candidate, decision);
}

describe("Cognitionist Office profile and contract", () => {
  it("enacts the normalized cognitive vocabulary and controlling doctrine pointer", () => {
    expect(ENACTED_IMPERIUM_LEXICON_V4.lexicon.payload.entries).toHaveLength(90);
    expect(ENACTED_IMPERIUM_LEXICON_V4.lexicon.payload.entries.slice(-6).map((entry) => [entry.termId, entry.canonicalValue])).toEqual([
      ["LEX-084", "cognitionist"], ["LEX-085", "cognitive_port"], ["LEX-086", "cognitive_medium"], ["LEX-087", "model_adapter"], ["LEX-088", "model"], ["LEX-089", "cognitive_session"],
    ]);
    expect(ENACTED_CORE_DOCTRINE_V6.doctrine.payload).toMatchObject({ lexiconRef: "imperiumlexicon-core-v1@4", senateDecisionRef: "DR-088" });
  });

  it("admits a provision-complete shared Office profile through its assigned Senator", () => {
    expect(COGNITIONIST_PROFILE_CANDIDATE.payload.applications).toHaveLength(19);
    expect(new Set(COGNITIONIST_PROFILE_CANDIDATE.payload.applications.map((item) => item.provisionId)).size).toBe(19);
    expect(COGNITIONIST_PROFILE_ADMISSION_DECISION.producer).toContain(COGNITIONIST_PROFILE_CANDIDATE.payload.assignedSenatorId);
    expect(ADMITTED_COGNITIONIST_PROFILE.payload).toMatchObject({ officeId: "Cognitionist", arena: "SHARED", state: "ADMITTED", coreDoctrineRef: "coredoctrine-core-v1@6", lexiconRef: "imperiumlexicon-core-v1@4" });
  });

  it("derives connection identity from an exact governed cognitive port", () => {
    const request = createConnectionRequest(port, connectionPayload, "cognitionist-flow", context);
    expect(request.payload.cognitivePortRef).toBe(ref(port));
    expect(request.sourceRefs).toContain(ref(port));
    expect(() => createConnectionRequest({ ...port, status: "SUPERSEDED" }, connectionPayload, "bad", context)).toThrow("exact current cognitive port");
  });

  it("admits only evidenced adapters implementing the exact port", () => {
    expect(() => cognitionist.registerAdapter(port, { ...adapterDraft, supportedOperations: ["deploy"] }, "bad", context)).toThrow("outside the exact cognitive port");
    const candidate = cognitionist.registerAdapter(port, adapterDraft, "candidate", context);
    const weak = createArtifact<AdapterAdmissionDecision>("AdapterAdmissionDecision", "Cognitionist", candidate.correlationId, { adapterCandidateRef: ref(candidate), conformanceEvidenceRefs: [], authorityRef: "DR-090#adapter-admission", disposition: "ADMIT" }, [ref(candidate), "DR-090#adapter-admission"], context);
    expect(() => cognitionist.admitAdapter(candidate, weak)).toThrow("admission decision and evidence");
    expect(admittedAdapter().payload).toMatchObject({ state: "ADMITTED", cognitivePortRef: ref(port) });
  });

  it("asks Locksmith for bounded credential access without handling secret material", () => {
    const connection = createConnectionRequest(port, connectionPayload, "credential", context);
    const request = cognitionist.requestCredential(connection, admittedAdapter(), context);
    expect(request.payload).toMatchObject({ recipient: "Locksmith", secretMaterialIncluded: false, permittedResidentOfficerContractRef: ref(ADMITTED_ISOLDE) });
    expect(JSON.stringify(request)).not.toMatch(/api[_-]?key|password|credential_value/i);
    expect(() => createConnectionRequest(port, { ...connectionPayload, api_key: "forbidden" } as typeof connectionPayload, "bad", context)).toThrow("may not contain credential material");
  });

  it("hands Master Mason a candidate plan and never creates a live session", () => {
    const connection = createConnectionRequest(port, connectionPayload, "plan", context);
    const plan = cognitionist.planSession(connection, admittedAdapter(), "credential-lease@1", ["compatibility-test@1"], context);
    expect(plan.payload).toMatchObject({ runtimeRecipient: "MasterMason", state: "CANDIDATE", liveSessionCreated: false, credentialLeaseRef: "credential-lease@1" });
    expect(() => cognitionist.planSession(connection, admittedAdapter(), "", ["compatibility-test@1"], context)).toThrow("credential lease reference");
  });

  it("exposes no credential-custody or Runtime-execution operations", () => {
    expect(Object.getOwnPropertyNames(Cognitionist.prototype).sort()).toEqual(["admitAdapter", "constructor", "planSession", "registerAdapter", "requestCredential"].sort());
  });
});
