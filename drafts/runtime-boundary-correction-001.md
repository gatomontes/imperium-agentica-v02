# Runtime Boundary Correction 001

## Status

Correction record for Pressure Run 001.

Not an admitted Runtime contract.

## Corrected Defects

| Failure | Correction |
|---|---|
| RT-012 | require Authority and PB-001 re-evaluation immediately before external dispatch |
| RT-018 | quarantine indeterminate effects by exact effect identity and prohibit automatic repeat |
| RT-020 | separate deployment mechanics from authority to activate, migrate, load credentials, or roll back |
| RT-027 | define a minimum durable Runtime Observation Envelope |
| RT-033 | pin or explicitly revalidate contract versions at dispatch |
| RT-039 | require semantic-mapping compatibility and block lossy rollback |

## Preserved Boundaries

The correction does not give Runtime authority to:

- decide semantic outcome
- repair missing correlation
- invent compensation
- repeat an indeterminate effect
- revise canonical artifact meaning
- treat deployment control as self-authorizing

## Expected Result

Pressure Run 002 should pass all 40 scenarios without creating a new semantic origin outside Runtime's own operational facts.
