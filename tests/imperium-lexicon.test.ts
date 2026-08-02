import { describe, expect, it } from "vitest";
import { createArtifact } from "../src/artifact.js";
import { CORE_DOCTRINE_V3_PROVISIONS, IMPERIUM_LEXICON_V1_REF } from "../src/core-doctrine-v3.js";
import { ENACTED_CORE_DOCTRINE_V3 } from "../src/enacted-core-doctrine-v3.js";
import { ENACTED_IMPERIUM_LEXICON_V1, imperiumLexiconV1Bill } from "../src/imperium-lexicon-v1.js";
import { SenateLexicon } from "../src/senate-lexicon.js";
import { ADMITTED_SECRETARIAT_PROFILE } from "../src/secretariat-doctrine-profile.js";

const lexicon = ENACTED_IMPERIUM_LEXICON_V1.lexicon;
const senate = new SenateLexicon(lexicon.identity + "@" + lexicon.version);

describe("Senate-owned Imperium Lexicon", () => {
  it("enacts one canonical normalized vocabulary with a propagation notice", () => {
    expect(lexicon).toMatchObject({ artifactType: "ImperiumLexicon", producer: "Senate", version: 1, payload: { edition: 1, state: "ENACTED", assignedSenatorId: "senator-core-doctrine-001", transitionRule: "MANDATORY_REVALIDATION" } });
    expect(lexicon.payload.entries).toHaveLength(56);
    expect(ENACTED_IMPERIUM_LEXICON_V1.propagation.payload).toMatchObject({ lexiconRef: IMPERIUM_LEXICON_V1_REF, affectedSurfaces: ["ALL"], requiredAction: "REVALIDATE" });
  });

  it("resolves canonical terms and enacted presentation aliases to one definition", () => {
    expect(senate.resolve(lexicon, "LEX-019").canonicalTerm).toBe("Curia");
    expect(senate.resolve(lexicon, "curia").termId).toBe("LEX-019");
    expect(senate.resolve(lexicon, "Situation Room").termId).toBe("LEX-019");
    expect(() => senate.resolve(lexicon, "local office dialect")).toThrow("term is not admitted");
  });

  it("requires exact current Lexicon version and canonical governed value", () => {
    expect(senate.assertUse(lexicon, { termId: "LEX-012", lexiconRef: IMPERIUM_LEXICON_V1_REF, value: "Castellan" }).definition).toContain("internal mission-orchestration");
    expect(() => senate.assertUse(lexicon, { termId: "LEX-012", lexiconRef: "imperiumlexicon-core-v1@0", value: "Castellan" })).toThrow("stale or mismatched");
    expect(() => senate.assertUse(lexicon, { termId: "LEX-012", lexiconRef: IMPERIUM_LEXICON_V1_REF, value: "internal orchestrator" })).toThrow("canonical term");
  });

  it("refuses duplicate identities, duplicate normalized terms, dangling relationships, and alias collisions", () => {
    const duplicateId = imperiumLexiconV1Bill(); duplicateId.entries = [...duplicateId.entries, { ...duplicateId.entries[0] }];
    expect(() => senate.enact(duplicateId, "dup-id")).toThrow("duplicate Lexicon term identity");
    const duplicateTerm = imperiumLexiconV1Bill(); duplicateTerm.entries[1] = { ...duplicateTerm.entries[1], canonicalTerm: " imperium " };
    expect(() => senate.enact(duplicateTerm, "dup-term")).toThrow("duplicate canonical Lexicon term");
    const dangling = imperiumLexiconV1Bill(); dangling.entries[0] = { ...dangling.entries[0], relatedTermIds: ["LEX-999"] };
    expect(() => senate.enact(dangling, "dangling")).toThrow("unknown term");
    const alias = imperiumLexiconV1Bill(); alias.aliases.push({ alias: "Castellan", canonicalTermId: "LEX-012", context: "OPERATOR_PRESENTATION", mappingRule: "collision" });
    expect(() => senate.enact(alias, "alias-collision")).toThrow("alias conflicts");
  });

  it("amends only an exact current Senate Lexicon through immutable succession", () => {
    const bill = imperiumLexiconV1Bill(); bill.senateDecisionRef = "DR-X"; bill.effectiveAt = "2026-08-03T00:00:00.000Z";
    const amended = senate.amend(lexicon, bill).lexicon;
    expect(amended.identity).toBe(lexicon.identity);
    expect(amended.version).toBe(2);
    expect(amended.supersedes).toBe(lexicon.identity + "@1");
    const forged = createArtifact("ImperiumLexicon", "Office", "forged", lexicon.payload);
    expect(() => senate.amend(forged, bill)).toThrow("current Senate-enacted");
  });

  it("refuses a locally-current superseded pointer and protects stable term identity", () => {
    expect(() => new SenateLexicon("imperiumlexicon-core-v1@2").resolve(lexicon, "Mission")).toThrow("current Lexicon pointer");
    const renamed = imperiumLexiconV1Bill(); renamed.senateDecisionRef = "DR-RENAME"; renamed.entries[0] = { ...renamed.entries[0], canonicalTerm: "Empire" };
    expect(() => senate.amend(lexicon, renamed)).toThrow("term identity may not be reassigned");
    const deleted = imperiumLexiconV1Bill(); deleted.senateDecisionRef = "DR-DELETE"; deleted.entries = deleted.entries.slice(1);
    expect(() => senate.amend(lexicon, deleted)).toThrow("may not silently delete");
  });

  it("makes exact Lexicon v1 controlling through Core Doctrine v3", () => {
    expect(ENACTED_CORE_DOCTRINE_V3.doctrine).toMatchObject({ version: 3, supersedes: "coredoctrine-core-v1@2", payload: { edition: 3, lexiconRef: IMPERIUM_LEXICON_V1_REF, senateDecisionRef: "DR-076", transitionRule: "MANDATORY_REVALIDATION" } });
    expect(CORE_DOCTRINE_V3_PROVISIONS[0].rule).toContain(IMPERIUM_LEXICON_V1_REF);
    expect(CORE_DOCTRINE_V3_PROVISIONS[0].rule).toContain("may not independently define");
  });

  it("revalidates the admitted Secretariat profile against doctrine v3", () => {
    expect(ADMITTED_SECRETARIAT_PROFILE.payload).toMatchObject({ coreDoctrineRef: "coredoctrine-core-v1@3", lexiconRef: IMPERIUM_LEXICON_V1_REF, state: "ADMITTED", admissionDecisionRef: "officedoctrineprofileadmissiondecision-secretariat@1" });
    expect(ADMITTED_SECRETARIAT_PROFILE.payload.applications).toHaveLength(19);
  });
});
