import { coreDoctrineV6Bill, IMPERIUM_LEXICON_V4_REF } from "./core-doctrine-v6.js";
import { ENACTED_CORE_DOCTRINE_V5 } from "./enacted-core-doctrine-v5.js";
import { Senate } from "./senate.js";
export const ENACTED_CORE_DOCTRINE_V6 = new Senate(IMPERIUM_LEXICON_V4_REF).amend(ENACTED_CORE_DOCTRINE_V5.doctrine, coreDoctrineV6Bill("DR-088", "2026-08-03T01:00:00.000Z"), { identityFactory: (p) => p + "-core-v6", now: () => "2026-08-03T01:00:00.000Z" });
