import {
  ArtifactContext,
  ArtifactEnvelope,
  createArtifact,
} from "./artifact.js";
import { assertArtifactEnvelope } from "./schema.js";

export type DoctrineTransitionRule =
  | "PROSPECTIVE_ADOPTION"
  | "MANDATORY_REVALIDATION";

export interface CoreDoctrineProvision {
  provisionId: string;
  title: string;
  rule: string;
}

export interface DoctrineBill {
  title: string;
  rationale: string;
  senateDecisionRef: string;
  effectiveAt: string;
  provisions: CoreDoctrineProvision[];
  affectedOfficeProfiles: string[];
  transitionRule: DoctrineTransitionRule;
}

export interface CoreDoctrine {
  edition: number;
  title: string;
  rationale: string;
  effectiveAt: string;
  provisions: CoreDoctrineProvision[];
  senateDecisionRef: string;
  transitionRule: DoctrineTransitionRule;
  affectedOfficeProfiles: string[];
  state: "ENACTED";
}

export interface DoctrinePropagationNotice {
  doctrineRef: string;
  affectedOfficeProfiles: string[];
  requiredAction: "ADOPT_PROSPECTIVELY" | "REVALIDATE";
  state: "AWAITING_OFFICE_CONFORMANCE";
}

export interface LegislativeResult {
  doctrine: ArtifactEnvelope<CoreDoctrine>;
  propagation: ArtifactEnvelope<DoctrinePropagationNotice>;
}

/**
 * Legislative body for Core Imperium Doctrine.
 *
 * Senate enacts and supersedes doctrine. It does not apply doctrine for an
 * Office, judge a case, form a mission, forge a Persona, or authorize an
 * operational action.
 */
export class Senate {
  enact(
    bill: DoctrineBill,
    correlationId: string,
    context: ArtifactContext = {},
  ): LegislativeResult {
    validateBill(bill);
    const doctrine = createArtifact(
      "CoreDoctrine",
      "Senate",
      correlationId,
      doctrinePayload(bill, 1),
      [bill.senateDecisionRef],
      context,
    );
    return {
      doctrine,
      propagation: propagationFor(doctrine, context),
    };
  }

  amend(
    current: ArtifactEnvelope<CoreDoctrine>,
    bill: DoctrineBill,
    context: ArtifactContext = {},
  ): LegislativeResult {
    assertArtifactEnvelope(current);
    validateBill(bill);
    if (current.artifactType !== "CoreDoctrine" || current.producer !== "Senate") {
      throw new Error("Senate may amend only Senate-enacted Core Doctrine");
    }
    if (current.status !== "CURRENT" || current.payload.state !== "ENACTED") {
      throw new Error("only current enacted Core Doctrine may be amended");
    }

    const currentRef = current.identity + "@" + current.version;
    const candidate = createArtifact(
      "CoreDoctrine",
      "Senate",
      current.correlationId,
      doctrinePayload(bill, current.payload.edition + 1),
      [currentRef, bill.senateDecisionRef],
      context,
    );
    const doctrine: ArtifactEnvelope<CoreDoctrine> = {
      ...candidate,
      identity: current.identity,
      version: current.version + 1,
      supersedes: currentRef,
    };

    return {
      doctrine,
      propagation: propagationFor(doctrine, context),
    };
  }
}

function doctrinePayload(bill: DoctrineBill, edition: number): CoreDoctrine {
  return {
    edition,
    title: bill.title.trim(),
    rationale: bill.rationale.trim(),
    effectiveAt: bill.effectiveAt,
    provisions: bill.provisions.map((provision) => ({
      provisionId: provision.provisionId.trim(),
      title: provision.title.trim(),
      rule: provision.rule.trim(),
    })),
    senateDecisionRef: bill.senateDecisionRef.trim(),
    transitionRule: bill.transitionRule,
    affectedOfficeProfiles: [...new Set(bill.affectedOfficeProfiles)].sort(),
    state: "ENACTED",
  };
}

function propagationFor(
  doctrine: ArtifactEnvelope<CoreDoctrine>,
  context: ArtifactContext,
): ArtifactEnvelope<DoctrinePropagationNotice> {
  const doctrineRef = doctrine.identity + "@" + doctrine.version;
  return createArtifact(
    "DoctrinePropagationNotice",
    "Senate",
    doctrine.correlationId,
    {
      doctrineRef,
      affectedOfficeProfiles: doctrine.payload.affectedOfficeProfiles,
      requiredAction:
        doctrine.payload.transitionRule === "MANDATORY_REVALIDATION"
          ? "REVALIDATE"
          : "ADOPT_PROSPECTIVELY",
      state: "AWAITING_OFFICE_CONFORMANCE",
    },
    [doctrineRef, doctrine.payload.senateDecisionRef],
    context,
  );
}

function validateBill(bill: DoctrineBill): void {
  if (!bill.title.trim()) throw new Error("doctrine title is required");
  if (!bill.rationale.trim()) throw new Error("legislative rationale is required");
  if (!bill.senateDecisionRef.trim()) {
    throw new Error("Senate decision reference is required");
  }
  if (!bill.effectiveAt.trim() || Number.isNaN(Date.parse(bill.effectiveAt))) {
    throw new Error("valid doctrine effective time is required");
  }
  if (bill.provisions.length === 0) {
    throw new Error("Core Doctrine requires at least one provision");
  }
  const provisionIds = new Set<string>();
  for (const provision of bill.provisions) {
    const id = provision.provisionId.trim();
    if (!id || !provision.title.trim() || !provision.rule.trim()) {
      throw new Error("complete doctrine provisions are required");
    }
    if (provisionIds.has(id)) {
      throw new Error("duplicate doctrine provision: " + id);
    }
    provisionIds.add(id);
  }
}
