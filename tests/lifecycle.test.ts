import { describe, expect, it } from "vitest";
import { Conscription } from "../src/conscription.js";
import { transitionOperativePackage } from "../src/lifecycle.js";
import { ReferenceCreationTrace } from "../src/reference-trace.js";
import { Muster } from "../src/muster.js";
import { IronGate } from "../src/iron-gate.js";
import { createArtifact } from "../src/artifact.js";
import { PersonaReadiness } from "../src/persona-readiness.js";

describe("Operative Package lifecycle guard", () => {
  it("records deferred production readiness without granting authority", () => {
    const trace = new ReferenceCreationTrace().run();
    const readiness = new PersonaReadiness().assess(trace.operative, [
      { kind: "CREATION_CHAIN", established: true, reference: "creation-chain@1" },
      { kind: "LINEAGE", established: true, reference: "lineage@1" },
      { kind: "BOUNDARIES", established: true, reference: "boundaries@1" },
      { kind: "OPERATIONAL_PROOF", established: false, reference: "synthetic-only@1" },
      { kind: "PRODUCTION_ACCEPTANCE", established: false, reference: "not-admitted@1" },
    ]);

    expect(readiness.payload.finding).toBe("READY_DEFERRED");
    expect(readiness.payload.liveAuthorityGranted).toBe(false);
    expect(readiness.payload.activationAuthorized).toBe(false);
    expect(readiness.payload.deploymentAuthorized).toBe(false);
    expect(readiness.payload.evidenceAssessment).toHaveLength(5);
    expect(readiness.sourceRefs[0]).toBe(trace.operative.identity + "@" + trace.operative.version);
  });

  it("keeps readiness deferred for duplicate or unknown evidence categories", () => {
    const trace = new ReferenceCreationTrace().run();
    const readiness = new PersonaReadiness().assess(trace.operative, [
      { kind: "CREATION_CHAIN", established: true, reference: "creation-chain@1" },
      { kind: "CREATION_CHAIN", established: true, reference: "duplicate@1" },
      { kind: "LINEAGE", established: true, reference: "lineage@1" },
      { kind: "BOGUS" as never, established: true, reference: "bogus@1" },
    ]);

    expect(readiness.payload.finding).toBe("READY_DEFERRED");
    expect(readiness.payload.evidenceAssessment.find((item) => item.kind === "PRODUCTION_ACCEPTANCE")?.established).toBe(false);
  });

  it("keeps production acceptance non-authorizing", () => {
    const trace = new ReferenceCreationTrace().run();
    const readiness = new PersonaReadiness().assess(trace.operative, [
      { kind: "CREATION_CHAIN", established: true, reference: "creation-chain@1" },
      { kind: "LINEAGE", established: true, reference: "lineage@1" },
      { kind: "BOUNDARIES", established: true, reference: "boundaries@1" },
      { kind: "OPERATIONAL_PROOF", established: false, reference: "synthetic-only@1" },
      { kind: "PRODUCTION_ACCEPTANCE", established: false, reference: "not-admitted@1" },
    ]);
    const acceptance = new PersonaReadiness().assessAcceptance(readiness, {
      operationalProofRef: "synthetic-only@1",
      productionAcceptanceRef: "not-admitted@1",
    });

    expect(acceptance.payload.finding).toBe("ACCEPTANCE_DEFERRED");
    expect(acceptance.payload.productionAccepted).toBe(false);
    expect(acceptance.payload.liveAuthorityGranted).toBe(false);
  });

  it("records an acceptance disposition without admitting production", () => {
    const trace = new ReferenceCreationTrace().run();
    const readiness = new PersonaReadiness().assess(trace.operative, [
      { kind: "CREATION_CHAIN", established: true, reference: "creation-chain@1" },
      { kind: "LINEAGE", established: true, reference: "lineage@1" },
      { kind: "BOUNDARIES", established: true, reference: "boundaries@1" },
      { kind: "OPERATIONAL_PROOF", established: false, reference: "synthetic-only@1" },
      { kind: "PRODUCTION_ACCEPTANCE", established: false, reference: "not-admitted@1" },
    ]);
    const acceptance = new PersonaReadiness().assessAcceptance(readiness, {
      operationalProofRef: "synthetic-only@1",
      productionAcceptanceRef: "not-admitted@1",
    });
    const disposition = new PersonaReadiness().recordAcceptanceDisposition(acceptance);

    expect(disposition.payload.acceptanceAssessmentRef).toBe(acceptance.identity + "@" + acceptance.version);
    expect(disposition.payload.finding).toBe("ACCEPTANCE_DEFERRED");
    expect(disposition.payload.productionAccepted).toBe(false);
    expect(disposition.payload.activationAuthorized).toBe(false);
  });

  it("keeps acceptance deferred when evidence does not belong to readiness", () => {
    const trace = new ReferenceCreationTrace().run();
    const readiness = new PersonaReadiness().assess(trace.operative, [
      { kind: "CREATION_CHAIN", established: true, reference: "creation-chain@1" },
      { kind: "LINEAGE", established: true, reference: "lineage@1" },
      { kind: "BOUNDARIES", established: true, reference: "boundaries@1" },
      { kind: "OPERATIONAL_PROOF", established: false, reference: "synthetic-only@1" },
      { kind: "PRODUCTION_ACCEPTANCE", established: false, reference: "not-admitted@1" },
    ]);
    const acceptance = new PersonaReadiness().assessAcceptance(readiness, {
      operationalProofRef: "other-proof@1",
      productionAcceptanceRef: "not-admitted@1",
    });

    expect(acceptance.payload.finding).toBe("ACCEPTANCE_DEFERRED");
    expect(acceptance.sourceRefs).toContain("other-proof@1");
  });

  it("rejects a self-referential acceptance disposition", () => {
    const trace = new ReferenceCreationTrace().run();
    const readiness = new PersonaReadiness().assess(trace.operative, []);
    const acceptance = new PersonaReadiness().assessAcceptance(readiness, {
      operationalProofRef: "synthetic-only@1",
      productionAcceptanceRef: "not-admitted@1",
    });
    const malformed = {
      ...acceptance,
      sourceRefs: [...acceptance.sourceRefs, acceptance.identity + "@" + acceptance.version],
    };

    expect(() => new PersonaReadiness().recordAcceptanceDisposition(malformed)).toThrow(
      "invalid acceptance assessment",
    );
  });

  it("rejects incomplete acceptance lineage", () => {
    const trace = new ReferenceCreationTrace().run();
    const readiness = new PersonaReadiness().assess(trace.operative, []);
    const acceptance = new PersonaReadiness().assessAcceptance(readiness, {
      operationalProofRef: "synthetic-only@1",
      productionAcceptanceRef: "not-admitted@1",
    });
    const malformed = { ...acceptance, sourceRefs: [acceptance.sourceRefs[0]] };

    expect(() => new PersonaReadiness().recordAcceptanceDisposition(malformed)).toThrow(
      "complete acceptance lineage",
    );
  });

  it("requires explicit sequential transitions", () => {
    const trace = new ReferenceCreationTrace().run();
    const pending = transitionOperativePackage(
      trace.operative,
      "ACTIVATION_PENDING",
    );
    const bound = transitionOperativePackage(pending, "MISSION_BOUND");

    expect(pending.supersedes).toBe(
      trace.operative.identity + "@" + trace.operative.version,
    );
    expect(bound.supersedes).toBe(pending.identity + "@" + pending.version);
    expect(bound.payload.state).toBe("MISSION_BOUND");
    expect(bound.version).toBe(trace.operative.version + 2);
  });

  it("rejects packaging directly to deployment", () => {
    const trace = new ReferenceCreationTrace().run();
    expect(() =>
      transitionOperativePackage(trace.operative, "DEPLOYED"),
    ).toThrow("invalid Operative Package transition");
  });

  it("preserves the profession queue assignment across package successors", () => {
    const trace = new ReferenceCreationTrace().run();
    const queuedPersona = {
      ...trace.persona,
      payload: {
        ...trace.persona.payload,
        professionQueueRef: "professionqueue-001@1",
        queuePosition: 3,
      },
    };
    const queuedPackage = new Conscription().package(queuedPersona, "node-reference", "A2");
    const successor = transitionOperativePackage(queuedPackage, "ACTIVATION_PENDING");

    expect(successor.payload.professionQueueRef).toBe("professionqueue-001@1");
    expect(successor.payload.queuePosition).toBe(3);
    expect(successor.payload.state).toBe("ACTIVATION_PENDING");
    expect(successor.supersedes).toBe(queuedPackage.identity + "@" + queuedPackage.version);
  });

  it("prepares a non-executing Muster brief with package lineage", () => {
    const trace = new ReferenceCreationTrace().run();
    const queuedPersona = {
      ...trace.persona,
      payload: {
        ...trace.persona.payload,
        professionQueueRef: "professionqueue-001@1",
        queuePosition: 3,
      },
    };
    const queuedPackage = new Conscription().package(queuedPersona, "node-reference", "A2");
    const pending = transitionOperativePackage(queuedPackage, "ACTIVATION_PENDING");
    const brief = new Muster().prepareMissionBrief(pending);

    expect(brief.payload.operativePackageRef).toBe(pending.identity + "@" + pending.version);
    expect(brief.payload.professionQueueRef).toBe("professionqueue-001@1");
    expect(brief.payload.queuePosition).toBe(3);
    expect(brief.payload.state).toBe("MISSION_BRIEF_PREPARED");
    expect(brief.sourceRefs).toEqual([pending.identity + "@" + pending.version]);
  });

  it("rejects a package that has not reached activation pending", () => {
    const trace = new ReferenceCreationTrace().run();
    expect(() => new Muster().prepareMissionBrief(trace.operative)).toThrow(
      "Muster cannot prepare a brief",
    );
  });

  it("binds a prepared brief without activating or releasing it", () => {
    const trace = new ReferenceCreationTrace().run();
    const queuedPersona = {
      ...trace.persona,
      payload: {
        ...trace.persona.payload,
        professionQueueRef: "professionqueue-001@1",
        queuePosition: 3,
      },
    };
    const queuedPackage = new Conscription().package(queuedPersona, "node-reference", "A2");
    const pending = transitionOperativePackage(queuedPackage, "ACTIVATION_PENDING");
    const prepared = new Muster().prepareMissionBrief(pending);
    const bound = new Muster().bindMission(prepared, "mission-001");

    expect(bound.payload.state).toBe("MISSION_BOUND");
    expect(bound.payload.missionRef).toBe("mission-001");
    expect(bound.payload.professionQueueRef).toBe("professionqueue-001@1");
    expect(bound.payload.queuePosition).toBe(3);
    expect(bound.supersedes).toBe(prepared.identity + "@" + prepared.version);
  });

  it("rejects blank mission references and rebinding", () => {
    const trace = new ReferenceCreationTrace().run();
    const pending = transitionOperativePackage(trace.operative, "ACTIVATION_PENDING");
    const prepared = new Muster().prepareMissionBrief(pending);

    expect(() => new Muster().bindMission(prepared, "  ")).toThrow(
      "Muster cannot bind an unresolved mission brief",
    );
    const bound = new Muster().bindMission(prepared, "mission-002");
    expect(() => new Muster().bindMission(bound, "mission-003")).toThrow(
      "Muster cannot bind an unresolved mission brief",
    );
  });

  it("assembles a bound brief into a non-ready Deployment Package", () => {
    const trace = new ReferenceCreationTrace().run();
    const queuedPersona = {
      ...trace.persona,
      payload: {
        ...trace.persona.payload,
        professionQueueRef: "professionqueue-001@1",
        queuePosition: 3,
      },
    };
    const queuedPackage = new Conscription().package(queuedPersona, "node-reference", "A2");
    const pending = transitionOperativePackage(queuedPackage, "ACTIVATION_PENDING");
    const prepared = new Muster().prepareMissionBrief(pending);
    const bound = new Muster().bindMission(prepared, "mission-assembly-001");
    const assembled = new Muster().assembleDeploymentPackage(bound);

    expect(assembled.artifactType).toBe("DeploymentPackage");
    expect(assembled.payload.state).toBe("MISSION_ASSEMBLED");
    expect(assembled.payload.missionRef).toBe("mission-assembly-001");
    expect(assembled.payload.professionQueueRef).toBe("professionqueue-001@1");
    expect(assembled.payload.queuePosition).toBe(3);
    expect(assembled.sourceRefs).toEqual([
      bound.identity + "@" + bound.version,
      pending.identity + "@" + pending.version,
    ]);
  });

  it("does not assemble an unbound or already assembled brief", () => {
    const trace = new ReferenceCreationTrace().run();
    const pending = transitionOperativePackage(trace.operative, "ACTIVATION_PENDING");
    const prepared = new Muster().prepareMissionBrief(pending);
    const muster = new Muster();

    expect(() => muster.assembleDeploymentPackage(prepared)).toThrow(
      "Muster cannot assemble an unresolved mission brief",
    );
    const bound = muster.bindMission(prepared, "mission-assembly-002");
    const assembled = muster.assembleDeploymentPackage(bound);
    expect(() => muster.assembleDeploymentPackage(assembled as never)).toThrow(
      "Muster cannot assemble an unresolved mission brief",
    );
  });

  it("marks a complete assembled package ready without authorizing launch", () => {
    const trace = new ReferenceCreationTrace().run();
    const queuedPersona = {
      ...trace.persona,
      payload: {
        ...trace.persona.payload,
        professionQueueRef: "professionqueue-001@1",
        queuePosition: 3,
      },
    };
    const packageArtifact = new Conscription().package(queuedPersona, "node-reference", "A2");
    const pending = transitionOperativePackage(packageArtifact, "ACTIVATION_PENDING");
    const muster = new Muster();
    const bound = muster.bindMission(muster.prepareMissionBrief(pending), "mission-ready-001");
    const assembled = muster.assembleDeploymentPackage(bound);
    const ready = muster.markReadyForLaunch(assembled);

    expect(ready.payload.state).toBe("READY_FOR_LAUNCH");
    expect(ready.payload.missionRef).toBe("mission-ready-001");
    expect(ready.payload.professionQueueRef).toBe("professionqueue-001@1");
    expect(ready.payload.queuePosition).toBe(3);
    expect(ready.supersedes).toBe(assembled.identity + "@" + assembled.version);
  });

  it("rejects incomplete, stale, or already-ready deployment packages", () => {
    const trace = new ReferenceCreationTrace().run();
    const pending = transitionOperativePackage(trace.operative, "ACTIVATION_PENDING");
    const muster = new Muster();
    const bound = muster.bindMission(muster.prepareMissionBrief(pending), "mission-ready-002");
    const assembled = muster.assembleDeploymentPackage(bound);

    expect(() => muster.markReadyForLaunch(bound as never)).toThrow(
      "Muster cannot mark an unresolved Deployment Package ready",
    );
    const ready = muster.markReadyForLaunch(assembled);
    expect(() => muster.markReadyForLaunch(ready)).toThrow(
      "Muster cannot mark an unresolved Deployment Package ready",
    );
    expect(() => muster.markReadyForLaunch({ ...assembled, status: "SUPERSEDED" })).toThrow(
      "Muster cannot mark an unresolved Deployment Package ready",
    );
  });

  it("hands a ready package to Iron Gate without inferring authorization or crossing", () => {
    const trace = new ReferenceCreationTrace().run();
    const queuedPersona = {
      ...trace.persona,
      payload: {
        ...trace.persona.payload,
        professionQueueRef: "professionqueue-001@1",
        queuePosition: 3,
      },
    };
    const packageArtifact = new Conscription().package(queuedPersona, "node-reference", "A2");
    const pending = transitionOperativePackage(packageArtifact, "ACTIVATION_PENDING");
    const muster = new Muster();
    const bound = muster.bindMission(muster.prepareMissionBrief(pending), "mission-gate-001");
    const ready = muster.markReadyForLaunch(muster.assembleDeploymentPackage(bound));
    const handoff = new IronGate().prepareLaunchHandoff(ready);

    expect(handoff.artifactType).toBe("LaunchHandoff");
    expect(handoff.payload.state).toBe("AWAITING_DEPLOYMENT_AUTHORIZATION");
    expect(handoff.payload.missionRef).toBe("mission-gate-001");
    expect(handoff.payload.professionQueueRef).toBe("professionqueue-001@1");
    expect(handoff.payload.queuePosition).toBe(3);
    expect(handoff.sourceRefs).toEqual([ready.identity + "@" + ready.version]);
  });

  it("rejects non-ready or stale packages at the Iron Gate handoff", () => {
    const trace = new ReferenceCreationTrace().run();
    const pending = transitionOperativePackage(trace.operative, "ACTIVATION_PENDING");
    const muster = new Muster();
    const bound = muster.bindMission(muster.prepareMissionBrief(pending), "mission-gate-002");
    const assembled = muster.assembleDeploymentPackage(bound);
    const gate = new IronGate();

    expect(() => gate.prepareLaunchHandoff(assembled)).toThrow(
      "Iron Gate cannot accept an unresolved Deployment Package",
    );
    const ready = muster.markReadyForLaunch(assembled);
    expect(() => gate.prepareLaunchHandoff({ ...ready, status: "SUPERSEDED" })).toThrow(
      "Iron Gate cannot accept an unresolved Deployment Package",
    );
  });

  it("rejects malformed queue positions and incomplete package lineage", () => {
    const trace = new ReferenceCreationTrace().run();
    const pending = transitionOperativePackage(trace.operative, "ACTIVATION_PENDING");
    const muster = new Muster();
    const bound = muster.bindMission(muster.prepareMissionBrief(pending), "mission-gate-003");
    const assembled = muster.assembleDeploymentPackage(bound);
    const ready = muster.markReadyForLaunch(assembled);
    const gate = new IronGate();

    expect(() => gate.prepareLaunchHandoff({
      ...ready,
      payload: { ...ready.payload, professionQueueRef: "queue-1@1", queuePosition: 0 },
    })).toThrow("Iron Gate cannot accept an unresolved Deployment Package");
    expect(() => gate.prepareLaunchHandoff({ ...ready, sourceRefs: [] })).toThrow(
      "Iron Gate cannot accept an unresolved Deployment Package",
    );
  });

  it("records explicit provider-neutral deployment authorization", () => {
    const trace = new ReferenceCreationTrace().run();
    const pending = transitionOperativePackage(trace.operative, "ACTIVATION_PENDING");
    const muster = new Muster();
    const bound = muster.bindMission(muster.prepareMissionBrief(pending), "mission-auth-001");
    const ready = muster.markReadyForLaunch(muster.assembleDeploymentPackage(bound));
    const gate = new IronGate();
    const handoff = gate.prepareLaunchHandoff(ready);
    const authorization = gate.authorizeDeployment(handoff, "mission-scoped deployment only");

    expect(authorization.artifactType).toBe("DeploymentAuthorization");
    expect(authorization.payload.launchHandoffRef).toBe(handoff.identity + "@" + handoff.version);
    expect(authorization.payload.decision).toBe("AUTHORIZED_FOR_DEPLOYMENT");
    expect(authorization.payload.scope).toBe("mission-scoped deployment only");
    expect(authorization.sourceRefs).toEqual([handoff.identity + "@" + handoff.version]);
  });

  it("rejects blank scope, stale handoffs, and duplicate self-lineage", () => {
    const trace = new ReferenceCreationTrace().run();
    const pending = transitionOperativePackage(trace.operative, "ACTIVATION_PENDING");
    const muster = new Muster();
    const bound = muster.bindMission(muster.prepareMissionBrief(pending), "mission-auth-002");
    const ready = muster.markReadyForLaunch(muster.assembleDeploymentPackage(bound));
    const gate = new IronGate();
    const handoff = gate.prepareLaunchHandoff(ready);

    expect(() => gate.authorizeDeployment(handoff, " ")).toThrow(
      "Iron Gate cannot authorize an unresolved launch handoff",
    );
    expect(() => gate.authorizeDeployment({ ...handoff, status: "SUPERSEDED" }, "bounded")).toThrow(
      "Iron Gate cannot authorize an unresolved launch handoff",
    );
    expect(() => gate.authorizeDeployment({ ...handoff, sourceRefs: [handoff.identity + "@" + handoff.version] }, "bounded")).toThrow(
      "Iron Gate cannot authorize an unresolved launch handoff",
    );
  });

  it("assesses one exact authentication proof without creating access or credentials", () => {
    const trace = new ReferenceCreationTrace().run();
    const pending = transitionOperativePackage(trace.operative, "ACTIVATION_PENDING");
    const muster = new Muster();
    const bound = muster.bindMission(muster.prepareMissionBrief(pending), "mission-auth-proof-001");
    const ready = muster.markReadyForLaunch(muster.assembleDeploymentPackage(bound));
    const gate = new IronGate();
    const handoff = gate.prepareLaunchHandoff(ready);
    const authorization = gate.authorizeDeployment(handoff, "bounded deployment");
    const authRef = authorization.identity + "@" + authorization.version;
    const requirement = {
      artifactType: "AuthenticationRequirement",
      identity: "authentication-requirement-001",
      version: 1,
      status: "CURRENT" as const,
      producer: "Authority",
      correlationId: authorization.correlationId,
      createdAt: authorization.createdAt,
      payload: {
        authorizationRef: authRef,
        missionRef: authorization.payload.missionRef,
        subjectRef: "operative-package-001",
        medium: authorization.payload.medium,
        scope: authorization.payload.scope,
      },
      sourceRefs: [authRef],
    };
    const requirementRef = requirement.identity + "@" + requirement.version;
    const proof = {
      artifactType: "AuthenticationProof",
      identity: "authentication-proof-001",
      version: 1,
      status: "CURRENT" as const,
      producer: "Authentication Boundary",
      correlationId: authorization.correlationId,
      createdAt: authorization.createdAt,
      payload: {
        requirementRef,
        evidenceRef: "evidence-001",
        presentedBy: "subject-001",
        method: "synthetic-proof-presentation",
      },
      sourceRefs: [requirementRef],
    };

    const finding = gate.assessAuthenticationProof(authorization, requirement, proof);

    expect(finding.artifactType).toBe("AuthenticationSatisfaction");
    expect(finding.payload.authorizationRef).toBe(authRef);
    expect(finding.payload.requirementRef).toBe(requirementRef);
    expect(finding.payload.evidenceRef).toBe("evidence-001");
    expect(finding.payload.finding).toBe("AUTHENTICATION_REQUIREMENT_SATISFIED");
    expect(finding.sourceRefs).toEqual([authRef, requirementRef, "authentication-proof-001@1"]);

    const assessment = gate.assessDeploymentPolicy(authorization, finding);
    expect(assessment.artifactType).toBe("DeploymentPolicyAssessment");
    expect(assessment.payload.finding).toBe("DEPLOYMENT_POLICY_CONFORMANT");
    expect(assessment.payload.satisfactionRef).toBe(finding.identity + "@" + finding.version);
    expect(assessment.sourceRefs).toEqual([authRef, finding.identity + "@" + finding.version]);

    const disposition = gate.recordDeploymentPolicyDisposition(assessment);
    expect(disposition.artifactType).toBe("DeploymentPolicyDisposition");
    expect(disposition.payload.disposition).toBe("CONFORMANT");
    expect(disposition.payload.authorityGranted).toBe(false);
    expect(disposition.sourceRefs).toEqual([assessment.identity + "@" + assessment.version]);
  });

  it("rejects mismatched authorization, correlation, or proof requirement", () => {
    const trace = new ReferenceCreationTrace().run();
    const pending = transitionOperativePackage(trace.operative, "ACTIVATION_PENDING");
    const muster = new Muster();
    const bound = muster.bindMission(muster.prepareMissionBrief(pending), "mission-auth-proof-002");
    const ready = muster.markReadyForLaunch(muster.assembleDeploymentPackage(bound));
    const gate = new IronGate();
    const authorization = gate.authorizeDeployment(gate.prepareLaunchHandoff(ready), "bounded deployment");
    const authRef = authorization.identity + "@" + authorization.version;
    const requirement = {
      artifactType: "AuthenticationRequirement",
      identity: "authentication-requirement-002",
      version: 1,
      status: "CURRENT" as const,
      producer: "Authority",
      correlationId: authorization.correlationId,
      createdAt: authorization.createdAt,
      payload: { authorizationRef: authRef, missionRef: authorization.payload.missionRef, subjectRef: "subject-002", medium: authorization.payload.medium, scope: authorization.payload.scope },
      sourceRefs: [authRef],
    };
    const requirementRef = requirement.identity + "@" + requirement.version;
    const proof = {
      artifactType: "AuthenticationProof",
      identity: "authentication-proof-002",
      version: 1,
      status: "CURRENT" as const,
      producer: "Authentication Boundary",
      correlationId: "other-correlation",
      createdAt: authorization.createdAt,
      payload: { requirementRef: "wrong-requirement@1", evidenceRef: "evidence-002", presentedBy: "subject-002", method: "synthetic" },
      sourceRefs: [requirementRef],
    };

    expect(() => gate.assessAuthenticationProof(authorization, requirement, proof)).toThrow(
      "Iron Gate cannot satisfy an unresolved authentication requirement",
    );
  });

  it("does not establish policy convergence from stale or unrelated satisfaction", () => {
    const trace = new ReferenceCreationTrace().run();
    const pending = transitionOperativePackage(trace.operative, "ACTIVATION_PENDING");
    const muster = new Muster();
    const bound = muster.bindMission(muster.prepareMissionBrief(pending), "mission-policy-convergence-001");
    const ready = muster.markReadyForLaunch(muster.assembleDeploymentPackage(bound));
    const gate = new IronGate();
    const authorization = gate.authorizeDeployment(gate.prepareLaunchHandoff(ready), "bounded deployment");
    const unrelated = createArtifact("AuthenticationSatisfaction", "test", authorization.correlationId, {
      authorizationRef: "other@1", requirementRef: "requirement@1", evidenceRef: "evidence", missionRef: authorization.payload.missionRef,
      subjectRef: "subject", medium: authorization.payload.medium, scope: authorization.payload.scope,
      finding: "AUTHENTICATION_REQUIREMENT_SATISFIED" as const,
    }, ["other@1"]);
    expect(() => gate.assessDeploymentPolicy(authorization, unrelated)).toThrow(
      "Iron Gate cannot establish deployment policy convergence",
    );
  });

  it("records unresolved disposition without granting authority", () => {
    const assessment = createArtifact(
      "DeploymentPolicyAssessment",
      "Iron Gate",
      "mission-policy-disposition-001",
      {
        authorizationRef: "authorization-001@1",
        satisfactionRef: "satisfaction-001@1",
        missionRef: "mission-policy-disposition-001",
        medium: "synthetic-medium",
        scope: "bounded deployment",
        finding: "DEPLOYMENT_POLICY_UNRESOLVED" as const,
      },
      ["authorization-001@1", "satisfaction-001@1"],
    );
    const disposition = new IronGate().recordDeploymentPolicyDisposition(assessment);

    expect(disposition.payload.disposition).toBe("UNRESOLVED");
    expect(disposition.payload.authorityGranted).toBe(false);
  });

  it("rejects malformed or self-referential policy assessments", () => {
    const gate = new IronGate();
    const assessment = createArtifact(
      "DeploymentPolicyAssessment",
      "Iron Gate",
      "mission-policy-disposition-002",
      {
        authorizationRef: "authorization-002@1",
        satisfactionRef: "satisfaction-002@1",
        missionRef: "mission-policy-disposition-002",
        medium: "synthetic-medium",
        scope: "bounded deployment",
        finding: "DEPLOYMENT_POLICY_UNRESOLVED" as const,
      },
      ["authorization-002@1", "satisfaction-002@1"],
    );

    expect(() =>
      gate.recordDeploymentPolicyDisposition({
        ...assessment,
        payload: { ...assessment.payload, finding: "UNKNOWN" as never },
      }),
    ).toThrow("Iron Gate cannot disposition an unresolved policy assessment");

    expect(() =>
      gate.recordDeploymentPolicyDisposition({
        ...assessment,
        sourceRefs: [assessment.identity + "@" + assessment.version],
      }),
    ).toThrow("Iron Gate cannot disposition an unresolved policy assessment");
  });

  it("records eligibility without converting disposition into execution authority", () => {
    const assessment = createArtifact(
      "DeploymentPolicyAssessment",
      "Iron Gate",
      "mission-eligibility-001",
      {
        authorizationRef: "authorization-eligibility-001@1",
        satisfactionRef: "satisfaction-eligibility-001@1",
        missionRef: "mission-eligibility-001",
        medium: "synthetic-medium",
        scope: "bounded deployment",
        finding: "DEPLOYMENT_POLICY_CONFORMANT" as const,
      },
      ["authorization-eligibility-001@1", "satisfaction-eligibility-001@1"],
    );
    const gate = new IronGate();
    const disposition = gate.recordDeploymentPolicyDisposition(assessment);
    const eligibility = gate.assessDeploymentEligibility(disposition);

    expect(eligibility.payload.finding).toBe("DEPLOYMENT_ELIGIBILITY_CONFORMANT");
    expect(eligibility.payload.authorityGranted).toBe(false);
    expect(eligibility.sourceRefs).toEqual([disposition.identity + "@" + disposition.version]);
  });

  it("keeps unresolved disposition unresolved and rejects malformed eligibility inputs", () => {
    const assessment = createArtifact(
      "DeploymentPolicyAssessment",
      "Iron Gate",
      "mission-eligibility-002",
      {
        authorizationRef: "authorization-eligibility-002@1",
        satisfactionRef: "satisfaction-eligibility-002@1",
        missionRef: "mission-eligibility-002",
        medium: "synthetic-medium",
        scope: "bounded deployment",
        finding: "DEPLOYMENT_POLICY_UNRESOLVED" as const,
      },
      ["authorization-eligibility-002@1", "satisfaction-eligibility-002@1"],
    );
    const gate = new IronGate();
    const disposition = gate.recordDeploymentPolicyDisposition(assessment);
    const eligibility = gate.assessDeploymentEligibility(disposition);

    expect(eligibility.payload.finding).toBe("DEPLOYMENT_ELIGIBILITY_UNRESOLVED");
    expect(eligibility.payload.authorityGranted).toBe(false);
    expect(() =>
      gate.assessDeploymentEligibility({
        ...disposition,
        payload: { ...disposition.payload, authorityGranted: true as never },
      }),
    ).toThrow("Iron Gate cannot assess an unresolved deployment disposition");

    expect(() =>
      gate.assessDeploymentEligibility({
        ...disposition,
        sourceRefs: ["different-policy-disposition@1"],
      }),
    ).toThrow("Iron Gate cannot assess an unresolved deployment disposition");
  });

  it("records eligibility as a non-authorizing disposition", () => {
    const assessment = createArtifact(
      "DeploymentEligibilityAssessment",
      "Iron Gate",
      "mission-eligibility-disposition-001",
      {
        dispositionRef: "policy-disposition-001@1",
        missionRef: "mission-eligibility-disposition-001",
        medium: "synthetic-medium",
        scope: "bounded deployment",
        finding: "DEPLOYMENT_ELIGIBILITY_CONFORMANT" as const,
        authorityGranted: false as const,
      },
      ["policy-disposition-001@1"],
    );
    const gate = new IronGate();
    const disposition = gate.recordDeploymentEligibilityDisposition(assessment);

    expect(disposition.artifactType).toBe("DeploymentEligibilityDisposition");
    expect(disposition.payload.disposition).toBe("ELIGIBLE");
    expect(disposition.payload.authorityGranted).toBe(false);
    expect(disposition.sourceRefs).toEqual([assessment.identity + "@" + assessment.version]);
  });

  it("records unresolved eligibility and rejects malformed eligibility assessments", () => {
    const assessment = createArtifact(
      "DeploymentEligibilityAssessment",
      "Iron Gate",
      "mission-eligibility-disposition-002",
      {
        dispositionRef: "policy-disposition-002@1",
        missionRef: "mission-eligibility-disposition-002",
        medium: "synthetic-medium",
        scope: "bounded deployment",
        finding: "DEPLOYMENT_ELIGIBILITY_UNRESOLVED" as const,
        authorityGranted: false as const,
      },
      ["policy-disposition-002@1"],
    );
    const gate = new IronGate();
    const disposition = gate.recordDeploymentEligibilityDisposition(assessment);

    expect(disposition.payload.disposition).toBe("INELIGIBLE");
    expect(disposition.payload.authorityGranted).toBe(false);
    expect(() =>
      gate.recordDeploymentEligibilityDisposition({
        ...assessment,
        payload: { ...assessment.payload, finding: "UNKNOWN" as never },
      }),
    ).toThrow("Iron Gate cannot disposition an unresolved deployment eligibility assessment");

    expect(() =>
      gate.recordDeploymentEligibilityDisposition({
        ...assessment,
        sourceRefs: ["different-assessment@1"],
      }),
    ).toThrow("Iron Gate cannot disposition an unresolved deployment eligibility assessment");
  });

  it("requests access without converting eligibility into access authority", () => {
    const assessment = createArtifact(
      "DeploymentEligibilityAssessment",
      "Iron Gate",
      "mission-access-request-001",
      {
        dispositionRef: "policy-disposition-access-001@1",
        missionRef: "mission-access-request-001",
        medium: "synthetic-medium",
        scope: "bounded deployment",
        finding: "DEPLOYMENT_ELIGIBILITY_CONFORMANT" as const,
        authorityGranted: false as const,
      },
      ["policy-disposition-access-001@1"],
    );
    const gate = new IronGate();
    const eligibility = gate.recordDeploymentEligibilityDisposition(assessment);
    const request = gate.requestAccessDecision(eligibility);

    expect(request.artifactType).toBe("AccessDecisionRequest");
    expect(request.payload.decision).toBe("PENDING_ACCESS_DECISION");
    expect(request.payload.authorityGranted).toBe(false);
    expect(request.payload.eligibilityDispositionRef).toBe(
      eligibility.identity + "@" + eligibility.version,
    );
    expect(request.sourceRefs).toEqual([eligibility.identity + "@" + eligibility.version]);

    const referral = gate.referAccessDecision(request);
    expect(referral.artifactType).toBe("AccessDecisionReferral");
    expect(referral.payload.state).toBe("AWAITING_INDEPENDENT_ACCESS_DECISION");
    expect(referral.payload.authorityGranted).toBe(false);
    expect(referral.payload.requestRef).toBe(request.identity + "@" + request.version);
    expect(referral.payload.eligibilityDispositionRef).toBe(
      request.payload.eligibilityDispositionRef,
    );
    expect(referral.sourceRefs).toEqual([
      request.identity + "@" + request.version,
      request.payload.eligibilityDispositionRef,
    ]);
  });

  it("does not request access from ineligible, stale, or self-referential dispositions", () => {
    const assessment = createArtifact(
      "DeploymentEligibilityAssessment",
      "Iron Gate",
      "mission-access-request-002",
      {
        dispositionRef: "policy-disposition-access-002@1",
        missionRef: "mission-access-request-002",
        medium: "synthetic-medium",
        scope: "bounded deployment",
        finding: "DEPLOYMENT_ELIGIBILITY_UNRESOLVED" as const,
        authorityGranted: false as const,
      },
      ["policy-disposition-access-002@1"],
    );
    const gate = new IronGate();
    const ineligible = gate.recordDeploymentEligibilityDisposition(assessment);

    expect(() => gate.requestAccessDecision(ineligible)).toThrow(
      "Iron Gate cannot request access from an unresolved eligibility disposition",
    );
    expect(() =>
      gate.requestAccessDecision({
        ...ineligible,
        status: "SUPERSEDED",
        payload: { ...ineligible.payload, disposition: "ELIGIBLE" },
      }),
    ).toThrow("Iron Gate cannot request access from an unresolved eligibility disposition");
    expect(() =>
      gate.requestAccessDecision({
        ...ineligible,
        payload: { ...ineligible.payload, disposition: "ELIGIBLE" },
        sourceRefs: [ineligible.identity + "@" + ineligible.version],
      }),
    ).toThrow("Iron Gate cannot request access from an unresolved eligibility disposition");
  });

  it("does not refer malformed or already-referred access requests", () => {
    const gate = new IronGate();
    const request = createArtifact(
      "AccessDecisionRequest",
      "Iron Gate",
      "mission-access-referral-001",
      {
        eligibilityDispositionRef: "eligibility-referral-001@1",
        missionRef: "mission-access-referral-001",
        medium: "synthetic-medium",
        scope: "bounded deployment",
        decision: "PENDING_ACCESS_DECISION" as const,
        authorityGranted: false as const,
      },
      ["eligibility-referral-001@1"],
    );

    expect(() => gate.referAccessDecision({ ...request, status: "SUPERSEDED" })).toThrow(
      "Iron Gate cannot refer an unresolved access decision request",
    );
    expect(() =>
      gate.referAccessDecision({
        ...request,
        sourceRefs: [request.identity + "@" + request.version],
      }),
    ).toThrow("Iron Gate cannot refer an unresolved access decision request");
    expect(() =>
      gate.referAccessDecision({
        ...request,
        payload: { ...request.payload, eligibilityDispositionRef: " " },
      }),
    ).toThrow("Iron Gate cannot refer an unresolved access decision request");
    expect(() =>
      gate.referAccessDecision({
        ...request,
        payload: { ...request.payload, missionRef: " " },
      }),
    ).toThrow("Iron Gate cannot refer an unresolved access decision request");
    expect(() =>
      gate.referAccessDecision({
        ...request,
        payload: { ...request.payload, authorityGranted: true as never },
      }),
    ).toThrow("Iron Gate cannot refer an unresolved access decision request");
  });
});
