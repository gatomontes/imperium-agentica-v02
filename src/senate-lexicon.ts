import { ArtifactContext, ArtifactEnvelope, createArtifact } from "./artifact.js";
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

export interface VocabularyUse {
  termId: string;
  lexiconRef: string;
  value: string;
}

export class SenateLexicon {
  constructor(readonly currentLexiconRef?: string) {}

  enact(bill: LexiconBill, correlationId: string, context: ArtifactContext = {}): LexiconLegislativeResult {
    validateBill(bill);
    const lexicon = createArtifact("ImperiumLexicon", "Senate", correlationId, payload(bill, 1), [bill.senateDecisionRef], context);
    return { lexicon, propagation: propagationFor(lexicon, context) };
  }

  amend(current: ArtifactEnvelope<ImperiumLexicon>, bill: LexiconBill, context: ArtifactContext = {}): LexiconLegislativeResult {
    assertCurrentLexicon(current, this.currentLexiconRef);
    validateBill(bill);
    validateAmendment(current, bill);
    const currentRef = exactRef(current);
    const candidate = createArtifact("ImperiumLexicon", "Senate", current.correlationId, payload(bill, current.payload.edition + 1), [currentRef, bill.senateDecisionRef], context);
    const lexicon = { ...candidate, identity: current.identity, version: current.version + 1, supersedes: currentRef };
    return { lexicon, propagation: propagationFor(lexicon, context) };
  }

  resolve(lexicon: ArtifactEnvelope<ImperiumLexicon>, termOrAlias: string): LexiconEntry {
    assertCurrentLexicon(lexicon, this.currentLexiconRef);
    const key = normalize(termOrAlias);
    const direct = lexicon.payload.entries.find((entry) => normalize(entry.termId) === key || normalize(entry.canonicalTerm) === key);
    if (direct) return assertActive(direct);
    const alias = lexicon.payload.aliases.find((item) => normalize(item.alias) === key);
    if (!alias) throw new Error("term is not admitted in the current Imperium Lexicon");
    return assertActive(lexicon.payload.entries.find((entry) => entry.termId === alias.canonicalTermId)!);
  }

  assertUse(lexicon: ArtifactEnvelope<ImperiumLexicon>, use: VocabularyUse): LexiconEntry {
    assertCurrentLexicon(lexicon, this.currentLexiconRef);
    if (use.lexiconRef !== exactRef(lexicon)) throw new Error("vocabulary use cites a stale or mismatched Lexicon");
    const entry = this.resolve(lexicon, use.termId);
    if (normalize(use.value) !== normalize(entry.canonicalTerm)) throw new Error("governed vocabulary must use the canonical term");
    return entry;
  }
}

function payload(bill: LexiconBill, edition: number): ImperiumLexicon {
  return {
    edition,
    title: bill.title.trim(),
    rationale: bill.rationale.trim(),
    effectiveAt: bill.effectiveAt,
    entries: bill.entries.map((entry) => ({ ...entry, termId: entry.termId.trim(), canonicalTerm: entry.canonicalTerm.trim(), definition: entry.definition.trim(), permittedUses: unique(entry.permittedUses), prohibitedInterpretations: unique(entry.prohibitedInterpretations), relatedTermIds: unique(entry.relatedTermIds), examples: unique(entry.examples), counterexamples: unique(entry.counterexamples), revisionConditions: unique(entry.revisionConditions), replacementTermId: entry.replacementTermId?.trim() })).sort((a, b) => a.termId.localeCompare(b.termId)),
    aliases: bill.aliases.map((alias) => ({ ...alias, alias: alias.alias.trim(), canonicalTermId: alias.canonicalTermId.trim(), mappingRule: alias.mappingRule.trim() })).sort((a, b) => a.alias.localeCompare(b.alias)),
    senateDecisionRef: bill.senateDecisionRef.trim(),
    affectedSurfaces: unique(bill.affectedSurfaces),
    assignedSenatorId: bill.assignedSenatorId.trim(),
    transitionRule: bill.transitionRule,
    state: "ENACTED",
  };
}

function validateBill(bill: LexiconBill): void {
  if (!bill.title.trim() || !bill.rationale.trim() || !bill.senateDecisionRef.trim() || !bill.assignedSenatorId.trim()) throw new Error("complete Lexicon legislative identity is required");
  if (!bill.effectiveAt.trim() || Number.isNaN(Date.parse(bill.effectiveAt))) throw new Error("valid Lexicon effective time is required");
  if (bill.entries.length === 0 || bill.affectedSurfaces.length === 0) throw new Error("Lexicon entries and affected surfaces are required");
  const ids = new Set<string>();
  const terms = new Set<string>();
  for (const entry of bill.entries) {
    if (!entry.termId.trim() || !entry.canonicalTerm.trim() || !entry.definition.trim() || !["ACTIVE", "DEPRECATED"].includes(entry.state) || entry.permittedUses.length === 0 || entry.prohibitedInterpretations.length === 0 || entry.revisionConditions.length === 0) throw new Error("complete canonical Lexicon entry is required");
    if (ids.has(entry.termId.trim())) throw new Error("duplicate Lexicon term identity");
    if (terms.has(normalize(entry.canonicalTerm))) throw new Error("duplicate canonical Lexicon term");
    ids.add(entry.termId.trim()); terms.add(normalize(entry.canonicalTerm));
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
    if (normalize(successor.canonicalTerm) !== normalize(existing.canonicalTerm) || successor.category !== existing.category) throw new Error("Lexicon term identity may not be reassigned");
  }
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
