import { ArtifactEnvelope } from "./artifact.js";
import { AsyncArtifactStore } from "./artifact-store.js";
import { WorkSpecification } from "./castellan.js";
import { ResponseDelivery } from "./delivery.js";
import { ImperiumReference } from "./reference.js";
import { OperatorResponse } from "./response.js";
import { OperatorRequest, Petition } from "./secretariat.js";

export class PersistentImperiumReference {
  constructor(
    private readonly reference: ImperiumReference,
    private readonly store: AsyncArtifactStore,
  ) {}

  async submit(request: OperatorRequest): Promise<{
    petition: ArtifactEnvelope<Petition>;
    work: ArtifactEnvelope<WorkSpecification> | null;
  }> {
    const result = this.reference.submit(request);
    await this.store.save(result.petition);
    if (result.work) await this.store.save(result.work);
    return result;
  }

  async requestClarification(
    petition: ArtifactEnvelope<Petition>,
    reason: string,
  ): Promise<ArtifactEnvelope<Petition>> {
    const result = this.reference.requestClarification(petition, reason);
    await this.store.supersede(petition, result);
    return result;
  }

  async clarify(
    petition: ArtifactEnvelope<Petition>,
    correctedContent: string,
  ): Promise<{
    petition: ArtifactEnvelope<Petition>;
    work: ArtifactEnvelope<WorkSpecification> | null;
  }> {
    const result = this.reference.clarify(petition, correctedContent);
    await this.store.supersede(petition, result.petition);
    if (result.work) await this.store.save(result.work);
    return result;
  }

  async prepareOperatorResponse(
    petition: ArtifactEnvelope<Petition>,
    content: string,
  ): Promise<ArtifactEnvelope<OperatorResponse>> {
    const result = this.reference.prepareOperatorResponse(petition, content);
    await this.store.save(result);
    return result;
  }

  async prepareResponse(
    petition: ArtifactEnvelope<Petition>,
    channel: string,
  ): Promise<ArtifactEnvelope<ResponseDelivery>> {
    const result = this.reference.prepareResponse(petition, channel);
    await this.store.save(result);
    return result;
  }

  async dispatchResponse(
    delivery: ArtifactEnvelope<ResponseDelivery>,
    successful: boolean,
  ): Promise<ArtifactEnvelope<ResponseDelivery>> {
    const result = this.reference.dispatchResponse(delivery, successful);
    await this.store.supersede(delivery, result);
    return result;
  }
}
