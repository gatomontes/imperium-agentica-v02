# DR-DISPOSITION — Decision Lineage

## Purpose

This file classifies numbered decision records relative to DR-CURRENT.

- **DR-CURRENT**: active decision pointer.
- **Active numbered DR**: explicitly listed by DR-CURRENT.
- **Retained principle**: remains conceptually governing but does not independently authorize implementation.
- **Historical**: preserved decision record that is not current authority.
- **Superseded**: explicitly replaced by a later decision.

Numbering records sequence and provenance. It does not create multiple simultaneous current authorities.

## Superseded Decisions

- DR-008 is superseded by DR-009.
- DR-003 is superseded by DR-004.
- Earlier historical or topology decisions remain available through the registry and decision directory unless explicitly superseded.

## Reading Rule

When current decision state matters, read DR-CURRENT first, then the underlying numbered decision record. Do not infer current authority from a number, filename, directory location, or historical existence alone.
