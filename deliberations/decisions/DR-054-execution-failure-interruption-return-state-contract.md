# DR-054 — Execution Failure, Interruption, and Return-State Contract

Status: active semantic contract proposal; pressure testing pending.

## Purpose

Define how Execution classifies failure and interruption, preserves the attempted-action record, halts or quarantines safely, and returns the mission to the responsible authority without inferring success or approval.

## Contract

Execution must distinguish at least:

- refusal before attempt;
- rejected action before dispatch;
- tool or provider failure;
- timeout or interruption;
- partial result;
- indeterminate external state;
- completed result;
- termination by authority or envelope condition.

Every state records the envelope version, action identity, authority reference, provenance, evidence status, and responsible next destination. A failure or interruption never becomes a successful result by silence, retry, or provider response.

Retry is a new bounded attempt requiring an applicable authority and traceable successor action record. An indeterminate external state is quarantined and returned for disposition; Execution does not assume rollback, completion, or safety.

Execution may stop, preserve evidence, and route according to the envelope. It may not alter authority, reopen an admitted envelope, bypass Iron Gate, make La Cortine act as a router, expose credentials, or produce an external effect without its own explicit gate.

## Gate

This proposal requires synthetic pressure testing before admission. It authorizes no implementation, Runtime operation, activation, deployment, credentials, provider interaction, live data, or external effect.
