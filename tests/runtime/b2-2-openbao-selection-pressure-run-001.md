# B2.2 OpenBao Selection Pressure Run 001

## Result

```text
18 PASS / 0 FAIL
Store selected: OpenBao
Topology selected: isolated single-node Ubuntu VPS
Instance running: no
Implementation files changed: 0
External effects: 0
```

| ID | Result | Finding |
|---|---:|---|
| B2S-001 | PASS | Product and topology are explicit. |
| B2S-002 | PASS | Store is intentionally separated from Imperium's host. |
| B2S-003 | PASS | Store-host failure maps to refusal. |
| B2S-004 | PASS | No HA claim is made. |
| B2S-005 | PASS | Restart remains sealed until operator action. |
| B2S-006 | PASS | Bootstrap targets short-lived response wrapping and transient custody. |
| B2S-007 | PASS | Root token is excluded from normal operation. |
| B2S-008 | PASS | Public UI and unrestricted API exposure are prohibited. |
| B2S-009 | PASS | Credential tests require functioning audit evidence. |
| B2S-010 | PASS | Resolution remains inside Runtime custody. |
| B2S-011 | PASS | Adapter conforms to the synthetic port. |
| B2S-012 | PASS | Exact patch and digest precede implementation evidence. |
| B2S-013 | PASS | Backup claims require isolated restore evidence. |
| B2S-014 | PASS | Initial tenant scope is one. |
| B2S-015 | PASS | Selection is nonproduction only. |
| B2S-016 | PASS | HA requires a new decision. |
| B2S-017 | PASS | Supersession remains evidence-based. |
| B2S-018 | PASS | No instance, SDK, account, value, or effect exists. |

## Evidence Limit

This proves decision coherence only, not OpenBao behavior, security, durability, or recovery.