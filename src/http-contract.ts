import { TransportResponse } from "./transport.js";

export const HTTP_ENDPOINTS = {
  submit: "POST /v1/requests",
  clarify: "POST /v1/petitions/:petitionRef/clarifications",
  prepareResponse: "POST /v1/petitions/:petitionRef/responses",
  prepareDelivery: "POST /v1/petitions/:petitionRef/deliveries",
  dispatchResponse: "POST /v1/deliveries/:deliveryRef/dispatch",
} as const;

export interface HttpRequestMetadata {
  requestId: string;
  operatorInstanceId: string;
}

export interface HttpSuccess<T> {
  ok: true;
  requestId: string;
  result: T;
}

export interface HttpFailure {
  ok: false;
  requestId: string;
  error: {
    code: string;
    message: string;
  };
}

export type HttpResponse<T> = HttpSuccess<T> | HttpFailure;

export type HttpTransportResult = HttpResponse<TransportResponse>;

export const HTTP_HEADERS = {
  requestId: "x-request-id",
  operatorInstance: "x-imperium-operator-instance",
  authorization: "authorization",
} as const;
