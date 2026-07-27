import { HttpResponse } from "./http-contract.js";
import { ImperiumTransportAdapter } from "./transport.js";

export interface HttpSubmitBody {
  content: string;
  sessionReference: string;
}

export interface HttpClarifyBody {
  correctedContent: string;
}

export class HttpTransportHandler {
  constructor(private readonly adapter: ImperiumTransportAdapter) {}

  submit(
    body: HttpSubmitBody,
    metadata: { requestId: string; operatorInstanceId: string },
  ): HttpResponse<ReturnType<ImperiumTransportAdapter["submit"]>> {
    const metadataError = validateMetadata(metadata);
    if (metadataError) return metadataError;
    try {
      const result = this.adapter.submit({
        request: body,
        transportId: metadata.requestId,
      });
      return { ok: true, requestId: metadata.requestId, result };
    } catch (error) {
      return failure(metadata.requestId, error);
    }
  }

  clarify(
    petition: Parameters<ImperiumTransportAdapter["clarify"]>[0]["petition"],
    body: HttpClarifyBody,
    metadata: { requestId: string; operatorInstanceId: string },
  ): HttpResponse<ReturnType<ImperiumTransportAdapter["clarify"]>> {
    const metadataError = validateMetadata(metadata);
    if (metadataError) return metadataError;
    try {
      const result = this.adapter.clarify({
        petition,
        correctedContent: body.correctedContent,
        transportId: metadata.requestId,
      });
      return { ok: true, requestId: metadata.requestId, result };
    } catch (error) {
      return failure(metadata.requestId, error);
    }
  }
}

function failure(requestId: string, error: unknown): HttpResponse<never> {
  return {
    ok: false,
    requestId,
    error: {
      code: "IMPERIUM_REQUEST_FAILED",
      message: error instanceof Error ? error.message : "request failed",
    },
  };
}

function validateMetadata(metadata: {
  requestId: string;
  operatorInstanceId: string;
}): HttpResponse<never> | null {
  if (!metadata.requestId.trim() || !metadata.operatorInstanceId.trim()) {
    return {
      ok: false,
      requestId: metadata.requestId,
      error: {
        code: "HTTP_METADATA_INVALID",
        message: "requestId and operatorInstanceId are required",
      },
    };
  }
  return null;
}
