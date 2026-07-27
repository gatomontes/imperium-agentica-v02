# HTTP Transport Boundary

The HTTP layer is a transport adapter over the existing transport-neutral contract. It does not define new Imperium workflow semantics.

## Request metadata

Every request carries:

- `x-request-id` — caller-supplied or gateway-generated correlation for the HTTP exchange;
- `x-imperium-operator-instance` — the single operator instance receiving the request;
- `authorization` — authentication material, validated outside the domain layer.

## Endpoint mapping

- `POST /v1/requests` → submit operator request;
- `POST /v1/petitions/:petitionRef/clarifications` → submit corrected petition content;
- `POST /v1/petitions/:petitionRef/responses` → prepare operator response content;
- `POST /v1/petitions/:petitionRef/deliveries` → prepare delivery;
- `POST /v1/deliveries/:deliveryRef/dispatch` → record dispatch outcome.

Successful responses use `{ ok: true, requestId, result }`. Failures use `{ ok: false, requestId, error: { code, message } }`.

Authentication, authorization policy, rate limits, framework choice, TLS termination, and deployment topology remain unadmitted.
