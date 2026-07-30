import { ArtifactEnvelope } from "./artifact.js";
import { ResponseDelivery } from "./delivery.js";
import { Petition } from "./secretariat.js";

export interface HttpArtifactResolver {
  resolvePetition(ref: string):
    | ArtifactEnvelope<any>
    | undefined
    | Promise<ArtifactEnvelope<any> | undefined>;
  resolveDelivery(ref: string):
    | ArtifactEnvelope<any>
    | undefined
    | Promise<ArtifactEnvelope<any> | undefined>;
}
