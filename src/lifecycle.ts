import { ArtifactEnvelope } from "./artifact.js";
import { OperativePackage, OperativePackageState } from "./conscription.js";

const transitions: Record<OperativePackageState, OperativePackageState[]> = {
  PACKAGED: ["ACTIVATION_PENDING"],
  ACTIVATION_PENDING: ["MISSION_BOUND"],
  MISSION_BOUND: ["RELEASED"],
  RELEASED: ["DEPLOYED"],
  DEPLOYED: [],
};

export function transitionOperativePackage(
  packageArtifact: ArtifactEnvelope<OperativePackage>,
  next: OperativePackageState,
): ArtifactEnvelope<OperativePackage> {
  const current = packageArtifact.payload.state;
  if (!transitions[current].includes(next)) {
    throw new Error("invalid Operative Package transition: " + current + " -> " + next);
  }

  return {
    ...packageArtifact,
    version: packageArtifact.version + 1,
    supersedes: packageArtifact.identity + "@" + packageArtifact.version,
    payload: { ...packageArtifact.payload, state: next },
  };
}
