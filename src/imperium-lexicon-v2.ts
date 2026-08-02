import { createArtifact } from "./artifact.js";
import { ENACTED_IMPERIUM_LEXICON_V1, imperiumLexiconV1Bill } from "./imperium-lexicon-v1.js";
import { LexiconBill, LexiconLegislativeAuthority, SenateLexicon } from "./senate-lexicon.js";

export const IMPERIUM_LEXICON_V2_DECISION_REF = "DR-078";
export const IMPERIUM_LEXICON_V2_EFFECTIVE_AT = "2026-08-02T08:00:00.000Z";

export function imperiumLexiconV2Bill(): LexiconBill {
  const bill = imperiumLexiconV1Bill();
  return {
    ...bill,
    rationale: "Correct Blackquill findings BQ-LX-001 through BQ-LX-007 with enforceable lineage, bound consumers, exact snake_case values, contextual aliases, legislative authority, impact classification, and a live conformance gate.",
    senateDecisionRef: IMPERIUM_LEXICON_V2_DECISION_REF,
    effectiveAt: IMPERIUM_LEXICON_V2_EFFECTIVE_AT,
    changes: [],
    contractChange: { compatibility: "BREAKING", rationale: "Replace declarative vocabulary handling with mandatory exact lineage and executable enforcement boundaries.", affectedSurfaces: ["ALL"], evidenceRefs: ["tests/doctrine/lexicon-enforcement-correction-review-001.md"] },
  };
}

export const IMPERIUM_LEXICON_V2_AUTHORITY = createArtifact<LexiconLegislativeAuthority>(
  "LexiconLegislativeAuthority",
  "Senate",
  "imperium-lexicon-v1",
  { decisionRef: IMPERIUM_LEXICON_V2_DECISION_REF, action: "AMEND", currentLexiconRef: ENACTED_IMPERIUM_LEXICON_V1.lexicon.identity + "@1", authorityBasisRef: "DR-069#senate-lexicon-jurisdiction", authorityFindingRef: "DR-078#authority-effective", disposition: "AUTHORIZE" },
  ["DR-069#senate-lexicon-jurisdiction", "DR-078#authority-effective"],
  { identityFactory: (prefix) => prefix + "-v2", now: () => IMPERIUM_LEXICON_V2_EFFECTIVE_AT },
);

export const ENACTED_IMPERIUM_LEXICON_V2 = new SenateLexicon(
  IMPERIUM_LEXICON_V2_AUTHORITY.identity + "@" + IMPERIUM_LEXICON_V2_AUTHORITY.version,
).amend(
  ENACTED_IMPERIUM_LEXICON_V1.lexicon,
  imperiumLexiconV2Bill(),
  IMPERIUM_LEXICON_V2_AUTHORITY,
  { identityFactory: (prefix) => prefix + "-core-v2", now: () => IMPERIUM_LEXICON_V2_EFFECTIVE_AT },
);
