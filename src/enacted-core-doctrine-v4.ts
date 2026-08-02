import { coreDoctrineV4Bill, IMPERIUM_LEXICON_V2_REF } from "./core-doctrine-v4.js";
import { ENACTED_CORE_DOCTRINE_V3 } from "./enacted-core-doctrine-v3.js";
import { Senate } from "./senate.js";

export const CORE_DOCTRINE_V4_DECISION_REF = "DR-079";
export const CORE_DOCTRINE_V4_EFFECTIVE_AT = "2026-08-02T09:00:00.000Z";

export const ENACTED_CORE_DOCTRINE_V4 = new Senate(IMPERIUM_LEXICON_V2_REF).amend(
  ENACTED_CORE_DOCTRINE_V3.doctrine,
  coreDoctrineV4Bill(CORE_DOCTRINE_V4_DECISION_REF, "senator-core-doctrine-001", CORE_DOCTRINE_V4_EFFECTIVE_AT),
  { identityFactory: (prefix) => prefix + "-core-v4", now: () => CORE_DOCTRINE_V4_EFFECTIVE_AT },
);
