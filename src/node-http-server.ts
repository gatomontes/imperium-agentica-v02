import {
  createServer,
  IncomingMessage,
  Server,
  ServerResponse,
} from "node:http";
import { HttpTransportHandler } from "./http-handler.js";

export function createNodeHttpServer(handler: HttpTransportHandler): Server {
  return createServer(async (request, response) => {
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
}

async function route(
  request: IncomingMessage,
  response: ServerResponse,
  handler: HttpTransportHandler,
): Promise<void> {
  const requestId = request.headers["x-request-id"]?.toString() ?? "";
  const operatorInstanceId =
    request.headers["x-imperium-operator-instance"]?.toString() ?? "";

  if (request.method === "POST" && request.url === "/v1/requests") {
    const body = await readJson(request);
    const result = handler.submit(body, { requestId, operatorInstanceId });
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
  for await (const chunk of request) chunks.push(Buffer.from(chunk));
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function writeJson(
  response: ServerResponse,
  statusCode: number,
  body: unknown,
): void {
  response.statusCode = statusCode;
  response.setHeader("content-type", "application/json; charset=utf-8");
  response.end(JSON.stringify(body));
}
