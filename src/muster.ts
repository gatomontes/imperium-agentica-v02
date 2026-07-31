import { ArtifactEnvelope, createArtifact } from "./artifact.js";
import { OperativePackage } from "./conscription.js";

export interface MissionBriefing {
  operativePackageRef: string;
  professionQueueRef?: string;
  queuePosition?: number;
  missionRef?: string;
  medium: string;
  autonomyClass: OperativePackage["autonomyClass"];
  state: "MISSION_BRIEF_PREPARED" | "MISSION_BOUND";
}

export interface DeploymentPackage {
  missionBriefingRef: string;
  operativePackageRef: string;
  professionQueueRef?: string;
  queuePosition?: number;
  missionRef: string;
  medium: string;
  autonomyClass: OperativePackage["autonomyClass"];
  state: "MISSION_ASSEMBLED" | "READY_FOR_LAUNCH";
}

export class Muster {
  prepareMissionBrief(
    packageArtifact: ArtifactEnvelope<OperativePackage>,
  ): ArtifactEnvelope<MissionBriefing> {
    const { payload } = packageArtifact;
    const queueConformant =
      payload.professionQueueRef === undefined ||
      (payload.professionQueueRef.trim() !== "" && payload.queuePosition !== undefined);

    if (
      packageArtifact.status !== "CURRENT" ||
      payload.finding !== "OPERATIVE_PACKAGE_CONFORMANT" ||
      payload.state !== "ACTIVATION_PENDING" ||
      !queueConformant
    ) {
      throw new Error("Muster cannot prepare a brief from an unresolved Operative Package");
    }

    const operativePackageRef = packageArtifact.identity + "@" + packageArtifact.version;
    return createArtifact(
      "MissionBriefing",
      "Muster",
      packageArtifact.correlationId,
      {
        operativePackageRef,
        ...(payload.professionQueueRef ? { professionQueueRef: payload.professionQueueRef } : {}),
        ...(payload.queuePosition !== undefined ? { queuePosition: payload.queuePosition } : {}),
        medium: payload.medium,
        autonomyClass: payload.autonomyClass,
        state: "MISSION_BRIEF_PREPARED",
      },
      [operativePackageRef],
    );
  }

  bindMission(
    brief: ArtifactEnvelope<MissionBriefing>,
    missionRef: string,
  ): ArtifactEnvelope<MissionBriefing> {
    const normalizedMissionRef = missionRef.trim();
    if (brief.payload.state !== "MISSION_BRIEF_PREPARED" || !normalizedMissionRef) {
      throw new Error("Muster cannot bind an unresolved mission brief");
    }

    const successor: ArtifactEnvelope<MissionBriefing> = createArtifact(
      "MissionBriefing",
      "Muster",
      brief.correlationId,
      {
        ...brief.payload,
        missionRef: normalizedMissionRef,
        state: "MISSION_BOUND",
      },
      [brief.identity + "@" + brief.version],
    );
    return {
      ...successor,
      supersedes: brief.identity + "@" + brief.version,
    };
  }

  assembleDeploymentPackage(
    brief: ArtifactEnvelope<MissionBriefing>,
  ): ArtifactEnvelope<DeploymentPackage> {
    const { payload } = brief;
    const queueConformant =
      payload.professionQueueRef === undefined ||
      (payload.professionQueueRef.trim() !== "" && payload.queuePosition !== undefined);
    if (
      brief.status !== "CURRENT" ||
      payload.state !== "MISSION_BOUND" ||
      !payload.missionRef?.trim() ||
      !payload.operativePackageRef.trim() ||
      !queueConformant
    ) {
      throw new Error("Muster cannot assemble an unresolved mission brief");
    }

    const missionBriefingRef = brief.identity + "@" + brief.version;
    return createArtifact(
      "DeploymentPackage",
      "Muster",
      brief.correlationId,
      {
        missionBriefingRef,
        operativePackageRef: payload.operativePackageRef,
        ...(payload.professionQueueRef ? { professionQueueRef: payload.professionQueueRef } : {}),
        ...(payload.queuePosition !== undefined ? { queuePosition: payload.queuePosition } : {}),
        missionRef: payload.missionRef.trim(),
        medium: payload.medium,
        autonomyClass: payload.autonomyClass,
        state: "MISSION_ASSEMBLED",
      },
      [missionBriefingRef, payload.operativePackageRef],
    );
  }

  markReadyForLaunch(
    deploymentPackage: ArtifactEnvelope<DeploymentPackage>,
  ): ArtifactEnvelope<DeploymentPackage> {
    const { payload } = deploymentPackage;
    const queueConformant =
      payload.professionQueueRef === undefined ||
      (payload.professionQueueRef.trim() !== "" && payload.queuePosition !== undefined);
    if (
      deploymentPackage.status !== "CURRENT" ||
      payload.state !== "MISSION_ASSEMBLED" ||
      !payload.missionRef.trim() ||
      !payload.operativePackageRef.trim() ||
      !payload.missionBriefingRef.trim() ||
      !payload.medium.trim() ||
      !queueConformant
    ) {
      throw new Error("Muster cannot mark an unresolved Deployment Package ready");
    }

    const packageRef = deploymentPackage.identity + "@" + deploymentPackage.version;
    return {
      ...deploymentPackage,
      version: deploymentPackage.version + 1,
      supersedes: packageRef,
      payload: { ...payload, state: "READY_FOR_LAUNCH" },
    };
  }
}
