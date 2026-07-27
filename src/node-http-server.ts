import {
  createServer,
  IncomingMessage,
  Server,
  ServerResponse,
} from "node:http";
import { HttpTransportHandler } from "./http-handler.js";

export interface NodeHttpServerOptions {
  requestTimeoutMs?: number;
  headersTimeoutMs?: number;
}

export function createNodeHttpServer(
  handler: HttpTransportHandler,
  options: NodeHttpServerOptions = {},
): Server {
  const server = createServer(async (request, response) => {
    try {
      await route(request, response, handler);
    } catch (error) {
      writeJson(response, 500, {
        ok: false,
        requestId: request.headers["x-request-id"]?.toString() ?? "",
        error: {
          code: "HTTP_INTERNAL_ERROR",
          message: error instanceof Error ? error.message : "internal error",
        },
      });
    }
  });
  server.requestTimeout = options.requestTimeoutMs ?? 30_000;
  server.headersTimeout = options.headersTimeoutMs ?? 10_000;
  return server;
}

async function route(
  request: IncomingMessage,
  response: ServerResponse,
  handler: HttpTransportHandler,
): Promise<void> {
  const requestId =
    request.headers["x-request-id"]?.toString() ?? "http-" + randomUUID();
  const operatorInstanceId =
    request.headers["x-imperium-operator-instance"]?.toString() ?? "";
  const authorization = request.headers.authorization?.toString();

  if (request.method === "POST" && request.url === "/v1/requests") {
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
      body = await readJson(request);
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
    const result = handler.submit(body, {
      requestId,
      operatorInstanceId,
      authorization,
    });
    writeJson(response, result.ok ? 200 : 400, result);
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

async function readJson(request: IncomingMessage): Promise<{
  content: string;
  sessionReference: string;
}> {
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
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function writeJson(
  response: ServerResponse,
  statusCode: number,
  body: unknown,
): void {
  response.statusCode = statusCode;
  response.setHeader("content-type", "application/json; charset=utf-8");
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
