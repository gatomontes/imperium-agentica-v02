import { CORE_DOCTRINE_V1_VOCABULARY_REF, coreDoctrineV1Bill } from "./core-doctrine-v1.js";
import { Senate } from "./senate.js";

export const CORE_DOCTRINE_V1_DECISION_REF = "DR-071";
export const CORE_DOCTRINE_V1_ASSIGNED_SENATOR =
  "senator-core-doctrine-001";
export const CORE_DOCTRINE_V1_EFFECTIVE_AT = "2026-08-02T00:00:00.000Z";

export const ENACTED_CORE_DOCTRINE_V1 = new Senate(CORE_DOCTRINE_V1_VOCABULARY_REF).enact(
  coreDoctrineV1Bill(
    CORE_DOCTRINE_V1_DECISION_REF,
    CORE_DOCTRINE_V1_ASSIGNED_SENATOR,
    CORE_DOCTRINE_V1_EFFECTIVE_AT,
  ),
  "core-doctrine-v1-enactment",
  {
    identityFactory: (prefix) => prefix + "-core-v1",
    now: () => "2026-08-02T00:00:00.000Z",
  },
);
