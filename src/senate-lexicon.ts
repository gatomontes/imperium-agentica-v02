import { ArtifactContext, ArtifactEnvelope, GovernedArtifactContext, GovernedVocabularyUse, createArtifact } from "./artifact.js";
import { assertArtifactEnvelope } from "./schema.js";

export type LexiconCategory =
  | "CONSTITUTIONAL"
  | "INSTITUTION"
  | "ROLE"
  | "ARTIFACT"
  | "STATE"
  | "ACTION"
  | "EVIDENCE"
  | "OPERATIONAL";

export interface LexiconEntry {
  termId: string;
  canonicalTerm: string;
  canonicalValue: string;
  definition: string;
  category: LexiconCategory;
  permittedUses: string[];
  prohibitedInterpretations: string[];
  relatedTermIds: string[];
  examples: string[];
  counterexamples: string[];
  revisionConditions: string[];
  state: "ACTIVE" | "DEPRECATED";
  replacementTermId?: string;
}

export interface LexiconAlias {
  alias: string;
  canonicalTermId: string;
  context: "OPERATOR_PRESENTATION" | "EXTERNAL_SYSTEM";
  mappingRule: string;
}

export interface LexiconBill {
  title: string;
  rationale: string;
  senateDecisionRef: string;
  effectiveAt: string;
  entries: LexiconEntry[];
  aliases: LexiconAlias[];
  affectedSurfaces: string[];
  assignedSenatorId: string;
  transitionRule: "PROSPECTIVE_ADOPTION" | "MANDATORY_REVALIDATION";
  changes: LexiconChange[];
  contractChange?: LexiconContractChange;
}

export interface LexiconContractChange {
  compatibility: LexiconCompatibility;
  rationale: string;
  affectedSurfaces: string[];
  evidenceRefs: string[];
}

export type LexiconChangeKind = "ADDITION" | "CLARIFICATION" | "SEMANTIC_CHANGE" | "DEPRECATION";
export type LexiconCompatibility = "BACKWARD_COMPATIBLE" | "REVALIDATION_REQUIRED" | "BREAKING";

export interface LexiconChange {
  termId: string;
  kind: LexiconChangeKind;
  compatibility: LexiconCompatibility;
  rationale: string;
  affectedSurfaces: string[];
  evidenceRefs: string[];
}

export interface LexiconLegislativeAuthority {
  decisionRef: string;
  action: "ENACT" | "AMEND";
  currentLexiconRef?: string;
  authorityBasisRef: string;
  authorityFindingRef: string;
  disposition: "AUTHORIZE";
}

export interface ImperiumLexicon {
  edition: number;
  title: string;
  rationale: string;
  effectiveAt: string;
  entries: LexiconEntry[];
  aliases: LexiconAlias[];
  senateDecisionRef: string;
  affectedSurfaces: string[];
  assignedSenatorId: string;
  transitionRule: LexiconBill["transitionRule"];
  changes: LexiconChange[];
  contractChange?: LexiconContractChange;
  state: "ENACTED";
}

export interface LexiconPropagationNotice {
  lexiconRef: string;
  affectedSurfaces: string[];
  assignedSenatorId: string;
  requiredAction: "ADOPT_PROSPECTIVELY" | "REVALIDATE";
  state: "AWAITING_SURFACE_CONFORMANCE";
}

export interface LexiconLegislativeResult {
  lexicon: ArtifactEnvelope<ImperiumLexicon>;
  propagation: ArtifactEnvelope<LexiconPropagationNotice>;
}

export type VocabularyUse = GovernedVocabularyUse;

export class SenateLexicon {
  constructor(readonly legislativeAuthorityRef: string) {
    if (!legislativeAuthorityRef.trim()) throw new Error("exact Senate Lexicon legislative authority pointer is required");
  }

  enact(bill: LexiconBill, authority: ArtifactEnvelope<LexiconLegislativeAuthority>, correlationId: string, context: ArtifactContext = {}): LexiconLegislativeResult {
    if (exactRef(authority) !== this.legislativeAuthorityRef) throw new Error("Lexicon enactment does not match the configured legislative authority pointer");
    assertLegislativeAuthority(authority, bill, "ENACT");
    validateBill(bill);
    validateInitialChanges(bill);
    const authorityRef = exactRef(authority);
    const lexicon = createArtifact("ImperiumLexicon", "Senate", correlationId, payload(bill, 1), [authorityRef, bill.senateDecisionRef, authority.payload.authorityBasisRef, authority.payload.authorityFindingRef], context);
    return { lexicon, propagation: propagationFor(lexicon, context) };
  }

  amend(current: ArtifactEnvelope<ImperiumLexicon>, bill: LexiconBill, authority: ArtifactEnvelope<LexiconLegislativeAuthority>, context: ArtifactContext = {}): LexiconLegislativeResult {
    if (exactRef(authority) !== this.legislativeAuthorityRef) throw new Error("Lexicon amendment does not match the configured legislative authority pointer");
    assertCurrentLexicon(current);
    assertLegislativeAuthority(authority, bill, "AMEND", exactRef(current));
    validateAmendment(current, bill);
    validateBill(bill);
    const currentRef = exactRef(current);
    const candidate = createArtifact("ImperiumLexicon", "Senate", current.correlationId, payload(bill, current.payload.edition + 1), [currentRef, exactRef(authority), bill.senateDecisionRef, authority.payload.authorityBasisRef, authority.payload.authorityFindingRef], context);
    const lexicon = { ...candidate, identity: current.identity, version: current.version + 1, supersedes: currentRef };
    return { lexicon, propagation: propagationFor(lexicon, context) };
  }

}

export class LexiconAuthority {
  constructor(readonly lexicon: ArtifactEnvelope<ImperiumLexicon>, readonly currentLexiconRef: string) {
    if (!currentLexiconRef.trim()) throw new Error("exact current Lexicon pointer is required");
    assertCurrentLexicon(lexicon, currentLexiconRef);
  }

  resolveCanonical(termOrValue: string): LexiconEntry {
    assertCurrentLexicon(this.lexicon, this.currentLexiconRef);
    const key = normalize(termOrValue);
    const direct = this.lexicon.payload.entries.find((entry) => normalize(entry.termId) === key || normalize(entry.canonicalTerm) === key || entry.canonicalValue === termOrValue);
    if (direct) return assertActive(direct);
    throw new Error("term is not admitted as canonical vocabulary in the current Imperium Lexicon");
  }

  resolveAlias(aliasValue: string, context: LexiconAlias["context"]): LexiconEntry {
    assertCurrentLexicon(this.lexicon, this.currentLexiconRef);
    const alias = this.lexicon.payload.aliases.find((item) => item.alias === aliasValue && item.context === context);
    if (!alias) throw new Error("alias is not admitted for the declared context");
    return assertActive(this.lexicon.payload.entries.find((entry) => entry.termId === alias.canonicalTermId)!);
  }

  assertUse(use: VocabularyUse): LexiconEntry {
    if (use.lexiconRef !== this.currentLexiconRef) throw new Error("vocabulary use cites a stale or mismatched Lexicon");
    const entry = this.lexicon.payload.entries.find((candidate) => candidate.termId === use.termId);
    if (!entry) throw new Error("governed vocabulary use requires an exact stable term identity");
    assertActive(entry);
    if (use.value !== entry.canonicalValue) throw new Error("governed vocabulary must use the exact canonical snake_case value");
    return entry;
  }
}

export class TerminologyConformanceGate {
  constructor(readonly authority: LexiconAuthority) {}

  assertGovernance(governance: GovernedArtifactContext): void {
    if (governance.lexiconRef !== this.authority.currentLexiconRef) throw new Error("governed artifact cites a stale or mismatched Lexicon");
    if (governance.vocabularyUses.length === 0) throw new Error("governed artifact requires declared vocabulary uses");
    for (const use of governance.vocabularyUses) this.authority.assertUse(use);
  }
}

function payload(bill: LexiconBill, edition: number): ImperiumLexicon {
  return {
    edition,
    title: bill.title.trim(),
    rationale: bill.rationale.trim(),
    effectiveAt: bill.effectiveAt,
    entries: bill.entries.map((entry) => ({ ...entry, termId: entry.termId.trim(), canonicalTerm: entry.canonicalTerm.trim(), canonicalValue: entry.canonicalValue.trim(), definition: entry.definition.trim(), permittedUses: unique(entry.permittedUses), prohibitedInterpretations: unique(entry.prohibitedInterpretations), relatedTermIds: unique(entry.relatedTermIds), examples: unique(entry.examples), counterexamples: unique(entry.counterexamples), revisionConditions: unique(entry.revisionConditions), replacementTermId: entry.replacementTermId?.trim() })).sort((a, b) => a.termId.localeCompare(b.termId)),
    aliases: bill.aliases.map((alias) => ({ ...alias, alias: alias.alias.trim(), canonicalTermId: alias.canonicalTermId.trim(), mappingRule: alias.mappingRule.trim() })).sort((a, b) => a.alias.localeCompare(b.alias)),
    senateDecisionRef: bill.senateDecisionRef.trim(),
    affectedSurfaces: unique(bill.affectedSurfaces),
    assignedSenatorId: bill.assignedSenatorId.trim(),
    transitionRule: bill.transitionRule,
    changes: bill.changes.map((change) => ({ ...change, termId: change.termId.trim(), rationale: change.rationale.trim(), affectedSurfaces: unique(change.affectedSurfaces), evidenceRefs: unique(change.evidenceRefs) })).sort((a, b) => a.termId.localeCompare(b.termId)),
    contractChange: bill.contractChange ? { ...bill.contractChange, rationale: bill.contractChange.rationale.trim(), affectedSurfaces: unique(bill.contractChange.affectedSurfaces), evidenceRefs: unique(bill.contractChange.evidenceRefs) } : undefined,
    state: "ENACTED",
  };
}

function validateBill(bill: LexiconBill): void {
  if (!bill.title.trim() || !bill.rationale.trim() || !bill.senateDecisionRef.trim() || !bill.assignedSenatorId.trim()) throw new Error("complete Lexicon legislative identity is required");
  if (!bill.effectiveAt.trim() || Number.isNaN(Date.parse(bill.effectiveAt))) throw new Error("valid Lexicon effective time is required");
  if (bill.entries.length === 0 || bill.affectedSurfaces.length === 0) throw new Error("Lexicon entries and affected surfaces are required");
  const ids = new Set<string>();
  const terms = new Set<string>();
  const values = new Set<string>();
  for (const entry of bill.entries) {
    if (!entry.termId.trim() || !entry.canonicalTerm.trim() || !/^[a-z][a-z0-9]*(?:_[a-z0-9]+)*$/.test(entry.canonicalValue) || !entry.definition.trim() || !["ACTIVE", "DEPRECATED"].includes(entry.state) || entry.permittedUses.length === 0 || entry.prohibitedInterpretations.length === 0 || entry.revisionConditions.length === 0) throw new Error("complete canonical Lexicon entry with exact snake_case value is required");
    if (ids.has(entry.termId.trim())) throw new Error("duplicate Lexicon term identity");
    if (terms.has(normalize(entry.canonicalTerm))) throw new Error("duplicate canonical Lexicon term");
    if (values.has(entry.canonicalValue)) throw new Error("duplicate canonical Lexicon value");
    ids.add(entry.termId.trim()); terms.add(normalize(entry.canonicalTerm)); values.add(entry.canonicalValue);
  }
  for (const entry of bill.entries) {
    if (entry.state === "DEPRECATED" && entry.replacementTermId && (!ids.has(entry.replacementTermId.trim()) || entry.replacementTermId.trim() === entry.termId.trim())) throw new Error("deprecated term replacement must identify another admitted term");
    if (entry.state === "ACTIVE" && entry.replacementTermId) throw new Error("active term may not declare a replacement");
  }
  for (const entry of bill.entries) for (const related of entry.relatedTermIds) if (!ids.has(related.trim())) throw new Error("Lexicon relationship targets an unknown term");
  const aliases = new Set<string>();
  for (const alias of bill.aliases) {
    if (!alias.alias.trim() || !alias.mappingRule.trim() || !ids.has(alias.canonicalTermId.trim())) throw new Error("complete alias-to-canonical mapping is required");
    const key = normalize(alias.alias);
    if (terms.has(key) || aliases.has(key)) throw new Error("alias conflicts with canonical or existing vocabulary");
    aliases.add(key);
  }
  validateChangeDeclarations(bill, ids);
  if (bill.contractChange && (!bill.contractChange.rationale.trim() || bill.contractChange.affectedSurfaces.length === 0 || bill.contractChange.evidenceRefs.length === 0)) throw new Error("complete Lexicon contract-change impact declaration is required");
}

function propagationFor(lexicon: ArtifactEnvelope<ImperiumLexicon>, context: ArtifactContext): ArtifactEnvelope<LexiconPropagationNotice> {
  const lexiconRef = exactRef(lexicon);
  return createArtifact("LexiconPropagationNotice", "Senate", lexicon.correlationId, { lexiconRef, affectedSurfaces: lexicon.payload.affectedSurfaces, assignedSenatorId: lexicon.payload.assignedSenatorId, requiredAction: lexicon.payload.transitionRule === "MANDATORY_REVALIDATION" ? "REVALIDATE" : "ADOPT_PROSPECTIVELY", state: "AWAITING_SURFACE_CONFORMANCE" }, [lexiconRef, lexicon.payload.senateDecisionRef], context);
}

function validateAmendment(current: ArtifactEnvelope<ImperiumLexicon>, bill: LexiconBill): void {
  const proposed = new Map(bill.entries.map((entry) => [entry.termId.trim(), entry]));
  for (const existing of current.payload.entries) {
    const successor = proposed.get(existing.termId);
    if (!successor) throw new Error("Lexicon amendment may not silently delete a term identity");
    if (successor.canonicalTerm !== existing.canonicalTerm || successor.canonicalValue !== existing.canonicalValue || successor.category !== existing.category) throw new Error("Lexicon term identity may not be reassigned");
  }
  const currentById = new Map(current.payload.entries.map((entry) => [entry.termId, entry]));
  const changed = bill.entries.filter((entry) => entryFingerprint(entry) !== entryFingerprint(currentById.get(entry.termId))).map((entry) => entry.termId).sort();
  const declared = bill.changes.filter((change) => change.kind !== "ADDITION" || !currentById.has(change.termId)).map((change) => change.termId).sort();
  if (changed.join("|") !== declared.join("|")) throw new Error("Lexicon amendment requires exact change declarations for every changed entry");
  if (changed.length === 0 && !bill.contractChange) throw new Error("Lexicon amendment without entry changes requires a contract-change impact declaration");
}

function entryFingerprint(entry?: LexiconEntry): string {
  if (!entry) return "MISSING";
  return JSON.stringify({ ...entry, termId: entry.termId.trim(), canonicalTerm: entry.canonicalTerm.trim(), canonicalValue: entry.canonicalValue.trim(), definition: entry.definition.trim(), permittedUses: unique(entry.permittedUses), prohibitedInterpretations: unique(entry.prohibitedInterpretations), relatedTermIds: unique(entry.relatedTermIds), examples: unique(entry.examples), counterexamples: unique(entry.counterexamples), revisionConditions: unique(entry.revisionConditions), replacementTermId: entry.replacementTermId?.trim() });
}

function validateChangeDeclarations(bill: LexiconBill, ids: Set<string>): void {
  const seen = new Set<string>();
  for (const change of bill.changes) {
    if (!ids.has(change.termId.trim()) || seen.has(change.termId.trim()) || !change.rationale.trim() || change.affectedSurfaces.length === 0 || change.evidenceRefs.length === 0) throw new Error("complete unique Lexicon change declaration is required");
    if ((change.kind === "SEMANTIC_CHANGE" || change.kind === "DEPRECATION") && change.compatibility === "BACKWARD_COMPATIBLE") throw new Error("semantic change or deprecation requires revalidation or breaking classification");
    seen.add(change.termId.trim());
  }
}

function validateInitialChanges(bill: LexiconBill): void {
  const entries = bill.entries.map((entry) => entry.termId).sort();
  const additions = bill.changes.filter((change) => change.kind === "ADDITION").map((change) => change.termId).sort();
  if (entries.join("|") !== additions.join("|")) throw new Error("initial Lexicon enactment requires one ADDITION declaration per term");
}

function assertLegislativeAuthority(authority: ArtifactEnvelope<LexiconLegislativeAuthority>, bill: LexiconBill, action: LexiconLegislativeAuthority["action"], currentLexiconRef?: string): void {
  assertArtifactEnvelope(authority);
  if (authority.artifactType !== "LexiconLegislativeAuthority" || authority.producer !== "Senate" || authority.status !== "CURRENT" || authority.payload.disposition !== "AUTHORIZE") throw new Error("current Senate Lexicon legislative authority is required");
  if (authority.payload.decisionRef !== bill.senateDecisionRef || authority.payload.action !== action || authority.payload.currentLexiconRef !== currentLexiconRef) throw new Error("Lexicon legislative authority does not match the exact bill action");
  if (!authority.payload.authorityBasisRef.trim() || !authority.payload.authorityFindingRef.trim() || !authority.sourceRefs.includes(authority.payload.authorityBasisRef) || !authority.sourceRefs.includes(authority.payload.authorityFindingRef)) throw new Error("effective Lexicon legislative authority lineage is required");
}

function assertCurrentLexicon(lexicon: ArtifactEnvelope<ImperiumLexicon>, currentLexiconRef?: string): void {
  assertArtifactEnvelope(lexicon);
  if (lexicon.artifactType !== "ImperiumLexicon" || lexicon.producer !== "Senate" || lexicon.status !== "CURRENT" || lexicon.payload.state !== "ENACTED") throw new Error("current Senate-enacted Imperium Lexicon is required");
  if (currentLexiconRef && exactRef(lexicon) !== currentLexiconRef) throw new Error("Lexicon does not match the current Lexicon pointer");
}

function assertActive(entry: LexiconEntry): LexiconEntry {
  if (entry.state !== "ACTIVE") throw new Error("term is deprecated" + (entry.replacementTermId ? "; use " + entry.replacementTermId : ""));
  return entry;
}

function normalize(value: string): string { return value.trim().toLocaleLowerCase("en-US"); }
function exactRef(artifact: ArtifactEnvelope<unknown>): string { return artifact.identity + "@" + artifact.version; }
function unique(values: string[]): string[] { return [...new Set(values.map((value) => value.trim()).filter(Boolean))].sort(); }
