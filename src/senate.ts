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
  assignedSenatorId: string;
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
  assignedSenatorId: string;
  state: "ENACTED";
}

export interface DoctrinePropagationNotice {
  doctrineRef: string;
  affectedOfficeProfiles: string[];
  assignedSenatorId: string;
  requiredAction: "ADOPT_PROSPECTIVELY" | "REVALIDATE";
  state: "AWAITING_OFFICE_CONFORMANCE";
}

export type PropagationSurfaceDisposition =
  | "ADOPTED"
  | "REVALIDATED"
  | "EXEMPTED"
  | "RETIRED"
  | "UNRESOLVED";

export interface PropagationSurfaceAssessment {
  surfaceRef: string;
  disposition: PropagationSurfaceDisposition;
  evidenceRefs: string[];
  instruction: string;
}

export interface DoctrinePropagationDossier {
  doctrineRef: string;
  propagationNoticeRef: string;
  assignedSenatorId: string;
  assessments: PropagationSurfaceAssessment[];
  escalationRefs: string[];
  state: "IN_PROGRESS" | "READY_FOR_SENATE_CLOSURE";
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

/**
 * Cognitive propagation officer assigned by Senate.
 *
 * A Senator interprets an enacted change, issues bounded instructions, and
 * evaluates conformance evidence. The Senator does not legislate alone,
 * mutate Office artifacts, judge for Tribunalis, decide for Curia, or execute
 * Runtime migrations.
 */
export class Senator {
  constructor(readonly senatorId: string) {
    if (!senatorId.trim()) throw new Error("Senator identity is required");
  }

  assessPropagation(
    notice: ArtifactEnvelope<DoctrinePropagationNotice>,
    assessments: PropagationSurfaceAssessment[],
    escalationRefs: string[],
    context: ArtifactContext = {},
  ): ArtifactEnvelope<DoctrinePropagationDossier> {
    assertArtifactEnvelope(notice);
    if (
      notice.artifactType !== "DoctrinePropagationNotice" ||
      notice.producer !== "Senate"
    ) {
      throw new Error("Senator requires a Senate propagation notice");
    }
    if (notice.payload.assignedSenatorId !== this.senatorId) {
      throw new Error("only the assigned Senator may steward propagation");
    }
    validateAssessments(assessments);

    const noticeRef = notice.identity + "@" + notice.version;
    const unresolved = assessments.some(
      (assessment) => assessment.disposition === "UNRESOLVED",
    );
    return createArtifact(
      "DoctrinePropagationDossier",
      "Senator:" + this.senatorId,
      notice.correlationId,
      {
        doctrineRef: notice.payload.doctrineRef,
        propagationNoticeRef: noticeRef,
        assignedSenatorId: this.senatorId,
        assessments: assessments.map((assessment) => ({
          ...assessment,
          surfaceRef: assessment.surfaceRef.trim(),
          evidenceRefs: [...new Set(assessment.evidenceRefs)].sort(),
          instruction: assessment.instruction.trim(),
        })),
        escalationRefs: [...new Set(escalationRefs)].sort(),
        state:
          unresolved || assessments.length === 0
            ? "IN_PROGRESS"
            : "READY_FOR_SENATE_CLOSURE",
      },
      [noticeRef, notice.payload.doctrineRef, ...escalationRefs],
      context,
    );
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
    assignedSenatorId: bill.assignedSenatorId.trim(),
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
      assignedSenatorId: doctrine.payload.assignedSenatorId,
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
  if (!bill.assignedSenatorId.trim()) {
    throw new Error("assigned Senator identity is required");
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

function validateAssessments(assessments: PropagationSurfaceAssessment[]): void {
  const surfaceRefs = new Set<string>();
  for (const assessment of assessments) {
    const surfaceRef = assessment.surfaceRef.trim();
    if (!surfaceRef || !assessment.instruction.trim()) {
      throw new Error("complete propagation assessments are required");
    }
    if (surfaceRefs.has(surfaceRef)) {
      throw new Error("duplicate propagation surface: " + surfaceRef);
    }
    if (
      assessment.disposition !== "UNRESOLVED" &&
      assessment.evidenceRefs.length === 0
    ) {
      throw new Error("resolved propagation assessment requires evidence");
    }
    surfaceRefs.add(surfaceRef);
  }
}
