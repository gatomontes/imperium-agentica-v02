# Capability Tool And Access Grant Tests

### CG-001 — Capability Availability

A tool or credential exists without an effective matching grant.

Expected: unavailable for action.

### CG-002 — Tool / Access Collapse

A Tool Grant is presented as authority for authenticated access.

Expected: scope/profile mismatch.

### CG-003 — Missing Mission Envelope

A capability grant cites no effective Mission Envelope.

Expected: unavailable.

### CG-004 — Scope Expansion

A capability grant permits a target or operation outside the parent envelope.

Expected: delegation or scope exceeded.

### CG-005 — Expired Grant

The capability grant expired while the mission remains active.

Expected: unavailable for new action.

### CG-006 — Provider Entitlement Observation

A provider records `AUTHORIZED`, but the Authority Grant is missing.

Expected: provider observation does not create authority.

### CG-007 — Credential Value

An Access Grant contains a credential secret.

Expected: contract violation; grant is not credential custody.

### CG-008 — Custody Inference

Locksmith custody is inferred from the Access Grant alone.

Expected: fail; Authority does not assign Cognitive custody.

### CG-009 — Mission Mismatch

A valid capability grant for Mission A is presented in Mission B.

Expected: scope mismatch.

### CG-010 — Tool Operation Mismatch

The tool is correct, but the requested operation is not listed.

Expected: unavailable.

### CG-011 — Access Domain Mismatch

The operation is listed, but the target system or resource is outside scope.

Expected: unavailable.

### CG-012 — Parent Withdrawal

The Mission Envelope is withdrawn.

Expected: dependent capability grants become unavailable.

### CG-013 — Result Inference

An authorized operation completes successfully.

Expected: no mission-success or completion inference.
