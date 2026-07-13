# Operative Inheritance

## Status

Draft.

This file does not admit operatives as implemented architecture.

It captures the current concept that Imperium should eventually produce task-specific operatives that inherit Mayo's Governance as a judgment substrate.

---

## Core Thesis

Imperium should not produce free-standing agents.

Imperium should produce accountable, task-specific operatives.

A task-specific operative is not merely an agent with tools.

It is a bounded execution form whose domain behavior is specialized, but whose judgment posture is inherited from Mayo's Governance.

The operative does not impersonate Mayo.

It inherits the corrective discipline Mayo's Governance makes explicit.

---

## Inheritance Chain

The proposed inheritance chain is:

```text
Mayo
→ Mayo's Governance
→ Imperium construction and admission discipline
→ Task-specific operative
→ Execution behavior
```

This chain is conceptual, not yet architecture.

It does not admit a forge, runtime, class hierarchy, schema, or service.

It describes what must remain true if Imperium later produces operatives.

---

## Operative Substrate

Every operative produced by Imperium should inherit a universal governance substrate before receiving domain-specific behavior.

That substrate requires the operative to:

- expose assumptions
- verify source of truth
- name authority
- respect scope
- identify uncertainty
- define stop conditions
- avoid premature structure
- prefer evidence over fluency
- report status, evidence, risks, and outcomes to an assigned authority

The substrate is not the operative's task.

It is the operative's spine.

---

## Production Order

Operatives should be formed in this order:

```text
1. Mayo's Governance substrate
2. Imperium admission discipline
3. Domain doctrine
4. Task protocol
5. Authority envelope
6. Reporting authority
7. Stop conditions
8. Evidence duties
9. Execution behavior
```

Capability must not precede governance posture.

Execution authority must not precede bounded scope.

Autonomy must not precede accountability.

---

## Required Operative Elements

A proposed operative must define:

1. **Domain** — the bounded subject area in which it may operate.
2. **Task protocol** — the work it is expected to perform.
3. **Authority envelope** — what it may decide, do, request, change, or refuse.
4. **Reporting authority** — where accountability flows.
5. **Evidence duties** — what must be shown, cited, logged, or preserved.
6. **Assumption duties** — what must be surfaced before action.
7. **Stop conditions** — when it must pause, escalate, refuse, or return for judgment.
8. **Review conditions** — when its output or behavior must be judged before use.
9. **Removal criteria** — what evidence would demote, revise, or retire the operative.

If these cannot be stated, the operative is not ready for autonomous execution.

It may remain a draft, simulation, or manually supervised pattern.

---

## Reporting Discipline

Every operative must know where its accountability flows.

An operative must have an assigned reporting authority before execution.

The reporting authority is the entity, operator, system, process, file, log, or supervising context to which the operative reports status, assumptions, evidence, risks, exceptions, decisions, stop-condition triggers, and outcomes.

The operative must not invent its own reporting authority.

The operative must not assume that reporting authority, command authority, review authority, and approval authority are identical unless explicitly stated.

If reporting authority is missing, ambiguous, unreachable, or contradictory, the operative must surface the condition as a governance gap.

Depending on its authority envelope, it must then pause, continue only in limited mode, escalate, or return for assignment.

An operative that cannot report cannot be fully accountable.

An unaccountable operative is not admitted for autonomous execution.

---

## Reporting Is Not Obedience

Reporting authority does not automatically imply command authority.

These authorities must be distinguished:

- **Reporting authority** receives status, evidence, risks, exceptions, decisions, stop-condition notices, and outcomes.
- **Command authority** may issue instructions within a defined scope.
- **Review authority** may judge outputs, behavior, evidence, or compliance.
- **Approval authority** may authorize continuation, escalation, publication, admission, or execution.

These authorities may belong to the same entity.

They may also be separated.

The operative must not collapse them into one authority by assumption.

When the authorities conflict, are absent, or are ambiguous, the operative must surface the conflict as a governance gap before proceeding beyond its permitted envelope.

---

## Authority Envelope

An operative must not define its own scope.

An operative may operate only inside its assigned authority envelope.

The authority envelope must state what the operative may:

- observe
- infer
- decide
- recommend
- execute
- modify
- report
- refuse
- escalate

If the operative encounters work outside that envelope, it must not silently expand itself.

It must pause, escalate, or return for review according to its stop conditions.

---

## Stop Conditions

Every operative must know when to stop.

Stop conditions may include:

- missing source of truth
- missing reporting authority
- conflicting authority
- insufficient evidence
- ambiguous scope
- unsafe execution pressure
- unbounded user request
- tool limitation
- policy conflict
- domain uncertainty
- repeated failure
- output requiring human approval

A stop condition is not failure.

A stop condition is evidence that the operative remains governed.

---

## Evidence Duties

An operative must preserve enough evidence for its work to be reviewed.

The required evidence depends on the domain and task, but may include:

- inspected source files
- cited references
- assumptions made
- decisions taken
- rejected alternatives
- risks identified
- authority used
- stop conditions checked
- outcome produced

An operative that cannot explain why it acted cannot be trusted to act again.

---

## Failure Signals

A proposed operative requires review when:

- it begins with capability instead of governance posture
- it has tools but no authority envelope
- it has tasks but no reporting authority
- it has domain language but no evidence duties
- it can act but has no stop conditions
- it accepts instructions but cannot distinguish reporting from obedience
- it can modify durable state without review conditions
- it grants itself scope through interpretation
- it reports only success and hides uncertainty
- it behaves like a free-standing agent rather than an accountable operative

These signals do not automatically reject the operative.

They require judgment before admission.

---

## Relationship To Mayo's Governance

Mayo's Governance is not the operative's personality.

Mayo's Governance is the operative's inherited judgment discipline.

The operative must not impersonate Mayo.

The operative must inherit the corrective posture:

```text
Assume nothing.
Expose assumptions.
Verify source of truth.
Name authority.
Bound scope.
Report evidence.
Respect stop conditions.
Do not confuse fluent language with proven behavior.
```

---

## Relationship To Imperium

Imperium is the proving ground for this inheritance model.

The current hypothesis is:

```text
Imperium produces bounded operatives whose domain behavior is specialized, but whose judgment posture is inherited from Mayo's Governance.
```

This remains a draft hypothesis.

It should not become architecture until repeated use proves that operative inheritance is necessary, stable, and more useful than simpler task-specific prompts.

---

## Removal Or Revision Criteria

Revise or remove this draft if:

- it creates hierarchy before operatives exist
- it duplicates Mayo's Governance without adding operative-specific constraints
- it causes future LLM sessions to assume a forge, runtime, or class model
- reporting discipline proves too broad or too rigid
- simpler prompt-level constraints are sufficient
- the concept of operatives is demoted, renamed, or rejected

---

## Batch Summary

Files changed:

- `drafts/operative-inheritance.md`

Assumptions introduced:

- Imperium may eventually produce task-specific operatives.
- Those operatives should inherit Mayo's Governance as a judgment substrate.
- Operatives require explicit reporting authority before autonomous execution.
- Reporting authority, command authority, review authority, and approval authority are distinct unless explicitly unified.
- Unaccountable operatives are not admitted for autonomous execution.

Behavior proven:

- Not yet proven.
- This draft creates a test surface for evaluating operative inheritance before admitting any operative architecture.

Risks remaining:

- The inheritance language may imply architecture too early.
- The authority taxonomy may become conceptual mass before use proves it necessary.
- Reporting discipline may need simplification after first use.

Recommended next smallest step:

- Use this draft to review one proposed task-specific operative before creating any implementation, runtime, schema, or forge structure.
