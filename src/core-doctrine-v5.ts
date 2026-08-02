import { CORE_DOCTRINE_V4_PROVISIONS } from "./core-doctrine-v4.js";
import { ENACTED_IMPERIUM_LEXICON_V3 } from "./imperium-lexicon-v3.js";
import { DoctrineBill } from "./senate.js";

export const IMPERIUM_LEXICON_V3_REF = ENACTED_IMPERIUM_LEXICON_V3.lexicon.identity + "@3";
export function coreDoctrineV5Bill(decision: string, effectiveAt: string): DoctrineBill {
  return { title: "Core Imperium Doctrine", rationale: "Advance the controlling pointer to semantically expanded Lexicon v3.", senateDecisionRef: decision, effectiveAt, provisions: CORE_DOCTRINE_V4_PROVISIONS.map((p) => p.provisionId === "CORE-000" ? { ...p, rule: p.rule.replace(/imperiumlexicon-core-v1@2/g, IMPERIUM_LEXICON_V3_REF) } : { ...p }), affectedOfficeProfiles: ["ALL"], assignedSenatorId: "senator-core-doctrine-001", transitionRule: "MANDATORY_REVALIDATION", lexiconRef: IMPERIUM_LEXICON_V3_REF };
}
