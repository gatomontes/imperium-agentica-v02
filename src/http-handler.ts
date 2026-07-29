import { HttpResponse } from "./http-contract.js";
import { HttpAuthorizer } from "./http-auth.js";
import { ImperiumTransportAdapter } from "./transport.js";

export interface HttpSubmitBody {
  content: string;
  sessionReference: string;
}

export interface HttpClarifyBody {
  correctedContent: string;
}

export class HttpTransportHandler {
  constructor(
    private readonly adapter: ImperiumTransportAdapter,
    private readonly authorizer?: HttpAuthorizer,
  ) {}

  async submit(
    body: HttpSubmitBody,
    metadata: { requestId: string; operatorInstanceId: string; authorization?: string },
  ): Promise<HttpResponse<ReturnType<ImperiumTransportAdapter["submit"]>>> {
    const metadataError = validateMetadata(metadata);
    if (metadataError) return metadataError;
    const authorizationError = authorize(metadata, this.authorizer);
    if (authorizationError) return authorizationError;
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

  async prepareResponse(
    petition: Parameters<ImperiumTransportAdapter["prepareResponse"]>[0],
    content: string,
    metadata: { requestId: string; operatorInstanceId: string; authorization?: string },
  ): Promise<HttpResponse<ReturnType<ImperiumTransportAdapter["prepareResponse"]>>> {
    const metadataError = validateMetadata(metadata);
    if (metadataError) return metadataError;
    const authorizationError = authorize(metadata, this.authorizer);
    if (authorizationError) return authorizationError;
    try {
      const result = this.adapter.prepareResponse(
        petition,
        content,
        metadata.requestId,
      );
      return { ok: true, requestId: metadata.requestId, result };
    } catch (error) {
      return failure(metadata.requestId, error);
    }
  }

  async prepareDelivery(
    petition: Parameters<ImperiumTransportAdapter["prepareDelivery"]>[0],
    channel: string,
    metadata: { requestId: string; operatorInstanceId: string; authorization?: string },
  ): Promise<HttpResponse<ReturnType<ImperiumTransportAdapter["prepareDelivery"]>>> {
    const metadataError = validateMetadata(metadata);
    if (metadataError) return metadataError;
    const authorizationError = authorize(metadata, this.authorizer);
    if (authorizationError) return authorizationError;
    try {
      const result = this.adapter.prepareDelivery(
        petition,
        channel,
        metadata.requestId,
      );
      return { ok: true, requestId: metadata.requestId, result };
    } catch (error) {
      return failure(metadata.requestId, error);
    }
  }

  async dispatchResponse(
    delivery: Parameters<ImperiumTransportAdapter["dispatchResponse"]>[0],
    successful: boolean,
    metadata: { requestId: string; operatorInstanceId: string; authorization?: string },
  ): Promise<HttpResponse<ReturnType<ImperiumTransportAdapter["dispatchResponse"]>>> {
    const metadataError = validateMetadata(metadata);
    if (metadataError) return metadataError;
    const authorizationError = authorize(metadata, this.authorizer);
    if (authorizationError) return authorizationError;
    try {
      const result = this.adapter.dispatchResponse(
        delivery,
        successful,
        metadata.requestId,
      );
      return { ok: true, requestId: metadata.requestId, result };
    } catch (error) {
      return failure(metadata.requestId, error);
    }
  }

  async clarify(
    petition: Parameters<ImperiumTransportAdapter["clarify"]>[0]["petition"],
    body: HttpClarifyBody,
    metadata: { requestId: string; operatorInstanceId: string; authorization?: string },
  ): Promise<HttpResponse<ReturnType<ImperiumTransportAdapter["clarify"]>>> {
    const metadataError = validateMetadata(metadata);
    if (metadataError) return metadataError;
    const authorizationError = authorize(metadata, this.authorizer);
    if (authorizationError) return authorizationError;
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
}): Promise<HttpResponse<never> | null {
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

function authorize(
  metadata: {
    requestId: string;
    operatorInstanceId: string;
    authorization?: string;
  },
  authorizer?: HttpAuthorizer,
): Promise<HttpResponse<never> | null {
  if (!authorizer) return null;
  if (!metadata.authorization?.trim()) {
    return {
      ok: false,
      requestId: metadata.requestId,
      error: {
        code: "HTTP_UNAUTHORIZED",
        message: "authorization is required",
      },
    };
  }
  try {
    authorizer.authorize({
      requestId: metadata.requestId,
      operatorInstanceId: metadata.operatorInstanceId,
      authorization: metadata.authorization,
    });
    return null;
  } catch (error) {
    return {
      ok: false,
      requestId: metadata.requestId,
      error: {
        code: "HTTP_UNAUTHORIZED",
        message: error instanceof Error ? error.message : "authorization failed",
      },
    };
  }
}
