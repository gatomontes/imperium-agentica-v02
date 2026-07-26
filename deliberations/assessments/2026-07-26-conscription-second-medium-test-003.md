# Conscription Second Medium Test 003

## Scope

Operative path only. This test adapts the same admitted persona to a second synthetic medium without creating a live agent.

## Inputs

```text
Canonical Persona: PSC-SYN-001 v0.1
Existing package: OP-SYN-001 v0.1 / MEDIUM-SYN-001
New medium: synthetic Codex skill package / MEDIUM-SYN-002 v0.1
Foundry Conformance: DR-014
Persona Admission: DR-015
```

## Assertions

| ID | Check | Result |
|---|---|---|
| MED-01 | Same Canonical Persona identity and version preserved | PASS |
| MED-02 | Profession and governance doctrine preserved | PASS |
| MED-03 | Human-Trait Canon identifier, limits, and counterweights preserved | PASS |
| MED-04 | Medium-specific syntax changes do not change semantic behavior | PASS |
| MED-05 | Tool expectations remain expectations; no tools or credentials granted | PASS |
| MED-06 | Refusal, uncertainty, escalation, and stop conditions preserved | PASS |
| MED-07 | Medium mismatch or unsupported feature produces refusal or revision | PASS |
| MED-08 | New package receives its own version, conformance record, and admission boundary | PASS |

## Result

```text
Assertions: 8
PASS: 8
FAIL: 0
Finding: OPERATIVE_PACKAGE_CONFORMANT
Candidate package: OP-SYN-002 v0.1
State: synthetic package candidate; not admitted, activated, mission-bound, or deployed
External effect: none
```

## Finding

The semantic package can be adapted across two media without requiring persona reconstruction, provided exact upstream identity, boundaries, behavior, and limits remain fixed. The second package is not admitted by this test.
