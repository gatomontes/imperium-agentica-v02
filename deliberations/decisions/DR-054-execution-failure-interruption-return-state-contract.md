# DR-054 — Execution Failure, Interruption, and Return-State Contract

Status: active semantic contract proposal; pressure testing pending.

## Purpose

Define how Execution classifies failure and interruption, preserves the attempted-action record, halts or quarantines safely, and returns the mission to the responsible authority without inferring success or approval.

## Contract

Execution must distinguish at least:

- refusal before attempt;
- rejected action before dispatch;
- tool or provider failure;
- pre-dispatch timeout or interruption;
- post-dispatch timeout or interruption where provider outcome is known;
- post-dispatch timeout or interruption where provider outcome is unknown;
- partial result;
- indeterminate external state;
- completed result;
- termination by authority or envelope condition.

Every state records the envelope version, action identity, effect identity, authority reference, provenance, evidence status, dispatch phase, provider-outcome status, and responsible next destination. The effect identity remains stable across retries that target the same external effect, or is explicitly superseded with a traceable relationship. A failure or interruption never becomes a successful result by silence, retry, or provider response.

A pre-dispatch timeout or interruption creates no external-effect claim and is classified without indeterminate quarantine unless other evidence establishes dispatch. A post-dispatch timeout with a known provider outcome is classified from that outcome. A post-dispatch timeout with an unknown provider outcome is indeterminate, quarantined, and returned for disposition; timeout alone does not establish indeterminacy.

Retry is a new bounded attempt requiring a fresh dispatch-time authority finding, applicable procedure permission, exact correlation to the prior action and effect identities, and evidence that the prior effect did not occur or that repetition is explicitly safe. A retry receives a successor action identity and preserves the same effect identity unless a deliberate supersession is authorized. An indeterminate external state is quarantined and returned for disposition; Execution does not assume rollback, completion, or safety.

Returns containing provider-returned or other external/Theatre material pass through Lazaretto for sanitization before they are presented to Curia or another authority. Internal Runtime observations may follow the authorized internal return path, but are not treated as sanitized external content. Execution may stop, preserve evidence, and route according to the envelope and these sanitation rules.

Execution may not alter authority, reopen an admitted envelope, bypass Iron Gate, make La Cortine act as a router, expose credentials, or produce an external effect without its own explicit gate.

## Gate

This proposal requires synthetic pressure testing before admission. It authorizes no implementation, Runtime operation, activation, deployment, credentials, provider interaction, live data, or external effect.
