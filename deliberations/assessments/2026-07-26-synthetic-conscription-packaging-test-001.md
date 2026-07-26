# Synthetic Conscription Packaging Test 001

## Scope

Operative path only:

```text
PSC-SYN-001 v0.1 → Conscription → synthetic Operative Package
```

Officer/Gesta/Smith/Spur/Curia work is excluded.

## Exact Inputs

```text
Canonical Persona: PSC-SYN-001 v0.1
Admission: DR-015
Deployment medium: synthetic API-agent package
Medium contract: MEDIUM-SYN-001 v0.1
Profession: emergency systems engineer — synthetic fixture
Governance Doctrine: PGD-SYN-001 v0.1
Human-Trait Canon: HTC-SYN-001 v0.1
Foundry Conformance: DR-014
Pit Findings: PERSONA_TEST_CONFORMANT
```

## Packaging Output

```text
Operative Package: OP-SYN-001 v0.1
Source Persona: PSC-SYN-001 v0.1
Medium: synthetic API-agent package
Status: packaged, not activated
```

The package preserves the persona's professional behavior, uncertainty duties, escalation rules, refusal boundaries, Canon limits, expected inputs/outputs, and tool-interface expectations without granting tools or credentials.

## Assertions

| ID | Assertion | Result |
|---|---|---|
| CON-01 | Exact admitted persona identity and version preserved | PASS |
| CON-02 | Deployment medium is explicit and versioned | PASS |
| CON-03 | Profession and governance doctrine preserved | PASS |
| CON-04 | Human-Trait Canon identifier, version, limits, and counterweights preserved | PASS |
| CON-05 | EC-01 and synthetic EC-02 status preserved | PASS |
| CON-06 | Platform adaptation does not alter profession, doctrine, or Canon traits | PASS |
| CON-07 | Tool schemas are represented without granting tools or credentials | PASS |
| CON-08 | Unsupported medium limitations are recorded rather than silently repaired | PASS |
| CON-09 | Operative package is distinguished from mission binding and deployment | PASS |
| CON-10 | Activation requires a separate downstream authorization and is not performed | PASS |

## Result

```text
Assertions: 10
PASS: 10
FAIL: 0
Finding: OPERATIVE_PACKAGE_CONFORMANT
Package status: synthetic packaged artifact only
Activation: not performed
Mission binding: not performed
Deployment: not performed
External effect: none
```

## Disposition

The synthetic Conscription package preserves the admitted Canonical Persona and its governing boundaries. This test does not admit a live Operative, activate a platform, grant tools or credentials, bind a mission, or authorize deployment.
