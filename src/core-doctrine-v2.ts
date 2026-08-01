import { DoctrineBill, CoreDoctrineProvision } from "./senate.js";

export const CORE_DOCTRINE_V2_PROVISIONS: readonly CoreDoctrineProvision[] = [
  {
    provisionId: "CORE-000",
    title: "Controlling definitions",
    rule: "Governed action means an action for which an enacted Imperium rule requires a finding, transition, handoff, authorization, or record. Governed artifact means a versioned record used by a governed action. Exact means identified by the fields and verification method required by the applicable enacted contract. Material means capable of changing a required finding, judgment, authority determination, disposition, or action under a cited rule. Competent means possessing independently traceable authority for the exact determination. Native steward means the body assigned canonical semantic and lifecycle custody by an enacted contract. Unresolved means the required evidence or determination is insufficient to support the dependent consequence. Bounded scope completeness means all surfaces discoverable under a declared method, scope, assumptions, exclusions, evidence, and revision conditions have been assessed; it is not a claim of omniscience.",
  },
  {
    provisionId: "CORE-001",
    title: "Authority is not manufactured",
    rule: "Imperium shall perform a governed action only under every authority prerequisite required by its applicable enacted contract. A required grant must be exact, current, bounded, and traceable to an independently existing competent authority basis. Intent, evidence, provenance, competence, assignment, custody, capability, tools, access, transport, payment, conformance, or desired outcome shall not independently create authority.",
  },
  {
    provisionId: "CORE-002",
    title: "Derived authority only narrows",
    rule: "Derived authority shall not enlarge, repair, silently replace, or outlive its parent. Parent invalidation, expiry, withdrawal, or supersession makes dependent authority unavailable unless an independently valid successor is admitted and every required revalidation is complete.",
  },
  {
    provisionId: "CORE-003",
    title: "Claims are exact and revisable",
    rule: "A claim used to produce a governed consequence shall identify its proposition, evidence, provenance, verification method, uncertainty, material contradiction, limitation, and revision or falsification condition. A predicate lacking the operational definition or threshold required for that consequence shall not decide it. Insufficient support produces UNRESOLVED for the dependent consequence.",
  },
  {
    provisionId: "CORE-004",
    title: "Evidence is not conditioned on a desired conclusion",
    rule: "Imperium shall distinguish observations, source claims, disputes, contradictions, assumptions, unknowns, limitations, inferences, confidence, and revision conditions. Evidence inclusion, exclusion, weighting, and presentation must follow a declared question-relevant method and must not change because a supported conclusion is desired or disfavored. Unequal evidentiary weight is permitted when the declared method and evidence justify it.",
  },
  {
    provisionId: "CORE-005",
    title: "Lineage is preserved",
    rule: "No derived artifact or governed action shall erase required lineage. Missing lineage shall not be repaired by similarity, plausibility, content matching, or authority. Provenance records lineage and does not independently determine truth, quality, sufficiency, authority, judgment, or mission success.",
  },
  {
    provisionId: "CORE-006",
    title: "Identity and version are exact",
    rule: "Names, similar content, timing, role, or provider shall not substitute for required identity or version. Correction requires an explicit successor and supersession relationship. Shared governed references require exact versions; mutable mission state and authority remain mission-local. Cross-version composition requires an enacted compatibility rule.",
  },
  {
    provisionId: "CORE-007",
    title: "Governed artifacts carry a minimum envelope",
    rule: "Every governed artifact shall preserve identity, type, version, native steward, status, applicable correlation, Core Doctrine version, applicable standard and profile versions, required authority and provenance references, known uncertainty and material contradiction, lifecycle references, and revision or revalidation conditions. A field may be NOT_APPLICABLE only under a cited governing rule and competent determination that states evidence, scope, expiry when applicable, and revision conditions.",
  },
  {
    provisionId: "CORE-008",
    title: "Native stewardship is not transferred by consumption",
    rule: "Native stewards own canonical artifact meaning and lifecycle within enacted authority. Consumers may detect, refuse, locally contain, and return defects but shall not silently repair or rewrite upstream truth. Receipt transfers neither stewardship nor another body's constitutional power.",
  },
  {
    provisionId: "CORE-009",
    title: "Unsupported consequences fail closed",
    rule: "A missing, ineffective, unresolved, or nonconformant required prerequisite denies the exact dependent transition, finding, judgment, disposition, handoff, or action. It does not erase the mission or convert uncertainty into failure. Hold, return, clarify, narrow, contain, seek-authority, or terminate responses require their own applicable rule and authority.",
  },
  {
    provisionId: "CORE-010",
    title: "Quarantine and containment are distinct",
    rule: "Authoritative quarantine changes governed availability and requires native or explicitly delegated lifecycle authority. Local containment prevents use within a consumer boundary, records and reports the exact basis, and does not mutate upstream status.",
  },
  {
    provisionId: "CORE-011",
    title: "Constitutional powers remain separated",
    rule: "Senate legislates Core Doctrine; native stewards govern artifacts within enacted authority; Tribunalis chambers determine bounded dimensions; the Judge synthesizes judgment; Curia chooses operational disposition within authority; and Runtime executes or refuses authorized instructions. Receipt of another body's output creates none of these powers.",
  },
  {
    provisionId: "CORE-012",
    title: "Judgment is multidimensional and non-compensatory",
    rule: "A chamber returns SATISFIED, NOT_SATISFIED, UNRESOLVED, or NOT_APPLICABLE with the support required by its enacted contract. The Judge returns ACCEPTABLE, ACCEPTABLE_WITH_CONDITIONS, NOT_ACCEPTABLE, or UNRESOLVED through a published synthesis rule. No average, opaque score, vote, or confidence percentage shall offset a mandatory NOT_SATISFIED or UNRESOLVED determination.",
  },
  {
    provisionId: "CORE-013",
    title: "Judgment and operational disposition remain separate",
    rule: "Curia may choose a more restrictive disposition but shall not relabel or override Tribunalis findings or judgment. Proceeding requires either ACCEPTABLE or ACCEPTABLE_WITH_CONDITIONS with every mandatory condition evidenced as satisfied, plus independent effective authority. Tribunalis does not acquire operational authority by judging.",
  },
  {
    provisionId: "CORE-014",
    title: "Operator intent forms but does not over-authorize",
    rule: "When received under effective standing service authority, authenticated Operator intent instructs bounded internal inquiry, clarification, and proposed mission formation. It establishes requested purpose, scope, constraints, acceptance criteria, and output but does not prove facts, create standing authority, or authorize external action. Further governed actions require their exact authority prerequisites.",
  },
  {
    provisionId: "CORE-015",
    title: "External obligations exist independently",
    rule: "Law, regulation, contract, professional duty, insurer requirement, and binding order exist independently of Imperium's records. Before claiming conformity or performing a governed action whose permissibility may materially depend on such an obligation, Imperium shall obtain an exact sourced, versioned, scoped applicability determination from the external competent authority or an admitted assessor authorized for that determination. Material unresolved applicability or conflict denies only the dependent claim or action while permitting authorized inquiry.",
  },
  {
    provisionId: "CORE-016",
    title: "Recourse is applicability-driven",
    rule: "Imperium shall determine and record whether notice, review, contest, correction, appeal, or remediation applies under an independently existing obligation, mission authority, enacted standard, or exact Operator commitment. Core Doctrine does not manufacture a universal right. A NOT_APPLICABLE finding requires the lineage specified by CORE-007; material unresolved applicability denies recourse conformance and the dependent action.",
  },
  {
    provisionId: "CORE-017",
    title: "Controls and conformance require inspectable evidence",
    rule: "A claimed control or conformance result shall state observable acceptance evidence, failure evidence, limitations, uncertainty, and invalidation conditions under a cited method and threshold. Absence of required evidence is not approval. Synthetic evidence shall not be represented as operational proof.",
  },
  {
    provisionId: "CORE-018",
    title: "Doctrine propagation is Senator-stewarded",
    rule: "Every enactment or amendment shall issue a versioned propagation notice and assign one Senator as cognitive propagation steward. The Senator declares the discovery method and bounded scope, assesses affected surfaces, issues adoption or revalidation instructions, evaluates responses, escalates adjudicative or legislative issues, and maintains the record to Senate closure. EXEMPTED requires exact competent authority, scope, evidence, expiry when applicable, and revision conditions. The Senator shall not legislate alone, mutate native artifacts, judge for Tribunalis, decide for Curia, or execute Runtime. Citadel and Colosseum prove conformance independently.",
  },
];

export function coreDoctrineV2Bill(
  senateDecisionRef: string,
  assignedSenatorId: string,
  effectiveAt: string,
): DoctrineBill {
  return {
    title: "Core Imperium Doctrine",
    rationale:
      "Correct the v1 representation conflict and Blackquill findings BQ-001 through BQ-007.",
    senateDecisionRef,
    effectiveAt,
    provisions: CORE_DOCTRINE_V2_PROVISIONS.map((provision) => ({ ...provision })),
    affectedOfficeProfiles: ["ALL"],
    assignedSenatorId,
    transitionRule: "MANDATORY_REVALIDATION",
  };
}
