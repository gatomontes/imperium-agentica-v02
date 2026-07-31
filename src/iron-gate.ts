import { ArtifactEnvelope, createArtifact } from "./artifact.js";
import { DeploymentPackage } from "./muster.js";

/** A non-executing handoff from Muster to the launch authority boundary. */
export interface LaunchHandoff {
  deploymentPackageRef: string;
  missionRef: string;
  operativePackageRef: string;
  professionQueueRef?: string;
  queuePosition?: number;
  medium: string;
  autonomyClass: DeploymentPackage["autonomyClass"];
  state: "AWAITING_DEPLOYMENT_AUTHORIZATION";
}

export interface DeploymentAuthorization {
  launchHandoffRef: string;
  missionRef: string;
  medium: string;
  autonomyClass: DeploymentPackage["autonomyClass"];
  scope: string;
  decision: "AUTHORIZED_FOR_DEPLOYMENT";
}

export interface AuthenticationRequirement {
  authorizationRef: string;
  missionRef: string;
  subjectRef: string;
  medium: string;
  scope: string;
}

export interface AuthenticationProof {
  requirementRef: string;
  evidenceRef: string;
  presentedBy: string;
  method: string;
}

export interface AuthenticationSatisfaction {
  authorizationRef: string;
  requirementRef: string;
  evidenceRef: string;
  missionRef: string;
  subjectRef: string;
  medium: string;
  scope: string;
  finding: "AUTHENTICATION_REQUIREMENT_SATISFIED";
}

export interface DeploymentPolicyAssessment {
  authorizationRef: string;
  satisfactionRef: string;
  missionRef: string;
  medium: string;
  scope: string;
  finding: "DEPLOYMENT_POLICY_CONFORMANT" | "DEPLOYMENT_POLICY_UNRESOLVED";
}

export interface DeploymentPolicyDisposition {
  assessmentRef: string;
  missionRef: string;
  medium: string;
  scope: string;
  disposition: "CONFORMANT" | "UNRESOLVED";
  authorityGranted: false;
}

export interface DeploymentEligibilityAssessment {
  dispositionRef: string;
  missionRef: string;
  medium: string;
  scope: string;
  finding: "DEPLOYMENT_ELIGIBILITY_CONFORMANT" | "DEPLOYMENT_ELIGIBILITY_UNRESOLVED";
  authorityGranted: false;
}

export interface DeploymentEligibilityDisposition {
  assessmentRef: string;
  missionRef: string;
  medium: string;
  scope: string;
  disposition: "ELIGIBLE" | "INELIGIBLE";
  authorityGranted: false;
}

/** A non-authorizing request for a later, separately governed access decision. */
export interface AccessDecisionRequest {
  eligibilityDispositionRef: string;
  missionRef: string;
  medium: string;
  scope: string;
  decision: "PENDING_ACCESS_DECISION";
  authorityGranted: false;
}

/** A non-authorizing referral to the independent access-decision authority. */
export interface AccessDecisionReferral {
  requestRef: string;
  eligibilityDispositionRef: string;
  missionRef: string;
  medium: string;
  scope: string;
  state: "AWAITING_INDEPENDENT_ACCESS_DECISION";
  authorityGranted: false;
}

export class IronGate {
  prepareLaunchHandoff(
    deploymentPackage: ArtifactEnvelope<DeploymentPackage>,
  ): ArtifactEnvelope<LaunchHandoff> {
    const { payload } = deploymentPackage;
    const queueConformant =
      payload.professionQueueRef === undefined ||
      (payload.professionQueueRef.trim() !== "" &&
        payload.queuePosition !== undefined &&
        Number.isInteger(payload.queuePosition) &&
        payload.queuePosition > 0);

    const deploymentPackageRef = deploymentPackage.identity + "@" + deploymentPackage.version;
    const lineageConformant =
      deploymentPackage.sourceRefs.includes(deploymentPackageRef) === false &&
      deploymentPackage.sourceRefs.length > 0;

    if (
      deploymentPackage.status !== "CURRENT" ||
      payload.state !== "READY_FOR_LAUNCH" ||
      !payload.missionRef.trim() ||
      !payload.operativePackageRef.trim() ||
      !payload.medium.trim() ||
      !queueConformant ||
      !lineageConformant
    ) {
      throw new Error("Iron Gate cannot accept an unresolved Deployment Package");
    }

    return createArtifact(
      "LaunchHandoff",
      "Iron Gate",
      deploymentPackage.correlationId,
      {
        deploymentPackageRef,
        missionRef: payload.missionRef,
        operativePackageRef: payload.operativePackageRef,
        ...(payload.professionQueueRef ? { professionQueueRef: payload.professionQueueRef } : {}),
        ...(payload.queuePosition !== undefined ? { queuePosition: payload.queuePosition } : {}),
        medium: payload.medium,
        autonomyClass: payload.autonomyClass,
        state: "AWAITING_DEPLOYMENT_AUTHORIZATION",
      },
      [deploymentPackageRef],
    );
  }

  authorizeDeployment(
    handoff: ArtifactEnvelope<LaunchHandoff>,
    scope: string,
  ): ArtifactEnvelope<DeploymentAuthorization> {
    const normalizedScope = scope.trim();
    const handoffRef = handoff.identity + "@" + handoff.version;
    if (
      handoff.status !== "CURRENT" ||
      handoff.payload.state !== "AWAITING_DEPLOYMENT_AUTHORIZATION" ||
      !handoff.payload.missionRef.trim() ||
      !handoff.payload.medium.trim() ||
      !normalizedScope ||
      handoff.sourceRefs.length === 0 ||
      handoff.sourceRefs.includes(handoffRef)
    ) {
      throw new Error("Iron Gate cannot authorize an unresolved launch handoff");
    }

    return createArtifact(
      "DeploymentAuthorization",
      "Iron Gate",
      handoff.correlationId,
      {
        launchHandoffRef: handoffRef,
        missionRef: handoff.payload.missionRef,
        medium: handoff.payload.medium,
        autonomyClass: handoff.payload.autonomyClass,
        scope: normalizedScope,
        decision: "AUTHORIZED_FOR_DEPLOYMENT",
      },
      [handoffRef],
    );
  }

  assessAuthenticationProof(
    authorization: ArtifactEnvelope<DeploymentAuthorization>,
    requirement: ArtifactEnvelope<AuthenticationRequirement>,
    proof: ArtifactEnvelope<AuthenticationProof>,
  ): ArtifactEnvelope<AuthenticationSatisfaction> {
    const authorizationRef = authorization.identity + "@" + authorization.version;
    const requirementRef = requirement.identity + "@" + requirement.version;
    const proofRef = proof.identity + "@" + proof.version;
    const exactMatch =
      requirement.payload.authorizationRef === authorizationRef &&
      requirement.payload.missionRef === authorization.payload.missionRef &&
      requirement.payload.medium === authorization.payload.medium &&
      requirement.payload.scope === authorization.payload.scope &&
      proof.payload.requirementRef === requirementRef;

    if (
      authorization.status !== "CURRENT" ||
      authorization.payload.decision !== "AUTHORIZED_FOR_DEPLOYMENT" ||
      requirement.status !== "CURRENT" ||
      proof.status !== "CURRENT" ||
      !requirement.payload.subjectRef.trim() ||
      !proof.payload.evidenceRef.trim() ||
      !proof.payload.presentedBy.trim() ||
      !proof.payload.method.trim() ||
      !exactMatch ||
      requirement.correlationId !== authorization.correlationId ||
      proof.correlationId !== authorization.correlationId ||
      requirement.sourceRefs.includes(requirementRef) ||
      proof.sourceRefs.includes(proofRef)
    ) {
      throw new Error("Iron Gate cannot satisfy an unresolved authentication requirement");
    }

    return createArtifact(
      "AuthenticationSatisfaction",
      "Iron Gate",
      authorization.correlationId,
      {
        authorizationRef,
        requirementRef,
        evidenceRef: proof.payload.evidenceRef,
        missionRef: requirement.payload.missionRef,
        subjectRef: requirement.payload.subjectRef,
        medium: requirement.payload.medium,
        scope: requirement.payload.scope,
        finding: "AUTHENTICATION_REQUIREMENT_SATISFIED",
      },
      [authorizationRef, requirementRef, proofRef],
    );
  }

  assessDeploymentPolicy(
    authorization: ArtifactEnvelope<DeploymentAuthorization>,
    satisfaction: ArtifactEnvelope<AuthenticationSatisfaction>,
  ): ArtifactEnvelope<DeploymentPolicyAssessment> {
    const authorizationRef = authorization.identity + "@" + authorization.version;
    const satisfactionRef = satisfaction.identity + "@" + satisfaction.version;
    const exactMatch =
      satisfaction.payload.authorizationRef === authorizationRef &&
      satisfaction.payload.missionRef === authorization.payload.missionRef &&
      satisfaction.payload.medium === authorization.payload.medium &&
      satisfaction.payload.scope === authorization.payload.scope &&
      satisfaction.payload.finding === "AUTHENTICATION_REQUIREMENT_SATISFIED";
    const validLineage =
      authorization.sourceRefs.includes(authorizationRef) === false &&
      satisfaction.sourceRefs.includes(satisfactionRef) === false &&
      satisfaction.sourceRefs.includes(authorizationRef);

    if (
      authorization.status !== "CURRENT" ||
      authorization.payload.decision !== "AUTHORIZED_FOR_DEPLOYMENT" ||
      satisfaction.status !== "CURRENT" ||
      !authorization.payload.missionRef.trim() ||
      !authorization.payload.medium.trim() ||
      !authorization.payload.scope.trim() ||
      !satisfaction.payload.evidenceRef.trim() ||
      !exactMatch ||
      !validLineage ||
      satisfaction.correlationId !== authorization.correlationId
    ) {
      throw new Error("Iron Gate cannot establish deployment policy convergence");
    }

    return createArtifact(
      "DeploymentPolicyAssessment",
      "Iron Gate",
      authorization.correlationId,
      {
        authorizationRef,
        satisfactionRef,
        missionRef: authorization.payload.missionRef,
        medium: authorization.payload.medium,
        scope: authorization.payload.scope,
        finding: "DEPLOYMENT_POLICY_CONFORMANT",
      },
      [authorizationRef, satisfactionRef],
    );
  }

  recordDeploymentPolicyDisposition(
    assessment: ArtifactEnvelope<DeploymentPolicyAssessment>,
  ): ArtifactEnvelope<DeploymentPolicyDisposition> {
    const assessmentRef = assessment.identity + "@" + assessment.version;
    if (
      assessment.status !== "CURRENT" ||
      assessment.artifactType !== "DeploymentPolicyAssessment" ||
      !assessment.payload.missionRef.trim() ||
      !assessment.payload.medium.trim() ||
      !assessment.payload.scope.trim() ||
      (assessment.payload.finding !== "DEPLOYMENT_POLICY_CONFORMANT" &&
        assessment.payload.finding !== "DEPLOYMENT_POLICY_UNRESOLVED") ||
      assessment.sourceRefs.includes(assessmentRef)
    ) {
      throw new Error("Iron Gate cannot disposition an unresolved policy assessment");
    }

    return createArtifact(
      "DeploymentPolicyDisposition",
      "Iron Gate",
      assessment.correlationId,
      {
        assessmentRef,
        missionRef: assessment.payload.missionRef,
        medium: assessment.payload.medium,
        scope: assessment.payload.scope,
        disposition:
          assessment.payload.finding === "DEPLOYMENT_POLICY_CONFORMANT"
            ? "CONFORMANT"
            : "UNRESOLVED",
        authorityGranted: false,
      },
      [assessmentRef],
    );
  }

  assessDeploymentEligibility(
    disposition: ArtifactEnvelope<DeploymentPolicyDisposition>,
  ): ArtifactEnvelope<DeploymentEligibilityAssessment> {
    const dispositionRef = disposition.identity + "@" + disposition.version;
    const validDisposition =
      disposition.payload.disposition === "CONFORMANT" ||
      disposition.payload.disposition === "UNRESOLVED";
    if (
      disposition.status !== "CURRENT" ||
      disposition.artifactType !== "DeploymentPolicyDisposition" ||
      !disposition.payload.missionRef.trim() ||
      !disposition.payload.medium.trim() ||
      !disposition.payload.scope.trim() ||
      !validDisposition ||
      disposition.payload.authorityGranted !== false ||
      !disposition.payload.assessmentRef.trim() ||
      !disposition.sourceRefs.includes(disposition.payload.assessmentRef) ||
      disposition.sourceRefs.includes(dispositionRef)
    ) {
      throw new Error("Iron Gate cannot assess an unresolved deployment disposition");
    }

    const conformant = disposition.payload.disposition === "CONFORMANT";
    return createArtifact(
      "DeploymentEligibilityAssessment",
      "Iron Gate",
      disposition.correlationId,
      {
        dispositionRef,
        missionRef: disposition.payload.missionRef,
        medium: disposition.payload.medium,
        scope: disposition.payload.scope,
        finding: conformant
          ? "DEPLOYMENT_ELIGIBILITY_CONFORMANT"
          : "DEPLOYMENT_ELIGIBILITY_UNRESOLVED",
        authorityGranted: false,
      },
      [dispositionRef],
    );
  }

  recordDeploymentEligibilityDisposition(
    assessment: ArtifactEnvelope<DeploymentEligibilityAssessment>,
  ): ArtifactEnvelope<DeploymentEligibilityDisposition> {
    const assessmentRef = assessment.identity + "@" + assessment.version;
    const validFinding =
      assessment.payload.finding === "DEPLOYMENT_ELIGIBILITY_CONFORMANT" ||
      assessment.payload.finding === "DEPLOYMENT_ELIGIBILITY_UNRESOLVED";
    if (
      assessment.status !== "CURRENT" ||
      assessment.artifactType !== "DeploymentEligibilityAssessment" ||
      !assessment.payload.missionRef.trim() ||
      !assessment.payload.medium.trim() ||
      !assessment.payload.scope.trim() ||
      !validFinding ||
      assessment.payload.authorityGranted !== false ||
      !assessment.payload.dispositionRef.trim() ||
      !assessment.sourceRefs.includes(assessment.payload.dispositionRef) ||
      assessment.sourceRefs.includes(assessmentRef)
    ) {
      throw new Error("Iron Gate cannot disposition an unresolved deployment eligibility assessment");
    }

    return createArtifact(
      "DeploymentEligibilityDisposition",
      "Iron Gate",
      assessment.correlationId,
      {
        assessmentRef,
        missionRef: assessment.payload.missionRef,
        medium: assessment.payload.medium,
        scope: assessment.payload.scope,
        disposition:
          assessment.payload.finding === "DEPLOYMENT_ELIGIBILITY_CONFORMANT"
            ? "ELIGIBLE"
            : "INELIGIBLE",
        authorityGranted: false,
      },
      [assessmentRef],
    );
  }

  requestAccessDecision(
    disposition: ArtifactEnvelope<DeploymentEligibilityDisposition>,
  ): ArtifactEnvelope<AccessDecisionRequest> {
    const dispositionRef = disposition.identity + "@" + disposition.version;
    if (
      disposition.status !== "CURRENT" ||
      disposition.artifactType !== "DeploymentEligibilityDisposition" ||
      disposition.payload.disposition !== "ELIGIBLE" ||
      disposition.payload.authorityGranted !== false ||
      !disposition.payload.missionRef.trim() ||
      !disposition.payload.medium.trim() ||
      !disposition.payload.scope.trim() ||
      !disposition.payload.assessmentRef.trim() ||
      !disposition.sourceRefs.includes(disposition.payload.assessmentRef) ||
      disposition.sourceRefs.includes(dispositionRef)
    ) {
      throw new Error("Iron Gate cannot request access from an unresolved eligibility disposition");
    }

    return createArtifact(
      "AccessDecisionRequest",
      "Iron Gate",
      disposition.correlationId,
      {
        eligibilityDispositionRef: dispositionRef,
        missionRef: disposition.payload.missionRef,
        medium: disposition.payload.medium,
        scope: disposition.payload.scope,
        decision: "PENDING_ACCESS_DECISION",
        authorityGranted: false,
      },
      [dispositionRef],
    );
  }

  referAccessDecision(
    request: ArtifactEnvelope<AccessDecisionRequest>,
  ): ArtifactEnvelope<AccessDecisionReferral> {
    const requestRef = request.identity + "@" + request.version;
    if (
      request.status !== "CURRENT" ||
      request.artifactType !== "AccessDecisionRequest" ||
      request.payload.decision !== "PENDING_ACCESS_DECISION" ||
      request.payload.authorityGranted !== false ||
      !request.payload.eligibilityDispositionRef.trim() ||
      !request.payload.missionRef.trim() ||
      !request.payload.medium.trim() ||
      !request.payload.scope.trim() ||
      !request.sourceRefs.includes(request.payload.eligibilityDispositionRef) ||
      request.sourceRefs.includes(requestRef)
    ) {
      throw new Error("Iron Gate cannot refer an unresolved access decision request");
    }

    return createArtifact(
      "AccessDecisionReferral",
      "Iron Gate",
      request.correlationId,
      {
        requestRef,
        eligibilityDispositionRef: request.payload.eligibilityDispositionRef,
        missionRef: request.payload.missionRef,
        medium: request.payload.medium,
        scope: request.payload.scope,
        state: "AWAITING_INDEPENDENT_ACCESS_DECISION",
        authorityGranted: false,
      },
      [requestRef, request.payload.eligibilityDispositionRef],
    );
  }
}
