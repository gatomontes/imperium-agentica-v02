# Runtime Draft Correction 001

## Status

Correction record for Runtime Draft Pressure Run 001.

Not an admitted contract.

## Initial Failures

| ID | Failure | Correction |
|---|---|---|
| RO-006 | Observation Envelope required Authority and correlation references even for purely local operational facts | split universal and conditional fields; require explicit inapplicability where ambiguity matters |
| AU-004 | CONTROL_PLANE draft expanded IMPERIUM_STEWARDSHIP into authority over an operating environment | require a controlled-resource, delegated, or legal/contractual basis for consequential environment action |
| PR-004 | mission disposition routed all Runtime observations through Lazaretto | route only provider-returned content through Lazaretto; preserve internal Runtime envelopes as Curia observations |

## Preserved Boundaries

The corrections preserve:

```text
Runtime facts remain operational.
Authority still originates outside Runtime.
Lazaretto still sanitizes external returns.
Internal telemetry does not become field material.
Internal stewardship does not imply resource control.
```

## Expected Result

Runtime Draft Pressure Run 002 should pass all 60 scenarios while leaving control-plane cognitive responsibility unresolved rather than assigning it to Runtime.
