# Constitutional Test Run 004

## Run Record

```text
Suite: layers/cognitive/drafts/constitutional-tests.md
Mode: Theoretical doctrine simulation
Run date: 2026-07-15
Result: PASS
Passed: 14
Failed: 0
```

This run follows admission of La Cortine and its three dedicated ports.

## Boundary Under Test

```text
Imperium
├── Citadel
│   └── La Cortine
│       ├── Iron Gate — initial deployment exit
│       ├── Barbican — continuing operational-support port
│       └── Lazaretto — mission-return entry
└── Theatre
```

La Cortine is a namespace and has no acting authority.

## Route Simulation

### Initial deployment

```text
Muster
→ Deployment Package: Ready For Launch
→ Iron Gate
→ Theatre
```

**PASS:** Iron Gate performs the outward launch transition only.

### Continuing tool request

```text
Deployed operative
→ tool ticket
→ Barbican
→ Armory
→ result or refusal
→ Barbican
→ deployed operative
```

**PASS:** Barbican carries provider traffic but does not fulfill.

### Continuing credentialed request

```text
Deployed operative
→ access/unlock ticket
→ Barbican
→ Locksmith
→ Locksmith performs authenticated operation
→ permitted result
→ Barbican
→ deployed operative
```

**PASS:** The credential remains exclusively with Locksmith. Neither operative, Barbican, Muster, nor Theatre receives credential custody.

### Mission return

```text
Theatre
→ completed / terminated / failed mission return
→ Lazaretto
→ Return Package
→ Judicature
```

**PASS:** Lazaretto receives returns and does not handle continuing operational support.

## Aggregate Results

| Test | Verdict |
|---|---|
| CT-001 through CT-012 | PASS |
| CT-013 — La Cortine Is Only a Namespace | PASS |
| CT-014 — Ports Remain Dedicated | PASS |

## Drift Checks

- La Cortine does not route.
- Iron Gate does not sustain continuing missions.
- Barbican does not launch or receive completed missions.
- Barbican does not possess tools or credentials.
- Locksmith does not distribute raw credentials.
- Muster does not mediate continuing provider requests.
- Lazaretto does not process continuing requests.
- Theatre does not directly address internal providers outside Barbican.

# Final Judgment

```text
SUITE PASSED
14 PASS
0 FAIL
```

```text
Muster assembles.
Iron Gate launches.
Barbican exposes continuing providers.
Lazaretto receives returns.
La Cortine merely contains the crossings.
```
