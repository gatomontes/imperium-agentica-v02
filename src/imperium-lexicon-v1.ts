import { LexiconCategory, LexiconEntry, LexiconBill, SenateLexicon } from "./senate-lexicon.js";

export const IMPERIUM_LEXICON_V1_DECISION_REF = "DR-075";
export const IMPERIUM_LEXICON_V1_ASSIGNED_SENATOR = "senator-core-doctrine-001";
export const IMPERIUM_LEXICON_V1_EFFECTIVE_AT = "2026-08-02T05:00:00.000Z";

function entry(termId: string, canonicalTerm: string, definition: string, category: LexiconCategory, relatedTermIds: string[] = []): LexiconEntry {
  return {
    termId,
    canonicalTerm,
    definition,
    category,
    permittedUses: ["Use with this exact meaning in every governed artifact, contract, schema, prompt, test, decision, and implementation surface."],
    prohibitedInterpretations: ["No Office, arena, mission, agent, adapter, or external alias may redefine, narrow, enlarge, or silently substitute this meaning."],
    relatedTermIds,
    examples: ["A governed surface cites " + termId + " and the exact current Imperium Lexicon version."],
    counterexamples: ["A local glossary assigns " + canonicalTerm + " a different meaning."],
    revisionConditions: ["Senate amendment supersedes this entry or changes a related controlling term."],
    state: "ACTIVE",
  };
}

export const IMPERIUM_LEXICON_V1_ENTRIES: readonly LexiconEntry[] = [
  entry("LEX-001", "Imperium", "The complete governed system of enacted institutions, artifacts, rules, cognitive processes, operational surfaces, and runtime mechanisms operating under Imperium authority and standards.", "CONSTITUTIONAL", ["LEX-002", "LEX-006"]),
  entry("LEX-002", "Senate", "The legislative body that solely enacts and stewards Core Doctrine and the Imperium Lexicon; it does not exercise Office, adjudicative, operational-disposition, or Runtime powers.", "INSTITUTION", ["LEX-003", "LEX-004", "LEX-005"]),
  entry("LEX-003", "Senator", "A Senate-assigned cognitive steward who propagates enacted changes, evaluates adoption evidence, and escalates unresolved matters without legislating alone or exercising another body's power.", "ROLE", ["LEX-002", "LEX-044"]),
  entry("LEX-004", "Core Doctrine", "The Senate-enacted body of Imperium-wide governing principles that every governed surface must apply through exact current references.", "CONSTITUTIONAL", ["LEX-002", "LEX-005", "LEX-007"]),
  entry("LEX-005", "Imperium Lexicon", "The Senate-enacted, versioned, canonical vocabulary whose definitions control all governed Imperium uses; Offices possess jurisdiction, not dialects.", "CONSTITUTIONAL", ["LEX-002", "LEX-004"]),
  entry("LEX-006", "Office", "A bounded Imperium institution with enacted jurisdiction, native responsibilities, and governed interfaces; an Office is not itself an agent or operative.", "INSTITUTION", ["LEX-007", "LEX-011"]),
  entry("LEX-007", "Office Doctrine Profile", "The admitted, versioned application of exact current Core Doctrine and Lexicon to one Office's jurisdiction, verified by Tribunalis and admitted by the assigned Senator under enacted authority.", "ARTIFACT", ["LEX-004", "LEX-005", "LEX-006"]),
  entry("LEX-008", "Mission", "A versioned governed undertaking formed from authenticated Operator intent through clarification, bounded scope, acceptance criteria, authority prerequisites, and an explicit lifecycle; persona creation and field deployment may each be missions.", "OPERATIONAL", ["LEX-009", "LEX-010", "LEX-012"]),
  entry("LEX-009", "Mission Dossier", "The Secretariat-stewarded, versioned living record that begins with Operator intent and preserves mission-formation inputs, inquiries, answers, uncertainty, authority assertions, and exact lineage.", "ARTIFACT", ["LEX-008", "LEX-011", "LEX-012"]),
  entry("LEX-010", "Operator", "An authenticated human or admitted authority-bearing principal who expresses intent and makes decisions within independently effective authority; Operator intent does not itself prove facts or authorize external action.", "ROLE", ["LEX-008", "LEX-011", "LEX-035"]),
  entry("LEX-011", "Secretariat", "The Operator-facing Office and point of entry that opens Mission Dossiers, presents exact inquiries in customer-friendly form, records answers, and performs authorized communication without forming mission meaning or exercising research, judgment, deployment, supervision, or execution powers.", "INSTITUTION", ["LEX-009", "LEX-010", "LEX-012"]),
  entry("LEX-012", "Castellan", "The internal mission-orchestration Office that evaluates the exact current Mission Dossier, identifies unresolved mission predicates, issues clarification inquiries through Secretariat, and forms bounded mission specifications without external deployment authority.", "INSTITUTION", ["LEX-008", "LEX-009", "LEX-011"]),
  entry("LEX-013", "Tribunalis", "The adjudicative body whose specialized chambers determine bounded dimensions and whose Judge synthesizes those determinations under a published non-compensatory rule; it does not choose operational disposition.", "INSTITUTION", ["LEX-014", "LEX-015", "LEX-016", "LEX-017"]),
  entry("LEX-014", "Chamber", "A specialized Tribunalis adjudicative unit that returns one bounded determination with exact evidence, method, uncertainty, and lineage.", "INSTITUTION", ["LEX-013", "LEX-016"]),
  entry("LEX-015", "Judge", "The Tribunalis role that synthesizes exact chamber determinations into judgment using an enacted rule without averaging away mandatory failure or uncertainty.", "ROLE", ["LEX-013", "LEX-017"]),
  entry("LEX-016", "Finding", "A bounded, evidence-supported determination of a stated proposition under a cited method and authority; a finding is neither judgment nor operational disposition.", "EVIDENCE", ["LEX-017", "LEX-018", "LEX-036"]),
  entry("LEX-017", "Judgment", "The Judge's non-compensatory synthesis of chamber determinations as ACCEPTABLE, ACCEPTABLE_WITH_CONDITIONS, NOT_ACCEPTABLE, or UNRESOLVED.", "EVIDENCE", ["LEX-013", "LEX-015", "LEX-018"]),
  entry("LEX-018", "Disposition", "An authorized decision about what operational consequence follows from evidence and judgment; it remains separate from both and belongs to the body assigned by enacted contract.", "ACTION", ["LEX-016", "LEX-017", "LEX-019"]),
  entry("LEX-019", "Curia", "The operational situation-room body that chooses mission disposition within authority from admitted inputs and judgment; it may be arena-specific and does not rewrite Tribunalis determinations.", "INSTITUTION", ["LEX-013", "LEX-018", "LEX-020"]),
  entry("LEX-020", "Runtime", "The execution substrate that realizes or refuses exact authorized instructions and records operational facts; it does not originate mission meaning, authority, doctrine, judgment, or disposition.", "OPERATIONAL", ["LEX-018", "LEX-025"]),
  entry("LEX-021", "Persona", "An admitted, versioned specification of professional cognition, traits, doctrine-bound behavior, evidence standards, and boundaries; it is not an activated mission operative.", "ARTIFACT", ["LEX-022"]),
  entry("LEX-022", "Operative", "A Persona packaged and admitted for a specific mission and operating medium under exact authority, tools, credentials, data, and execution boundaries.", "ROLE", ["LEX-008", "LEX-021", "LEX-020"]),
  entry("LEX-023", "Citadel", "The internal Imperium arena for mission formation, governance application, persona forging, adjudication, evaluation, and finishing; it does not serve as the field deployment arena.", "INSTITUTION", ["LEX-024"]),
  entry("LEX-024", "Colosseum", "The separate field-adapted multi-agent arena that receives an exact mission packet and personas, prepares operatives and the joust, supervises execution, and returns results under its own admitted governance bodies.", "INSTITUTION", ["LEX-023", "LEX-022"]),
  entry("LEX-025", "Governed Action", "An action for which an enacted Imperium rule requires a finding, transition, handoff, authorization, or record.", "ACTION", ["LEX-026"]),
  entry("LEX-026", "Governed Artifact", "A versioned record used by a Governed Action and carrying the minimum envelope required by enacted contracts.", "ARTIFACT", ["LEX-025", "LEX-031"]),
  entry("LEX-027", "Exact", "Identified by the fields and verification method required by the applicable enacted contract; similarity, naming, timing, role, or plausibility is insufficient.", "CONSTITUTIONAL"),
  entry("LEX-028", "Material", "Capable of changing a required finding, judgment, authority determination, disposition, or action under a cited rule.", "CONSTITUTIONAL", ["LEX-016", "LEX-017", "LEX-018"]),
  entry("LEX-029", "Competent", "Possessing independently traceable authority for the exact determination at issue.", "CONSTITUTIONAL", ["LEX-035"]),
  entry("LEX-030", "Native Steward", "The body assigned canonical semantic and lifecycle custody of an artifact or state by an enacted contract.", "ROLE", ["LEX-026"]),
  entry("LEX-031", "Unresolved", "The state in which required evidence or determination is insufficient to support only the dependent consequence.", "STATE", ["LEX-016"]),
  entry("LEX-032", "Bounded Scope Completeness", "The condition in which all surfaces discoverable under a declared method, scope, assumptions, exclusions, evidence, and revision conditions have been assessed; it is not omniscience.", "EVIDENCE"),
  entry("LEX-033", "Current", "The exact artifact version presently effective under its native lifecycle and not superseded, invalidated, refused, or expired.", "STATE", ["LEX-034", "LEX-035A"]),
  entry("LEX-034", "Superseded", "The lifecycle state of an artifact version replaced by an explicit successor with preserved identity and supersession lineage.", "STATE", ["LEX-033"]),
  entry("LEX-035A", "Invalidated", "The lifecycle state in which a previously usable artifact or determination has become unavailable because a recorded invalidation condition occurred.", "STATE", ["LEX-033"]),
  entry("LEX-035", "Authority", "An independently existing, exact, current, bounded, and traceable basis permitting a governed action or determination; intent, evidence, capability, access, custody, or desired outcome does not manufacture it.", "CONSTITUTIONAL", ["LEX-010", "LEX-025", "LEX-029"]),
  entry("LEX-036", "Evidence", "Recorded support or contradiction relevant to an exact proposition under a declared method; evidence does not independently determine truth, authority, judgment, or disposition.", "EVIDENCE", ["LEX-016", "LEX-037", "LEX-038"]),
  entry("LEX-037", "Provenance", "The exact lineage of origin, custody, transformation, and handoff for an artifact or claim; provenance does not independently establish truth, quality, sufficiency, or authority.", "EVIDENCE", ["LEX-036", "LEX-039"]),
  entry("LEX-038", "Claim", "A stated proposition kept distinct from observation, assumption, inference, unknown, and contradiction and carrying the evidence, provenance, uncertainty, limitations, and revision conditions required for any governed consequence.", "EVIDENCE", ["LEX-036", "LEX-039", "LEX-040", "LEX-041"]),
  entry("LEX-039", "Assumption", "A proposition provisionally used without being represented as established fact and carrying an explicit validation or revision condition.", "EVIDENCE", ["LEX-038"]),
  entry("LEX-040", "Unknown", "A relevant matter for which Imperium presently lacks sufficient information to state a supported proposition.", "EVIDENCE", ["LEX-031", "LEX-038"]),
  entry("LEX-041", "Material Contradiction", "Two or more incompatible claims or evidence states whose resolution could materially change a governed consequence.", "EVIDENCE", ["LEX-028", "LEX-038"]),
  entry("LEX-042", "Handoff", "A governed transfer of an exact artifact or instruction to a named recipient for a stated purpose without transferring native stewardship or manufacturing authority.", "ACTION", ["LEX-026", "LEX-030", "LEX-035"]),
  entry("LEX-043", "Local Containment", "A consumer's bounded refusal to use a defective or unresolved input while recording and reporting the exact basis without changing upstream governed availability.", "ACTION", ["LEX-044"]),
  entry("LEX-044", "Quarantine", "An authoritative lifecycle action that changes governed availability and may be performed only by the native steward or an explicitly delegated authority.", "ACTION", ["LEX-030", "LEX-043"]),
  entry("LEX-045", "External Action", "A governed action that crosses Imperium's internal boundary, interacts with an external person, system, provider, account, data source, or environment, or can create an external effect.", "OPERATIONAL", ["LEX-025", "LEX-035"]),
  entry("LEX-046", "Inquiry", "A bounded request for information needed to evaluate an unresolved proposition; inquiry does not imply permission to research externally.", "ACTION", ["LEX-031", "LEX-047"]),
  entry("LEX-047", "Clarification", "Operator-supplied information elicited through Secretariat in response to an exact inquiry, preserving question and answer lineage for reevaluation by the requesting steward.", "ACTION", ["LEX-011", "LEX-012", "LEX-046"]),
  entry("LEX-048", "Agent", "A software-controlled cognitive actor operating within an admitted role, Office operating layer, or mission boundary; agency does not itself create institutional jurisdiction, authority, or operative status.", "ROLE", ["LEX-006", "LEX-022", "LEX-049"]),
  entry("LEX-049", "Officer", "An admitted Office-bound agent or cognitive role authorized to exercise specified institutional cognition within that Office's profile; an Officer is not automatically a mission Operative.", "ROLE", ["LEX-006", "LEX-022", "LEX-048"]),
  entry("LEX-050", "Admission", "A governed lifecycle decision by the competent authority that makes an exact candidate available for the admitted scope; admission does not create unrelated authority or operational activation.", "ACTION", ["LEX-029", "LEX-033", "LEX-035"]),
  entry("LEX-051", "Authorization", "A governed determination that every exact authority prerequisite for a specified action is presently satisfied; authorization is action-specific and does not enlarge its underlying grants.", "ACTION", ["LEX-025", "LEX-035"]),
  entry("LEX-052", "Authentication", "Verification that an asserted identity controls the admitted authentication factor or session under a cited method; authentication does not establish authorization.", "ACTION", ["LEX-010", "LEX-051"]),
  entry("LEX-053", "External Effect", "A change, communication, transaction, disclosure, commitment, or other consequence produced outside Imperium's internal governed state.", "OPERATIONAL", ["LEX-045"]),
  entry("LEX-054", "Mission Packet", "The exact versioned package handed between arenas containing the authorized mission specification, required personas, constraints, acceptance criteria, authority and resource requirements, and lineage; it is not itself deployment authorization.", "ARTIFACT", ["LEX-008", "LEX-021", "LEX-024", "LEX-051"]),
  entry("LEX-055", "Persona Specification", "The Foundry-produced, versioned specification candidate or admitted artifact defining a Persona's professional cognition, traits, doctrine-bound behavior, evidence rules, and boundaries.", "ARTIFACT", ["LEX-021"]),
];

export function imperiumLexiconV1Bill(): LexiconBill {
  return {
    title: "Imperium Lexicon",
    rationale: "Establish one Senate-owned language across every Office, arena, artifact, contract, prompt, test, and implementation surface.",
    senateDecisionRef: IMPERIUM_LEXICON_V1_DECISION_REF,
    effectiveAt: IMPERIUM_LEXICON_V1_EFFECTIVE_AT,
    entries: IMPERIUM_LEXICON_V1_ENTRIES.map((item) => ({ ...item })),
    aliases: [
      { alias: "Situation Room", canonicalTermId: "LEX-019", context: "OPERATOR_PRESENTATION", mappingRule: "Presentation alias only; canonical governed value remains Curia." },
      { alias: "customer", canonicalTermId: "LEX-010", context: "OPERATOR_PRESENTATION", mappingRule: "Use only when presenting the Operator role conversationally; governed records retain Operator." },
    ],
    affectedSurfaces: ["ALL"],
    assignedSenatorId: IMPERIUM_LEXICON_V1_ASSIGNED_SENATOR,
    transitionRule: "MANDATORY_REVALIDATION",
  };
}

export const ENACTED_IMPERIUM_LEXICON_V1 = new SenateLexicon().enact(
  imperiumLexiconV1Bill(),
  "imperium-lexicon-v1",
  { identityFactory: (prefix) => prefix + "-core-v1", now: () => IMPERIUM_LEXICON_V1_EFFECTIVE_AT },
);
