import { ArtifactEnvelope } from "./artifact.js";
import { ResponseDelivery } from "./delivery.js";
import { Petition } from "./secretariat.js";

export interface HttpArtifactResolver {
  resolvePetition(ref: string): ArtifactEnvelope<Petition> | Promise<ArtifactEnvelope<Petition> | undefined>;
  resolveDelivery(ref: string): ArtifactEnvelope<ResponseDelivery> | Promise<ArtifactEnvelope<ResponseDelivery> | undefined>;
}
