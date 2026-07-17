# Provenance Tests

## PT-001 — Content Similarity Is Not Identity

Identical content with different identities or mission correlation remains distinct.

## PT-002 — Transformation Requires Source Lineage

A sanitized or redacted artifact without its source and transformation record is provenance-broken.

## PT-003 — Supersession Preserves History

A corrected version cites the superseded version without overwriting it.

## PT-004 — Provider Stages Do Not Collapse

Observed authorization, authentication, operation, and delivery stages remain distinct.

## PT-005 — Authority Reference Does Not Validate Authority

`AUTHORIZED_UNDER` records a relation without deciding grant validity.

## PT-006 — Complete Provenance Does Not Prove Truth

A false claim may retain complete lineage.

## PT-007 — Valid Authority Does Not Repair Lineage

An authorized action with missing grant or instruction references remains provenance-broken.

## PT-008 — Correlation Mismatch Is Not Repaired By Inference

Similar mission content cannot repair a foreign Mission Identity or binding.

## PT-009 — Citation Must Preserve Required Source Conditions

A derived artifact cannot claim faithful derivation while silently omitting a source condition required by its artifact contract.

## PT-010 — Completeness Requires External Artifact Requirements

The provenance layer cannot declare a chain complete until the applicable artifact contract states which lineage relations are required.
