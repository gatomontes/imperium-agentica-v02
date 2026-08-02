import { coreDoctrineV5Bill, IMPERIUM_LEXICON_V3_REF } from "./core-doctrine-v5.js";
import { ENACTED_CORE_DOCTRINE_V4 } from "./enacted-core-doctrine-v4.js";
import { Senate } from "./senate.js";
export const ENACTED_CORE_DOCTRINE_V5 = new Senate(IMPERIUM_LEXICON_V3_REF).amend(ENACTED_CORE_DOCTRINE_V4.doctrine, coreDoctrineV5Bill("DR-082", "2026-08-02T12:00:00.000Z"), { identityFactory: (p) => p + "-core-v5", now: () => "2026-08-02T12:00:00.000Z" });
