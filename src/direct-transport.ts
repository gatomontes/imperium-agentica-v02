import { ImperiumReference } from "./reference.js";
import {
  ImperiumTransportAdapter,
  ClarificationRequest,
  TransportRequest,
  TransportResponse,
} from "./transport.js";

export class DirectTransportAdapter implements ImperiumTransportAdapter {
  constructor(private readonly imperium = new ImperiumReference()) {}

  submit(input: TransportRequest): TransportResponse {
    const result = this.imperium.submit(input.request);
    return {
      transportId: input.transportId,
      petition: result.petition,
      work: result.work,
    };
  }
  clarify(input: ClarificationRequest): TransportResponse {
    const result = this.imperium.clarify(
      input.petition,
      input.correctedContent,
    );
    return {
      transportId: input.transportId,
      petition: result.petition,
      work: result.work,
    };
  }

}
