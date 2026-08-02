import { createArtifact } from "./artifact.js";
import { ENACTED_IMPERIUM_LEXICON_V2, imperiumLexiconV2Bill } from "./imperium-lexicon-v2.js";
import { LexiconCategory, LexiconEntry, LexiconLegislativeAuthority, SenateLexicon } from "./senate-lexicon.js";

export const IMPERIUM_LEXICON_V3_DECISION_REF = "DR-081";
export const IMPERIUM_LEXICON_V3_EFFECTIVE_AT = "2026-08-02T11:00:00.000Z";

function added(termId: string, canonicalTerm: string, definition: string, category: LexiconCategory): LexiconEntry {
  return specific({ termId, canonicalTerm, canonicalValue: snake(canonicalTerm), definition, category, permittedUses: [], prohibitedInterpretations: [], relatedTermIds: [], examples: [], counterexamples: [], revisionConditions: [], state: "ACTIVE" });
}

function specific(item: LexiconEntry): LexiconEntry {
  return {
    ...item,
    permittedUses: ["Use " + item.canonicalValue + " only when the governed subject satisfies this predicate: " + item.definition],
    prohibitedInterpretations: ["Do not use " + item.canonicalValue + " as a decorative synonym or for a subject that fails its stated predicate.", "Do not infer authority, truth, admission, or operational readiness from the label alone."],
    examples: ["A governed record cites " + item.termId + " and uses " + item.canonicalValue + " after verifying the definition's required boundary."],
    counterexamples: ["A local Office uses " + item.canonicalValue + " by resemblance while omitting the definition's required boundary or exact Lexicon reference."],
    revisionConditions: ["Senate changes the predicate stated in " + item.termId + ".", "A related enacted term exposes overlap, contradiction, or an unbounded interpretation."],
  };
}

const additions: LexiconEntry[] = [
  added("LEX-056", "Jurisdiction", "The enacted subject-matter and action boundary within which an institution or role may exercise assigned responsibility; jurisdiction does not itself supply action authority.", "CONSTITUTIONAL"),
  added("LEX-057", "Lifecycle", "The enacted states, transitions, invalidation conditions, and terminal outcomes governing one artifact or mission identity.", "STATE"),
  added("LEX-058", "Rule", "An enacted normative statement that defines a required, permitted, or prohibited governed consequence under stated predicates.", "CONSTITUTIONAL"),
  added("LEX-059", "Standard", "A versioned set of domain-specific requirements, methods, and thresholds admitted under Core Doctrine without altering it.", "CONSTITUTIONAL"),
  added("LEX-060", "Cognitive Process", "A bounded reasoning activity that interprets inputs or produces recommendations, findings, specifications, or questions without itself executing external effects.", "ACTION"),
  added("LEX-061", "Operational Surface", "An admitted interface through which governed instructions, resources, state, or results are prepared, supervised, or exchanged for operation.", "OPERATIONAL"),
  added("LEX-062", "Mission Specification", "The Castellan-stewarded versioned definition of mission purpose, scope, constraints, acceptance criteria, required outputs, unresolved predicates, and resource requirements.", "ARTIFACT"),
  added("LEX-063", "Mission Formation", "The bounded internal process that converts authenticated Operator intent and clarification into a candidate Mission Specification without authorizing external action.", "ACTION"),
  added("LEX-064", "Activation", "The authorized lifecycle transition that makes an admitted Persona or Operative available for a specified mission role; activation is not deployment.", "ACTION"),
  added("LEX-065", "Deployment", "The authorized placement of an activated Operative into an execution environment under an exact mission envelope.", "ACTION"),
  added("LEX-066", "Tool", "A versioned capability interface an authorized actor may invoke; possession or availability of a Tool does not authorize its use.", "ARTIFACT"),
  added("LEX-067", "Credential", "A protected authentication secret, token, key, certificate, or equivalent security factor; a Credential is not an authority grant.", "ARTIFACT"),
  added("LEX-068", "Data", "Recorded symbols, measurements, content, or structured values supplied to or produced by Imperium, kept distinct from conclusions drawn from them.", "EVIDENCE"),
  added("LEX-069", "Execution", "The bounded attempt to carry out an exact authorized instruction and record actions, refusals, failures, effects, and results.", "OPERATIONAL"),
  added("LEX-070", "Research", "A declared method for seeking, collecting, comparing, and recording information relevant to an exact question; Research does not itself establish truth or external-access authority.", "ACTION"),
  added("LEX-071", "Supervision", "Authorized observation and intervention over an active operational process under exact limits; supervision does not absorb execution or disposition authority.", "ACTION"),
  added("LEX-072", "Verification Method", "The declared reproducible procedure used to determine whether specified evidence satisfies an exact predicate or threshold.", "EVIDENCE"),
  added("LEX-073", "Uncertainty", "A recorded limitation in knowledge, measurement, inference, source reliability, or applicability that may affect a governed consequence.", "EVIDENCE"),
  added("LEX-074", "Limitation", "A stated boundary on evidence, method, authority, scope, applicability, or conclusion beyond which a claim may not be used.", "EVIDENCE"),
  added("LEX-075", "Inference", "A proposition derived from observations or claims through a declared reasoning method and kept distinct from its supporting evidence.", "EVIDENCE"),
  added("LEX-076", "Observation", "A recorded directly obtained datum or event description before inferential interpretation.", "EVIDENCE"),
  added("LEX-077", "Transition", "An exact versioned change from one governed lifecycle state to another under a cited rule and satisfied prerequisites.", "ACTION"),
  added("LEX-078", "Scope", "The explicit included and excluded subjects, actions, systems, time, data, and consequences to which a mission, authority, finding, or rule applies.", "CONSTITUTIONAL"),
  added("LEX-079", "Acceptance Criterion", "An observable, testable condition declared during mission formation for determining whether a requested output satisfies Operator intent; it is not judgment or deployment authority.", "EVIDENCE"),
  added("LEX-080", "Operating Medium", "The admitted platform, runtime, protocol, or environment format in which a Persona is packaged or an Operative functions.", "OPERATIONAL"),
  added("LEX-081", "External System", "A system outside Imperium's governed internal state whose interaction may create an External Action or External Effect.", "OPERATIONAL"),
  added("LEX-082", "Provider", "An external organization or service supplying an interface, model, infrastructure, data, Tool, or operating capability under independently applicable terms.", "ROLE"),
  added("LEX-083", "Candidate", "A versioned proposed artifact or role that has not yet received the admission required for downstream governed use.", "STATE"),
];

export function imperiumLexiconV3Bill() {
  const prior = imperiumLexiconV2Bill();
  const revised = prior.entries.map(specific);
  return { ...prior, title: "Imperium Lexicon", rationale: "Close Blackquill semantic-inventory and boilerplate-metadata findings.", senateDecisionRef: IMPERIUM_LEXICON_V3_DECISION_REF, effectiveAt: IMPERIUM_LEXICON_V3_EFFECTIVE_AT, entries: [...revised, ...additions], changes: [...revised.map((item) => ({ termId: item.termId, kind: "CLARIFICATION" as const, compatibility: "REVALIDATION_REQUIRED" as const, rationale: "Replace generic metadata with term-specific normative usage and failure boundaries.", affectedSurfaces: ["ALL"], evidenceRefs: ["tests/doctrine/lexicon-semantic-closure-review-001.md"] })), ...additions.map((item) => ({ termId: item.termId, kind: "ADDITION" as const, compatibility: "REVALIDATION_REQUIRED" as const, rationale: "Admit consequential vocabulary previously used without a canonical entry.", affectedSurfaces: ["ALL"], evidenceRefs: ["tests/doctrine/lexicon-semantic-closure-review-001.md"] }))], contractChange: undefined };
}

export const IMPERIUM_LEXICON_V3_AUTHORITY = createArtifact<LexiconLegislativeAuthority>("LexiconLegislativeAuthority", "Senate", "imperium-lexicon-v1", { decisionRef: IMPERIUM_LEXICON_V3_DECISION_REF, action: "AMEND", currentLexiconRef: ENACTED_IMPERIUM_LEXICON_V2.lexicon.identity + "@2", authorityBasisRef: "DR-069#senate-lexicon-jurisdiction", authorityFindingRef: "DR-081#authority-effective", disposition: "AUTHORIZE" }, ["DR-069#senate-lexicon-jurisdiction", "DR-081#authority-effective"], { identityFactory: (prefix) => prefix + "-v3", now: () => IMPERIUM_LEXICON_V3_EFFECTIVE_AT });

export const ENACTED_IMPERIUM_LEXICON_V3 = new SenateLexicon(IMPERIUM_LEXICON_V3_AUTHORITY.identity + "@1").amend(ENACTED_IMPERIUM_LEXICON_V2.lexicon, imperiumLexiconV3Bill(), IMPERIUM_LEXICON_V3_AUTHORITY, { identityFactory: (prefix) => prefix + "-core-v3", now: () => IMPERIUM_LEXICON_V3_EFFECTIVE_AT });

function snake(value: string): string { return value.replace(/([a-z0-9])([A-Z])/g, "$1_$2").replace(/[^A-Za-z0-9]+/g, "_").replace(/^_+|_+$/g, "").toLowerCase(); }
