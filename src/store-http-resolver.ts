import { ArtifactEnvelope, AsyncArtifactStore } from "./artifact-store.js";
import { ResponseDelivery } from "./delivery.js";
import { HttpArtifactResolver } from "./http-resolver.js";
import { Petition } from "./secretariat.js";

export class StoreHttpArtifactResolver implements HttpArtifactResolver {
  constructor(private readonly store: AsyncArtifactStore) {}

  resolvePetition(ref: string): Promise<ArtifactEnvelope<Petition> | undefined> {
    return this.resolve(ref);
  }

  resolveDelivery(
    ref: string,
  ): Promise<ArtifactEnvelope<ResponseDelivery> | undefined> {
    return this.resolve(ref);
  }

  private async resolve<T>(
    ref: string,
  ): Promise<ArtifactEnvelope<T> | undefined> {
    const separator = ref.lastIndexOf("@");
    if (separator <= 0) return undefined;
    const identity = ref.slice(0, separator);
    const version = Number(ref.slice(separator + 1));
    if (!Number.isInteger(version) || version < 1) return undefined;
    return this.store.get<T>(identity, version);
  }
}
