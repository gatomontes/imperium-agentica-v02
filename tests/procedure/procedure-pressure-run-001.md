# Procedure Pressure Run 001

## Result

```text
30 PASS
5 FAIL
```

## Subjects

- `layers/procedure/drafts/counsel-unavailability-procedure.md`
- `layers/procedure/drafts/mission-closure-and-release-procedure.md`
- `layers/procedure/drafts/imperium-lifecycle-procedure.md`

## Passing Areas

- counsel entry, withholding, separability, mismatch, urgency, escalation, authority-loss, durable-gap, and elapsed-time boundaries
- completion claim, partial completion, missing return, pending-provider, release-authority, pre-closure release, mismatch, authority-loss, and terminal-safe-state boundaries
- direct delivery, persona reuse, optional canon, launch authority, provider observation, mission loop, collision, omission, and Runtime boundaries

## Failures

### PRP-019 — Reporting While Release Unresolved

**FAIL**

The closure procedure placed reporting after required release completion. This could suppress an operator-facing report precisely when release remains unresolved.

Required revision: branch reporting from authorized closure, not successful release.

### PRP-020 — Curia Session End While Release Pending

**FAIL**

The closure procedure grouped Curia Session end with completed release.

Required revision: Curia Session may close after closure; the Muster Instance remains until release completes or is explicitly unresolved.

### PRP-021 — Closure Correction

**FAIL**

No explicit post-closure correction and supersession branch exists.

Required revision: define supersession without silent reopening, rebinding, or reversal.

### PRP-034 — Report After Closure

**FAIL**

The lifecycle order could be read as requiring the full closure-and-release procedure to finish before reporting.

Required revision: make release, session end, and reporting explicit post-closure branches.

### PRP-035 — Formation Without Authority

**FAIL**

The lifecycle did not explicitly require Authority findings for `FORM_MISSION` and `APPROVE_WORK_SPECIFICATION`.

Required revision: identity allocation remains non-authorizing; formation and approval require exact Authority findings.

## Conclusion

The Procedure boundary survived, but the drafts did not.

Revise and rerun.
