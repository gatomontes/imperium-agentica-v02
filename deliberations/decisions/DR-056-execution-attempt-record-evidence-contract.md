# DR-056 — Execution Attempt-Record and Evidence/Provenance Contract

Status: active semantic contract proposal; pressure testing pending.

## Purpose

Define the authoritative record produced for each Execution attempt, including identity, authority, dispatch, outcome, evidence, provenance, custody, and return linkage.

## Contract

Each attempted or refused action produces one immutable attempt record with a unique action identity, effect identity, envelope version, authority reference, applicable procedure reference, dispatch phase, provider-outcome status, evidence status, provenance, timestamps or ordering markers, custody state, and responsible next destination.

The record distinguishes requested action, authorized action, dispatched action, observed provider outcome, interpreted result, and returned disposition. It links successor attempts without overwriting predecessor records and preserves deliberate effect supersession explicitly.

External or Theatre-sourced material is marked as unsanitized until Lazaretto completes its boundary-preserving sanitation. Internal Runtime observation is identified separately and may not be represented as external evidence. Missing evidence does not become approval, completion, or proof of non-occurrence.

Execution owns the completeness and immutability of the attempt record within its envelope; authority owns disposition, and Lazaretto owns sanitation of external return material. No record permits authority transfer, envelope reopening, credential exposure, or unapproved external effect.

## Gate

This proposal requires synthetic pressure testing before admission. It authorizes no implementation, Runtime operation, activation, deployment, credentials, provider interaction, live data, or external effect.
