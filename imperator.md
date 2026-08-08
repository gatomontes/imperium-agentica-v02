# Imperator

## Status

Current theoretical definition of Imperium's primordial constitutional authority and owner.

## Purpose

Imperator owns the Imperium instance and holds its Offices. It supplies the narrow authority required to constitute the Office corpus, approve exact Officer Profiles, and vest runtime operation without exercising an Office's reserved jurisdiction.

Imperator is not an Office, a substitute resident Officer, a universal decision maker, or a runtime operator.

## Activation authority

Upon Imperium activation, the Launcher instantiates Imperator and MasterMason from the authenticated distribution trust root. Imperator then:

1. verifies the canonical Office, Seat, Profile, and route corpus
2. constitutes and holds the verified Offices
3. verifies each Office-stewarded Profile's identity, target Seat, digest, version, and current/active designation
4. signs the exact current/active Profile version, thereby approving it for installation
5. vests MasterMason with bounded runtime authority over this exact Imperium instance
6. records every constitution, signature, vesting, suspension, restoration, and termination event within its jurisdiction

Imperator does not detect operational necessity, activate Offices, request occupants, open routes, bind manifestations, or otherwise operate the runtime. MasterMason performs those mechanical operations under the verified corpus and Imperator's vesting.

## Profile approval

A Profile is approved when and only when:

- its owning Office stewards it for an exact Seat
- it is the Office's sole current/active version for that Seat
- its content digest and identifying metadata are exact
- it carries a valid Imperator digital signature over those facts

Imperator's signature constitutes approval; existence without a valid signature does not. An unsigned, invalidly signed, unrecognized, altered, stale, or superseded Profile is not installable.

Each signed Profile must conform to the shared [Profile Artifact Contract](contracts/profile-artifact.md). Imperator signs an approval attestation bound to the immutable Profile identity, version, content digest, owning Office, target Seat, and disposition. The owning Office separately issues the current/active designation after approval. A revision is a new immutable version requiring a new digest, examination disposition where required, signature, and designation.

Senate examination of Officer Profiles is reserved for later definition. Until that jurisdiction is established, Imperator signs the verified initial constitutional corpus directly. Garrison has no Profile jurisdiction: Offices steward Profiles; Garrison admits and lodges Personas.

## Runtime vesting

Imperator vests MasterMason only after verifying the exact constitutional corpus and runtime identity to which the vesting applies.

Vesting identifies its holder, instance, scope, permitted operations, governing corpus, duration, revocation conditions, and evidence. It grants no cognitive or Office jurisdiction. MasterMason may realize only admitted transitions; it may not interpret or enlarge the authority vested.

## Continuing powers

Imperator may:

- own the Imperium instance and hold its Offices
- verify and constitute the canonical Office corpus
- approve exact current/active Profiles by digital signature
- vest, suspend, restore, or revoke MasterMason's bounded runtime authority
- suspend or terminate the Imperium instance
- preserve the constitutional record of those acts

Imperator may not:

- perform an Office's reserved cognitive work or disposition
- act as a vacant resident Officer
- author an Office's Profile
- qualify Officers or operatives
- forge, confirm, admit, or lodge Personas
- detect operational necessity or choose workflow transitions
- activate Offices, request occupants, bind manifestations, or open routes
- use ownership as authority to bypass Seat occupancy

## Boundary maxim

```text
Imperator owns the instance, constitutes the Offices, and approves Profiles.
Imperator vests MasterMason with bounded runtime authority.
MasterMason operates the institutional runtime mechanically.
Conscription qualifies Officers and operatives.
Occupied Seats exercise Office authority.
```
