import { CORE_DOCTRINE_V2_PROVISIONS } from "./core-doctrine-v2.js";
import { ENACTED_IMPERIUM_LEXICON_V1 } from "./imperium-lexicon-v1.js";
import { DoctrineBill, CoreDoctrineProvision } from "./senate.js";

export const IMPERIUM_LEXICON_V1_REF = ENACTED_IMPERIUM_LEXICON_V1.lexicon.identity + "@" + ENACTED_IMPERIUM_LEXICON_V1.lexicon.version;

export const CORE_DOCTRINE_V3_PROVISIONS: readonly CoreDoctrineProvision[] = CORE_DOCTRINE_V2_PROVISIONS.map((provision) =>
  provision.provisionId === "CORE-000"
    ? {
        provisionId: "CORE-000",
        title: "Controlling Senate-enacted vocabulary",
        rule: "Every governed Imperium use shall conform to the exact current Senate-enacted Imperium Lexicon. An Office, arena, mission, agent, adapter, prompt, schema, test, or implementation may not independently define, redefine, specialize, narrow, enlarge, or silently substitute a canonical term. A missing term requires a terminology petition to Senate. Operator-facing or external-system aliases require an enacted exact mapping and never become an alternative definition. The controlling Lexicon for this doctrine edition is " + IMPERIUM_LEXICON_V1_REF + ".",
      }
    : { ...provision },
);

export function coreDoctrineV3Bill(senateDecisionRef: string, assignedSenatorId: string, effectiveAt: string): DoctrineBill {
  return {
    title: "Core Imperium Doctrine",
    rationale: "Replace embedded controlling definitions with the exact Senate-enacted Imperium Lexicon and prohibit Office dialects.",
    senateDecisionRef,
    effectiveAt,
    provisions: CORE_DOCTRINE_V3_PROVISIONS.map((provision) => ({ ...provision })),
    affectedOfficeProfiles: ["ALL"],
    assignedSenatorId,
    transitionRule: "MANDATORY_REVALIDATION",
    lexiconRef: IMPERIUM_LEXICON_V1_REF,
  };
}
