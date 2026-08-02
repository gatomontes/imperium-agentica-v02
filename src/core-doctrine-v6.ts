import { CORE_DOCTRINE_V4_PROVISIONS } from "./core-doctrine-v4.js";
import { ENACTED_IMPERIUM_LEXICON_V4 } from "./imperium-lexicon-v4.js";
import { DoctrineBill } from "./senate.js";
export const IMPERIUM_LEXICON_V4_REF = ENACTED_IMPERIUM_LEXICON_V4.lexicon.identity + "@4";
export function coreDoctrineV6Bill(decision: string, effectiveAt: string): DoctrineBill { return { title: "Core Imperium Doctrine", rationale: "Advance the controlling pointer to Cognitionist-capable Lexicon v4.", senateDecisionRef: decision, effectiveAt, provisions: CORE_DOCTRINE_V4_PROVISIONS.map((p) => p.provisionId === "CORE-000" ? { ...p, rule: p.rule.replace(/imperiumlexicon-core-v1@2/g, IMPERIUM_LEXICON_V4_REF) } : { ...p }), affectedOfficeProfiles: ["Secretariat", "Castellan", "Cognitionist"], assignedSenatorId: "senator-core-doctrine-001", transitionRule: "MANDATORY_REVALIDATION", lexiconRef: IMPERIUM_LEXICON_V4_REF }; }
