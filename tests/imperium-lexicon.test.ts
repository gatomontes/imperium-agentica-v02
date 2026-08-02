import { describe, expect, it } from "vitest";
import { createArtifact } from "../src/artifact.js";
import { CORE_DOCTRINE_V3_PROVISIONS, IMPERIUM_LEXICON_V1_REF } from "../src/core-doctrine-v3.js";
import { ENACTED_CORE_DOCTRINE_V3 } from "../src/enacted-core-doctrine-v3.js";
import { ENACTED_CORE_DOCTRINE_V4 } from "../src/enacted-core-doctrine-v4.js";
import { ENACTED_IMPERIUM_LEXICON_V1, IMPERIUM_LEXICON_V1_AUTHORITY, imperiumLexiconV1Bill } from "../src/imperium-lexicon-v1.js";
import { ENACTED_IMPERIUM_LEXICON_V2 } from "../src/imperium-lexicon-v2.js";
import { ENACTED_IMPERIUM_LEXICON_V3 } from "../src/imperium-lexicon-v3.js";
import { ENACTED_CORE_DOCTRINE_V5 } from "../src/enacted-core-doctrine-v5.js";
import { LexiconAuthority, LexiconLegislativeAuthority, SenateLexicon, TerminologyConformanceGate } from "../src/senate-lexicon.js";
import { ADMITTED_SECRETARIAT_PROFILE } from "../src/secretariat-doctrine-profile.js";

const lexicon = ENACTED_IMPERIUM_LEXICON_V1.lexicon;
const senate = new SenateLexicon(IMPERIUM_LEXICON_V1_AUTHORITY.identity + "@" + IMPERIUM_LEXICON_V1_AUTHORITY.version);
const authority = new LexiconAuthority(lexicon, lexicon.identity + "@" + lexicon.version);

function amendmentAuthority(decisionRef: string) {
  return createArtifact<LexiconLegislativeAuthority>("LexiconLegislativeAuthority", "Senate", "amend", { decisionRef, action: "AMEND", currentLexiconRef: lexicon.identity + "@1", authorityBasisRef: "DR-069#lexicon", authorityFindingRef: decisionRef + "#effective", disposition: "AUTHORIZE" }, ["DR-069#lexicon", decisionRef + "#effective"]);
}

function amend(currentBill: ReturnType<typeof imperiumLexiconV1Bill>, decisionRef: string) {
  const grant = amendmentAuthority(decisionRef);
  return new SenateLexicon(grant.identity + "@" + grant.version).amend(lexicon, currentBill, grant);
}

describe("Senate-owned Imperium Lexicon", () => {
  it("enacts one canonical normalized vocabulary with a propagation notice", () => {
    expect(lexicon).toMatchObject({ artifactType: "ImperiumLexicon", producer: "Senate", version: 1, payload: { edition: 1, state: "ENACTED", assignedSenatorId: "senator-core-doctrine-001", transitionRule: "MANDATORY_REVALIDATION" } });
    expect(lexicon.payload.entries).toHaveLength(56);
    expect(ENACTED_IMPERIUM_LEXICON_V1.propagation.payload).toMatchObject({ lexiconRef: IMPERIUM_LEXICON_V1_REF, affectedSurfaces: ["ALL"], requiredAction: "REVALIDATE" });
  });

  it("resolves canonical terms and enacted presentation aliases to one definition", () => {
    expect(authority.resolveCanonical("LEX-019").canonicalValue).toBe("curia");
    expect(authority.resolveCanonical("curia").termId).toBe("LEX-019");
    expect(authority.resolveAlias("Situation Room", "OPERATOR_PRESENTATION").termId).toBe("LEX-019");
    expect(() => authority.resolveAlias("Situation Room", "EXTERNAL_SYSTEM")).toThrow("declared context");
    expect(() => authority.resolveCanonical("Situation Room")).toThrow("canonical vocabulary");
  });

  it("requires exact current Lexicon version and canonical governed value", () => {
    expect(authority.assertUse({ termId: "LEX-012", lexiconRef: IMPERIUM_LEXICON_V1_REF, value: "castellan" }).definition).toContain("internal mission-orchestration");
    expect(() => authority.assertUse({ termId: "LEX-012", lexiconRef: "imperiumlexicon-core-v1@0", value: "castellan" })).toThrow("stale or mismatched");
    expect(() => authority.assertUse({ termId: "LEX-012", lexiconRef: IMPERIUM_LEXICON_V1_REF, value: "Castellan" })).toThrow("exact canonical snake_case");
  });

  it("refuses duplicate identities, duplicate normalized terms, dangling relationships, and alias collisions", () => {
    const duplicateId = imperiumLexiconV1Bill(); duplicateId.entries = [...duplicateId.entries, { ...duplicateId.entries[0] }];
    expect(() => senate.enact(duplicateId, IMPERIUM_LEXICON_V1_AUTHORITY, "dup-id")).toThrow("duplicate Lexicon term identity");
    const duplicateTerm = imperiumLexiconV1Bill(); duplicateTerm.entries[1] = { ...duplicateTerm.entries[1], canonicalTerm: " imperium " };
    expect(() => senate.enact(duplicateTerm, IMPERIUM_LEXICON_V1_AUTHORITY, "dup-term")).toThrow("duplicate canonical Lexicon term");
    const dangling = imperiumLexiconV1Bill(); dangling.entries[0] = { ...dangling.entries[0], relatedTermIds: ["LEX-999"] };
    expect(() => senate.enact(dangling, IMPERIUM_LEXICON_V1_AUTHORITY, "dangling")).toThrow("unknown term");
    const alias = imperiumLexiconV1Bill(); alias.aliases.push({ alias: "Castellan", canonicalTermId: "LEX-012", context: "OPERATOR_PRESENTATION", mappingRule: "collision" });
    expect(() => senate.enact(alias, IMPERIUM_LEXICON_V1_AUTHORITY, "alias-collision")).toThrow("alias conflicts");
  });

  it("amends only an exact current Senate Lexicon through immutable succession", () => {
    const bill = imperiumLexiconV1Bill(); bill.senateDecisionRef = "DR-X"; bill.effectiveAt = "2026-08-03T00:00:00.000Z";
    bill.contractChange = { compatibility: "REVALIDATION_REQUIRED", rationale: "Test contract successor.", affectedSurfaces: ["TEST"], evidenceRefs: ["test-evidence@1"] };
    const amended = amend(bill, "DR-X").lexicon;
    expect(amended.identity).toBe(lexicon.identity);
    expect(amended.version).toBe(2);
    expect(amended.supersedes).toBe(lexicon.identity + "@1");
    const forged = createArtifact("ImperiumLexicon", "Office", "forged", lexicon.payload);
    const grant = amendmentAuthority("DR-X");
    expect(() => new SenateLexicon(grant.identity + "@" + grant.version).amend(forged, bill, grant)).toThrow("current Senate-enacted");
  });

  it("refuses a locally-current superseded pointer and protects stable term identity", () => {
    expect(() => new LexiconAuthority(lexicon, "imperiumlexicon-core-v1@2")).toThrow("current Lexicon pointer");
    const renamed = imperiumLexiconV1Bill(); renamed.senateDecisionRef = "DR-RENAME"; renamed.entries[0] = { ...renamed.entries[0], canonicalTerm: "Empire" };
    expect(() => amend(renamed, "DR-RENAME")).toThrow("term identity may not be reassigned");
    const deleted = imperiumLexiconV1Bill(); deleted.senateDecisionRef = "DR-DELETE"; deleted.entries = deleted.entries.slice(1);
    expect(() => amend(deleted, "DR-DELETE")).toThrow("may not silently delete");
  });

  it("requires exact legislative authority and a real terminology gate", () => {
    const bill = imperiumLexiconV1Bill();
    const forged = { ...IMPERIUM_LEXICON_V1_AUTHORITY, producer: "Office" };
    expect(() => senate.enact(bill, forged, "forged")).toThrow("current Senate Lexicon legislative authority");
    const gate = new TerminologyConformanceGate(authority);
    expect(() => gate.assertGovernance({ coreDoctrineRef: "coredoctrine-core-v1@3", lexiconRef: IMPERIUM_LEXICON_V1_REF, officeProfileRef: "office@1", vocabularyUses: [{ termId: "LEX-012", lexiconRef: IMPERIUM_LEXICON_V1_REF, value: "Castellan" }] })).toThrow("snake_case");
    expect(() => authority.assertUse({ termId: "Castellan", lexiconRef: IMPERIUM_LEXICON_V1_REF, value: "castellan" })).toThrow("exact stable term identity");
  });

  it("requires exact amendment impact and non-fraudulent compatibility", () => {
    const incompatible = imperiumLexiconV1Bill();
    incompatible.senateDecisionRef = "DR-SEMANTIC";
    incompatible.entries[0] = { ...incompatible.entries[0], definition: "A materially different definition." };
    incompatible.changes = [{ termId: "LEX-001", kind: "SEMANTIC_CHANGE", compatibility: "BACKWARD_COMPATIBLE", rationale: "Change meaning.", affectedSurfaces: ["ALL"], evidenceRefs: ["blackquill:BQ-LX-009"] }];
    expect(() => amend(incompatible, "DR-SEMANTIC")).toThrow("requires revalidation or breaking");
    incompatible.changes[0] = { ...incompatible.changes[0], compatibility: "BREAKING" };
    expect(amend(incompatible, "DR-SEMANTIC").lexicon.payload.changes[0]).toMatchObject({ termId: "LEX-001", compatibility: "BREAKING" });
  });

  it("makes exact Lexicon v1 controlling through Core Doctrine v3", () => {
    expect(ENACTED_CORE_DOCTRINE_V3.doctrine).toMatchObject({ version: 3, supersedes: "coredoctrine-core-v1@2", payload: { edition: 3, lexiconRef: IMPERIUM_LEXICON_V1_REF, senateDecisionRef: "DR-076", transitionRule: "MANDATORY_REVALIDATION" } });
    expect(CORE_DOCTRINE_V3_PROVISIONS[0].rule).toContain(IMPERIUM_LEXICON_V1_REF);
    expect(CORE_DOCTRINE_V3_PROVISIONS[0].rule).toContain("may not independently define");
  });

  it("revalidates the admitted Secretariat profile against doctrine v3", () => {
    expect(ENACTED_IMPERIUM_LEXICON_V2.lexicon).toMatchObject({ version: 2, supersedes: "imperiumlexicon-core-v1@1", payload: { senateDecisionRef: "DR-078" } });
    expect(ENACTED_CORE_DOCTRINE_V4.doctrine).toMatchObject({ version: 4, supersedes: "coredoctrine-core-v1@3", payload: { senateDecisionRef: "DR-079", lexiconRef: "imperiumlexicon-core-v1@2" } });
    expect(ENACTED_IMPERIUM_LEXICON_V3.lexicon.payload.entries).toHaveLength(84);
    expect(ENACTED_CORE_DOCTRINE_V5.doctrine).toMatchObject({ version: 5, payload: { lexiconRef: "imperiumlexicon-core-v1@3" } });
    expect(ADMITTED_SECRETARIAT_PROFILE.payload).toMatchObject({ coreDoctrineRef: "coredoctrine-core-v1@5", lexiconRef: "imperiumlexicon-core-v1@3", state: "ADMITTED", admissionDecisionRef: "officedoctrineprofileadmissiondecision-secretariat@1" });
    expect(ADMITTED_SECRETARIAT_PROFILE.payload.applications).toHaveLength(19);
  });

  it("closes generic metadata and missing consequential vocabulary", () => {
    const entries = ENACTED_IMPERIUM_LEXICON_V3.lexicon.payload.entries;
    expect(new Set(entries.map((entry) => entry.permittedUses.join("|"))).size).toBe(entries.length);
    expect(entries.find((entry) => entry.canonicalValue === "jurisdiction")?.termId).toBe("LEX-056");
    expect(entries.find((entry) => entry.canonicalValue === "verification_method")?.termId).toBe("LEX-072");
    expect(entries.every((entry) => !entry.permittedUses.some((rule) => rule === "Use with this exact meaning in every governed artifact, contract, schema, prompt, test, decision, and implementation surface."))).toBe(true);
  });
});
