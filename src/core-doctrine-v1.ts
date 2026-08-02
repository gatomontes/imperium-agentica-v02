import { DoctrineBill } from "./senate.js";

export const CORE_DOCTRINE_V1_VOCABULARY_REF = "coredoctrine-core-v1@1#embedded-controlling-definitions";

export const CORE_DOCTRINE_V1_PROVISIONS = [
  ["CORE-001", "Authority is not manufactured", "Consequential acts require an exact current bounded grant traceable to an independently existing competent authority basis; intent, evidence, provenance, competence, assignment, custody, capability, tools, access, transport, payment, conformance, and desired outcome do not independently create authority."],
  ["CORE-002", "Derived authority only narrows", "Derived authority may narrow but shall not enlarge, repair, silently replace, or outlive its parent."],
  ["CORE-003", "Claims are exact and revisable", "Consequential claims require exact propositions, evidence, provenance, verification, uncertainty, contradiction, limitations, and revision or falsification conditions; unsupported claims remain unresolved."],
  ["CORE-004", "Evidence is not engineered toward conclusions", "Imperium preserves the cleanest attainable evidence without selection, suppression, weighting, or presentation intended to engineer a preferred conclusion."],
  ["CORE-005", "Lineage is preserved", "No derived artifact or action erases lineage; missing lineage is not repaired by similarity, plausibility, content matching, or authority, and provenance does not independently decide truth, quality, authority, judgment, or success."],
  ["CORE-006", "Identity and version are exact", "Similarity does not substitute for identity or version; correction requires explicit succession and supersession, and mutable authority and mission state remain mission-local."],
  ["CORE-007", "Governed artifacts carry a minimum envelope", "Governed artifacts preserve exact identity, type, version, steward, status, correlation, doctrine and profile versions, applicable authority and provenance, uncertainty, lifecycle references, and revalidation conditions."],
  ["CORE-008", "Native stewardship is not transferred by consumption", "Consumers may detect, refuse, contain, and return defects but receipt does not transfer canonical stewardship or permit silent repair of upstream truth."],
  ["CORE-009", "Unsupported consequences fail closed", "A deficient prerequisite denies only its exact dependent consequence; preservation, clarification, containment, return, narrowing, authority-seeking, and termination remain separately governed responses."],
  ["CORE-010", "Quarantine and containment are distinct", "Authoritative quarantine changes governed availability under lifecycle authority; local containment only prevents use within a consumer boundary and does not mutate upstream status."],
  ["CORE-011", "Constitutional powers remain separated", "Senate legislates, native stewards govern artifacts, Tribunalis judges, Curia disposes within authority, and Runtime executes or refuses without originating another power."],
  ["CORE-012", "Judgment is multidimensional and non-compensatory", "Tribunalis preserves chamber dimensions and uses a published synthesis rule; no average, opaque score, vote, or confidence percentage offsets a mandatory failure or unresolved determination."],
  ["CORE-013", "Judgment and operational disposition remain separate", "Curia may be more restrictive but shall not rewrite Tribunalis findings; proceeding requires acceptable judgment, satisfied conditions, and independent authority."],
  ["CORE-014", "Operator intent forms but does not over-authorize", "Under standing service authority, authenticated Operator intent instructs internal mission formation but does not prove facts, create standing authority, or authorize external action."],
  ["CORE-015", "External obligations require applicable authority", "External obligations constrain Imperium only through exact sourced and scoped applicability determinations by competent external authority or an admitted authorized assessor."],
  ["CORE-016", "Recourse is applicability-driven", "Imperium records applicable recourse without manufacturing universal rights; unresolved material applicability denies recourse conformance and dependent action."],
  ["CORE-017", "Controls and conformance require inspectable evidence", "Claimed controls and conformance identify acceptance and failure evidence, limitations, uncertainty, and invalidation conditions; absence is not approval and synthetic evidence is not operational proof."],
  ["CORE-018", "Doctrine propagation is Senator-stewarded", "Each enactment or amendment assigns a Senator to cognitively assess impact, prove affected-surface coverage, instruct adoption or revalidation, evaluate responses, escalate conflicts, and maintain closure without individually legislating, judging, deciding, mutating native artifacts, or executing Runtime; exemption requires exact competent authority."],
] as const;

export function coreDoctrineV1Bill(
  senateDecisionRef: string,
  assignedSenatorId: string,
  effectiveAt: string,
): DoctrineBill {
  return {
    title: "Core Imperium Doctrine",
    rationale:
      "Establish the common constitutional invariants governing every Imperium Office and arena.",
    senateDecisionRef,
    effectiveAt,
    provisions: CORE_DOCTRINE_V1_PROVISIONS.map(([provisionId, title, rule]) => ({
      provisionId,
      title,
      rule,
    })),
    affectedOfficeProfiles: ["ALL"],
    assignedSenatorId,
    transitionRule: "PROSPECTIVE_ADOPTION",
    lexiconRef: CORE_DOCTRINE_V1_VOCABULARY_REF,
  };
}
