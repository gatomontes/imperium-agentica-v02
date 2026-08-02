import { CORE_DOCTRINE_V3_PROVISIONS } from "./core-doctrine-v3.js";
import { ENACTED_IMPERIUM_LEXICON_V2 } from "./imperium-lexicon-v2.js";
import { CoreDoctrineProvision, DoctrineBill } from "./senate.js";

export const IMPERIUM_LEXICON_V2_REF = ENACTED_IMPERIUM_LEXICON_V2.lexicon.identity + "@" + ENACTED_IMPERIUM_LEXICON_V2.lexicon.version;

export const CORE_DOCTRINE_V4_PROVISIONS: readonly CoreDoctrineProvision[] = CORE_DOCTRINE_V3_PROVISIONS.map((provision) =>
  provision.provisionId === "CORE-000"
    ? { ...provision, rule: provision.rule.replace(/imperiumlexicon-core-v1@1/g, IMPERIUM_LEXICON_V2_REF) }
    : { ...provision },
);

export function coreDoctrineV4Bill(senateDecisionRef: string, assignedSenatorId: string, effectiveAt: string): DoctrineBill {
  return {
    title: "Core Imperium Doctrine",
    rationale: "Advance the exact controlling pointer to the Blackquill-corrected Imperium Lexicon v2.",
    senateDecisionRef,
    effectiveAt,
    provisions: CORE_DOCTRINE_V4_PROVISIONS.map((provision) => ({ ...provision })),
    affectedOfficeProfiles: ["ALL"],
    assignedSenatorId,
    transitionRule: "MANDATORY_REVALIDATION",
    lexiconRef: IMPERIUM_LEXICON_V2_REF,
  };
}
