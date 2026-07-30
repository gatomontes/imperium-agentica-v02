# DR-056 — Execution Attempt-Record and Evidence/Provenance Contract

Status: admitted semantic contract; pressure-tested and admitted by DR-057.

## Purpose

Define the authoritative record produced for every Execution attempt, refusal, interruption, or indeterminate dispatch, including identity, authority, dispatch, outcome, evidence, provenance, custody, and return linkage.

## Contract

Each attempted, refused, interrupted, or indeterminate action produces one immutable attempt record. The record correlates the mission, execution envelope version, selected Operative/Execution identity, action identity, effect identity, authority reference, applicable procedure reference, dispatch phase, provider-outcome status, evidence status, provenance, ordering markers, custody state, and responsible next destination.

The record distinguishes requested action, authorized action, dispatched action, observed provider outcome, interpreted result, and returned disposition. It records the authority or Curia disposition reference separately from the execution record; recording an event never grants authority, proves completion, or decides disposition.

Evidence status uses explicit states: absent, declared, received-unsanitized, sanitized, corroborated, contradicted, indeterminate, and not-applicable. Provenance identifies source, acquisition context, transformation, and uncertainty. Internal Runtime observation is identified separately and may not be represented as external evidence. Missing evidence does not become approval, completion, or proof of non-occurrence.

Custody transitions are explicit and append-only. Execution records what it received, produced, forwarded, quarantined, or returned; Lazaretto owns sanitation and release of external/Theatre material; the receiving authority records disposition. External material remains unsanitized until Lazaretto completes its boundary-preserving sanitation.

Successor attempts link to predecessor records without overwriting them. Effect lineage remains stable across retries and deliberate effect supersession is explicit. No record permits authority transfer, envelope reopening, credential exposure, or unapproved external effect.

## Ownership and Boundary

Execution owns completeness, correlation, immutability, and dispatch/outcome recording within its envelope. Authority owns authorization and disposition; Lazaretto owns sanitation and release of external return material. No record is an authorization, a proof of success, or an activation event.

## Gate

This contract is admitted for current semantic use after DR-057 synthetic pressure testing. It authorizes no implementation, Runtime operation, activation, deployment, credentials, provider interaction, live data, or external effect.
