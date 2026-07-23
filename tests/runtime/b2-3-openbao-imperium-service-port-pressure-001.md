# B2.3 OpenBao Imperium Service-Port Pressure 001

## Subject

Decision pressure for an OpenBao-hosted Imperium credential-acquisition service port.

No OpenBao process, plugin, workflow, credential, network, or external effect is exercised.

## Result

```text
Decision coherence: PASS
Supported workflow surface: DOCUMENTED
Exact workflow sequence: UNPROVEN
External plugin need: NOT ESTABLISHED
Core fork need: NOT ESTABLISHED
Executable candidate: NEXT
Live compatibility: B2.4
```

## Pressure Matrix

| ID | Pressure | Candidate response | Result |
|---|---|---|---|
| ISP-001 | Runtime receives a reusable OpenBao token | token remains internal to workflow | DESIGN PASS |
| ISP-002 | caller redirects the secret path | one workflow endpoint per fixed binding/version; no caller path | DESIGN PASS |
| ISP-003 | caller requests implicit latest | workflow pins a positive KV version | DESIGN PASS |
| ISP-004 | bootstrap bearer is intercepted | short-lived, response-wrapped, one-use proof remains credential material | CONDITIONAL |
| ISP-005 | workflow is anonymous authority | unauthenticated means no prior OpenBao token; wrapped proof is still required | DESIGN PASS |
| ISP-006 | trace leaks intermediate material | Runtime trace capability forbidden; real-material trace forbidden | DESIGN PASS |
| ISP-007 | management mutation widens authority | Runtime has no manage/list/read/delete capability; updates require CAS | DESIGN PASS |
| ISP-008 | read succeeds and revoke fails | no output; internal token uncertainty held until expiry/evidence | DESIGN PASS |
| ISP-009 | retry reuses consumed proof | retry refused; new proof and full Imperium revalidation required | DESIGN PASS |
| ISP-010 | workflow failure leaks topology | one generic Runtime-facing acquisition refusal | DESIGN PASS |
| ISP-011 | arbitrary CEL/template input redirects execution | caller cannot supply workflow expressions or path fragments | DESIGN PASS |
| ISP-012 | workflow documentation is mistaken or incomplete | exact sequence requires pinned-binary executable pressure | OPEN |
| ISP-013 | workflow cannot enforce the contract | checksum-pinned external plugin is next supported fallback | CONDITIONAL |
| ISP-014 | plugin still lacks required core access | core fork requires separate evidence and maintenance decision | CONDITIONAL |
| ISP-015 | service port becomes an institutional office | classified as internal mechanism only | DESIGN PASS |
| ISP-016 | async boundary widens Runtime dispatch | existing async acquisition and synchronous consume/dispatch remain unchanged | DESIGN PASS |

## Rejected Alternatives

### Per-acquisition token returned to Imperium

Rejected. It exports reusable session authority and enlarges the credential-erasure and diagnostic surface.

### Process-scoped renewable token in Imperium

Rejected as the target for this leg. It creates a durable in-process authority object broader than one exact acquisition.

### OpenBao Agent or Proxy token sink

Rejected as the primary service-port realization. It still delivers or proxies token authority on Imperium's side and does not itself encode the fixed Imperium operation.

### Core fork first

Rejected without evidence. It creates a permanent security-patch and upgrade burden before supported workflows and external plugins have failed.

## Principal Residual Risk

The supported Profiles and Workflows documentation makes the service port plausible, not proven. In particular, the exact unwrap → AppRole login → exact KV read → revoke → selected output sequence and its audit/history behavior must be exercised against OpenBao 2.6.1 with synthetic material.

## Conclusion

The service-port decision is coherent enough to replace client-held OpenBao token designs as the B2.3 target.

Implementation remains pending. The next increment is a repository-local executable client contract and a pinned workflow definition under synthetic pressure.
