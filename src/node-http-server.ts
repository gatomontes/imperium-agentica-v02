import {
  createServer,
  IncomingMessage,
  Server,
  ServerResponse,
} from "node:http";
import { randomUUID } from "node:crypto";
import { HttpTransportHandler } from "./http-handler.js";
import { HttpArtifactResolver } from "./http-resolver.js";

export interface NodeHttpServerOptions {
  requestTimeoutMs?: number;
  headersTimeoutMs?: number;
  keepAliveTimeoutMs?: number;
  maxConnections?: number;
  readinessCheck?: () => boolean | Promise<boolean>;
  artifactResolver?: HttpArtifactResolver;
}

export function createNodeHttpServer(
  handler: HttpTransportHandler,
  options: NodeHttpServerOptions = {},
): Server {
  const server = createServer(async (request, response) => {
    try {
      await route(
        request,
        response,
        handler,
        options.readinessCheck ?? (() => true),
        options.artifactResolver,
      );
    } catch (error) {
      const badBody = error instanceof HttpInvalidJsonError;
      const tooLarge = error instanceof HttpBodyTooLargeError;
      writeJson(response, badBody || tooLarge ? tooLarge ? 413 : 400 : 500, {
        ok: false,
        requestId: request.headers["x-request-id"]?.toString() ?? "",
        error: {
          code: tooLarge
            ? "HTTP_BODY_TOO_LARGE"
            : badBody
              ? "HTTP_INVALID_JSON"
              : "HTTP_INTERNAL_ERROR",
          message: tooLarge
            ? "request body exceeds 1 MiB"
            : badBody
              ? "request body must be valid JSON"
              : error instanceof Error
                ? error.message
                : "internal error",
        },
      });
    }
  });
  server.requestTimeout = options.requestTimeoutMs ?? 30_000;
  server.headersTimeout = options.headersTimeoutMs ?? 10_000;
  server.keepAliveTimeout = options.keepAliveTimeoutMs ?? 5_000;
  server.maxConnections = options.maxConnections ?? 100;
  return server;
}

async function route(
  request: IncomingMessage,
  response: ServerResponse,
  handler: HttpTransportHandler,
  readinessCheck: () => boolean | Promise<boolean>,
  artifactResolver?: HttpArtifactResolver,
): Promise<void> {
  const requestId =
    request.headers["x-request-id"]?.toString() ?? "http-" + randomUUID();
  const operatorInstanceId =
    request.headers["x-imperium-operator-instance"]?.toString() ?? "";
  const authorization = request.headers.authorization?.toString();

  if (request.method === "GET" && request.url === "/health") {
    writeJson(response, 200, {
      ok: true,
      status: "healthy",
    });
    return;
  }

  if (request.method === "GET" && request.url === "/ready") {
    const ready = await readinessCheck();
    writeJson(response, ready ? 200 : 503, {
      ok: ready,
      status: ready ? "ready" : "not_ready",
    });
    return;
  }

  if (request.method === "POST" && request.url?.match(/^\/v1\/petitions\/[^/]+\/clarifications$/)) {
    if (!artifactResolver) {
      writeJson(response, 501, {
        ok: false,
        requestId,
        error: {
          code: "HTTP_ARTIFACT_RESOLVER_UNAVAILABLE",
          message: "artifact resolver is required for this route",
        },
      });
      return;
    }
    const match = request.url.match(/^\/v1\/petitions\/([^/]+)\/clarifications$/);
    if (!match) return;
    const petition = await artifactResolver.resolvePetition(
      decodeURIComponent(match[1]),
    );
    if (!petition) {
      writeJson(response, 404, {
        ok: false,
        requestId,
        error: { code: "PETITION_NOT_FOUND", message: "petition not found" },
      });
      return;
    }
    const body = await readJson<{ correctedContent: string }>(request);
    if (typeof body.correctedContent !== "string") {
      writeJson(response, 400, {
        ok: false,
        requestId,
        error: {
          code: "HTTP_INVALID_BODY",
          message: "correctedContent must be a string",
        },
      });
      return;
    }
    const result = await handler.clarify(
      petition,
      { correctedContent: body.correctedContent },
      { requestId, operatorInstanceId, authorization },
    );
    writeJson(response, result.ok ? 200 : 400, result);
    return;
  }

  if (request.method === "POST" && request.url?.match(/^\/v1\/petitions\/[^/]+\/(responses|deliveries)$/)) {
    if (!artifactResolver) {
      writeJson(response, 501, {
        ok: false,
        requestId,
        error: {
          code: "HTTP_ARTIFACT_RESOLVER_UNAVAILABLE",
          message: "artifact resolver is required for this route",
        },
      });
      return;
    }
    const match = request.url.match(/^\/v1\/petitions\/([^/]+)\/(responses|deliveries)$/);
    if (!match) return;
    const petition = await artifactResolver.resolvePetition(decodeURIComponent(match[1]));
    if (!petition) {
      writeJson(response, 404, {
        ok: false,
        requestId,
        error: { code: "PETITION_NOT_FOUND", message: "petition not found" },
      });
      return;
    }
    const body = await readJson<Record<string, unknown>>(request);
    if (
      match[2] === "responses"
        ? typeof body.content !== "string"
        : typeof body.channel !== "string"
    ) {
      writeJson(response, 400, {
        ok: false,
        requestId,
        error: {
          code: "HTTP_INVALID_BODY",
          message: "response content or delivery channel must be a string",
        },
      });
      return;
    }
    const metadata = {
      requestId,
      operatorInstanceId,
      authorization,
    };
    const result =
      match[2] === "responses"
        ? await handler.prepareResponse(petition, String(body.content ?? ""), metadata)
        : await handler.prepareDelivery(petition, String(body.channel ?? ""), metadata);
    writeJson(response, result.ok ? 200 : 400, result);
    return;
  }

  if (request.method === "POST" && request.url?.match(/^\/v1\/deliveries\/[^/]+\/dispatch$/)) {
    if (!artifactResolver) {
      writeJson(response, 501, {
        ok: false,
        requestId,
        error: {
          code: "HTTP_ARTIFACT_RESOLVER_UNAVAILABLE",
          message: "artifact resolver is required for this route",
        },
      });
      return;
    }
    const match = request.url.match(/^\/v1\/deliveries\/([^/]+)\/dispatch$/);
    if (!match) return;
    const delivery = await artifactResolver.resolveDelivery(decodeURIComponent(match[1]));
    if (!delivery) {
      writeJson(response, 404, {
        ok: false,
        requestId,
        error: { code: "DELIVERY_NOT_FOUND", message: "delivery not found" },
      });
      return;
    }
    const body = await readJson<{ successful: boolean }>(request);
    if (typeof body.successful !== "boolean") {
      writeJson(response, 400, {
        ok: false,
        requestId,
        error: {
          code: "HTTP_INVALID_BODY",
          message: "successful must be a boolean",
        },
      });
      return;
    }
    const result = await handler.dispatchResponse(delivery, body.successful, {
      requestId,
      operatorInstanceId,
      authorization,
    });
    writeJson(response, result.ok ? 200 : 400, result);
    return;
  }

  if (request.url === "/v1/requests" && request.method !== "POST") {
    response.setHeader("allow", "POST");
    writeJson(response, 405, {
      ok: false,
      requestId,
      error: {
        code: "HTTP_METHOD_NOT_ALLOWED",
        message: "only POST is supported for this route",
      },
    });
    return;
  }

  if (request.method === "POST" && request.url === "/v1/requests") {
    const declaredLength = Number(request.headers["content-length"] ?? 0);
    if (declaredLength > 1024 * 1024) {
      writeJson(response, 413, {
        ok: false,
        requestId,
        error: {
          code: "HTTP_BODY_TOO_LARGE",
          message: "request body exceeds 1 MiB",
        },
      });
      return;
    }

    const contentType = request.headers["content-type"]?.split(";")[0];
    if (contentType !== "application/json") {
      writeJson(response, 415, {
        ok: false,
        requestId,
        error: {
          code: "HTTP_UNSUPPORTED_CONTENT_TYPE",
          message: "content-type must be application/json",
        },
      });
      return;
    }

    let body: { content: string; sessionReference: string };
    try {
      body = await readJson<{ content: string; sessionReference: string }>(request);
    } catch (error) {
      const tooLarge = error instanceof HttpBodyTooLargeError;
      writeJson(response, tooLarge ? 413 : 400, {
        ok: false,
        requestId,
        error: {
          code: tooLarge ? "HTTP_BODY_TOO_LARGE" : "HTTP_INVALID_JSON",
          message: tooLarge
            ? "request body exceeds 1 MiB"
            : "request body must be valid JSON",
        },
      });
      return;
    }
    if (
      typeof body.content !== "string" ||
      typeof body.sessionReference !== "string"
    ) {
      writeJson(response, 400, {
        ok: false,
        requestId,
        error: {
          code: "HTTP_INVALID_BODY",
          message: "content and sessionReference must be strings",
        },
      });
      return;
    }

    const result = await handler.submit(body, {
      requestId,
      operatorInstanceId,
      authorization,
    });
    writeJson(response, result.ok ? 200 : 400, result);
    return;
  }

  if (request.method === "POST" && request.url === "/v1/dossiers") {
    const contentType = request.headers["content-type"]?.split(";")[0];
    if (contentType !== "application/json") {
      writeJson(response, 415, {
        ok: false,
        requestId,
        error: {
          code: "HTTP_UNSUPPORTED_CONTENT_TYPE",
          message: "content-type must be application/json",
        },
      });
      return;
    }

    const body = await readJson<{ content: string; sessionReference: string }>(request);
    if (
      typeof body.content !== "string" ||
      typeof body.sessionReference !== "string"
    ) {
      writeJson(response, 400, {
        ok: false,
        requestId,
        error: {
          code: "HTTP_INVALID_BODY",
          message: "content and sessionReference must be strings",
        },
      });
      return;
    }

    const result = await handler.openDossier(body, {
      requestId,
      operatorInstanceId,
      authorization,
    });
    writeJson(response, result.ok ? 201 : 400, result);
    return;
  }

  writeJson(response, 404, {
    ok: false,
    requestId,
    error: {
      code: "HTTP_ROUTE_NOT_FOUND",
      message: "route not found",
    },
  });
}

async function readJson<T>(request: IncomingMessage): Promise<T> {
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of request) {
    const buffer = Buffer.from(chunk);
    size += buffer.length;
    if (size > 1024 * 1024) {
      throw new HttpBodyTooLargeError();
    }
    chunks.push(buffer);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8")) as T;
  } catch {
    throw new HttpInvalidJsonError();
  }
}

function writeJson(
  response: ServerResponse,
  statusCode: number,
  body: unknown,
): void {
  response.statusCode = statusCode;
  response.setHeader("content-type", "application/json; charset=utf-8");
  response.setHeader("cache-control", "no-store");
  response.setHeader("x-content-type-options", "nosniff");
  if (
    typeof body === "object" &&
    body !== null &&
    "requestId" in body &&
    typeof body.requestId === "string"
  ) {
    response.setHeader("x-request-id", body.requestId);
  }
  response.end(JSON.stringify(body));
}

class HttpBodyTooLargeError extends Error {}
class HttpInvalidJsonError extends Error {}

export async function shutdownNodeHttpServer(
  server: Server,
  timeoutMs = 10_000,
): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    let settled = false;
    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      server.closeAllConnections();
      reject(new Error("HTTP server shutdown timed out"));
    }, timeoutMs);

    server.close((error) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      if (error) reject(error);
      else resolve();
    });
  });
}
