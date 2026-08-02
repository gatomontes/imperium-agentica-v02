import { coreDoctrineV3Bill } from "./core-doctrine-v3.js";
import { ENACTED_CORE_DOCTRINE_V2 } from "./enacted-core-doctrine-v2.js";
import { Senate } from "./senate.js";
import { IMPERIUM_LEXICON_V1_REF } from "./core-doctrine-v3.js";

export const CORE_DOCTRINE_V3_DECISION_REF = "DR-076";
export const CORE_DOCTRINE_V3_ASSIGNED_SENATOR = "senator-core-doctrine-001";
export const CORE_DOCTRINE_V3_EFFECTIVE_AT = "2026-08-02T06:00:00.000Z";

export const ENACTED_CORE_DOCTRINE_V3 = new Senate(IMPERIUM_LEXICON_V1_REF).amend(
  ENACTED_CORE_DOCTRINE_V2.doctrine,
  coreDoctrineV3Bill(CORE_DOCTRINE_V3_DECISION_REF, CORE_DOCTRINE_V3_ASSIGNED_SENATOR, CORE_DOCTRINE_V3_EFFECTIVE_AT),
  { identityFactory: (prefix) => prefix + "-core-v3", now: () => CORE_DOCTRINE_V3_EFFECTIVE_AT },
);
