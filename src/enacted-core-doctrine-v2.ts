import { CORE_DOCTRINE_V2_VOCABULARY_REF, coreDoctrineV2Bill } from "./core-doctrine-v2.js";
import { ENACTED_CORE_DOCTRINE_V1 } from "./enacted-core-doctrine-v1.js";
import { Senate } from "./senate.js";

export const CORE_DOCTRINE_V2_DECISION_REF = "DR-072";
export const CORE_DOCTRINE_V2_ASSIGNED_SENATOR =
  "senator-core-doctrine-001";
export const CORE_DOCTRINE_V2_EFFECTIVE_AT = "2026-08-02T01:00:00.000Z";

export const ENACTED_CORE_DOCTRINE_V2 = new Senate(CORE_DOCTRINE_V2_VOCABULARY_REF).amend(
  ENACTED_CORE_DOCTRINE_V1.doctrine,
  coreDoctrineV2Bill(
    CORE_DOCTRINE_V2_DECISION_REF,
    CORE_DOCTRINE_V2_ASSIGNED_SENATOR,
    CORE_DOCTRINE_V2_EFFECTIVE_AT,
  ),
  {
    identityFactory: (prefix) => prefix + "-core-v2",
    now: () => CORE_DOCTRINE_V2_EFFECTIVE_AT,
  },
);
