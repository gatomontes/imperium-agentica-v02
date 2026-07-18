# Runtime Single-Node Durability Pressure Run 001

## Status

Completed against the pre-extension Runtime Reference Implementation 001.

## Result

```text
3 PASS / 10 FAIL
```

| ID | Result | Pre-extension finding |
|---|---:|---|
| RSD-001 | FAIL | In-memory state cannot reconstruct after restart. |
| RSD-002 | FAIL | No journal or flush boundary exists. |
| RSD-003 | FAIL | No store-directory writer exclusion exists. |
| RSD-004 | FAIL | No persisted journal exists to validate or refuse. |
| RSD-005 | FAIL | No persisted schema or sequence is checked. |
| RSD-006 | FAIL | Completed effects are lost with the process. |
| RSD-007 | FAIL | Persisted dispatched uncertainty cannot be recovered. |
| RSD-008 | PASS | In-memory indeterminate effects refuse repeat while the process survives. |
| RSD-009 | FAIL | Quarantine cannot survive restart. |
| RSD-010 | PASS | Existing simulated observations contain no secret material. |
| RSD-011 | PASS | Existing successor semantics pass 15 / 15. |
| RSD-012 | FAIL | No durability evidence exists to bound a durability claim. |
| RSD-013 | FAIL | Required observations are held only in memory and disappear on restart. |
