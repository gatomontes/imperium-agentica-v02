# DR-058 — Execution Result Interpretation and Disposition Handoff Contract

Status: active semantic contract proposal; admission pending pressure test.

## Purpose

Define how Execution distinguishes observed provider outcome from interpreted result and returns a bounded disposition packet to the responsible authority without becoming the authority or deciding the mission.

## Contract

Execution may classify and summarize an observed outcome only within the active envelope, using the admitted attempt record, evidence status, provenance, procedure, and uncertainty markers. Interpretation must preserve the distinction between observed fact, derived inference, unresolved ambiguity, and unsupported claim.

Every returned packet correlates the mission, envelope version, Operative/Execution identity, attempt and effect lineage, authority reference, evidence/provenance status, interpretation status, uncertainty, requested disposition, and next destination. A packet may report success, partial completion, refusal, failure, interruption, indeterminate outcome, contradiction, or insufficient evidence; it may not convert absence of evidence into approval, completion, or proof of non-occurrence.

Execution may recommend a bounded disposition or request clarification when the envelope permits, but the receiving authority owns acceptance, rejection, replan, retry authorization, quarantine, termination, or other disposition. A returned packet does not reopen the envelope, grant authority, expose credentials, activate an Operative, or authorize a new effect.

Unsanitized external material remains subject to Lazaretto before it is used as authoritative return material. Contradictory or insufficient evidence is returned with its uncertainty and routed for authority disposition; it is never silently normalized.

## Ownership and Boundary

Execution owns bounded outcome interpretation and complete handoff packaging. Attempt records remain immutable evidence/provenance records. Authority owns disposition. Lazaretto owns sanitation and release of external return material. Curia, Muster, Runtime, providers, and implementation remain outside this proposal.

## Gate

This contract is proposed for semantic review and synthetic pressure testing only. It authorizes no implementation, Runtime operation, activation, deployment, credentials, provider interaction, live data, or external effect.
