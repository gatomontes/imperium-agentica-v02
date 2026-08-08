# MasterMason

## Status

Current theoretical definition of Imperium's non-cognizant runtime authority and executable form of the Charter.

## Purpose

MasterMason makes the authenticated Charter operational. It validates spawning requests and realizes every admitted runtime state transition without interpreting necessity, inventing workflow, exercising Office jurisdiction, or making cognitive dispositions.

MasterMason is not an Office, Seat, Profile, Persona, Officer, operative, or agent. It requires no cognition and cannot deliberate.

## Authority

The Launcher verifies one canonical Bootstrap Manifest under [the Bootstrap Manifest contract](contracts/bootstrap-manifest.md). That Manifest pins the exact Charter generation, compatible MasterMason implementation, and entire primordial operational structure. Only after all-or-nothing verification may the Launcher instantiate MasterMason bound to that Manifest, Charter generation, and Imperium instance.

MasterMason's authority is the mechanically enforceable authority declared by the authenticated Charter. No cognitive constituent grants, vests, expands, or approves that authority at runtime. MasterMason may realize only transitions that the Charter and pinned bootstrap composition explicitly permit. Missing or non-mechanically-decidable authority is refusal, not interpretive discretion.

MasterMason may not discover, select, upgrade, repair, or substitute any primordial artifact. An absent, invalid, incomplete, revoked, incompatible, or mismatched Bootstrap Manifest makes launch invalid.

## Bootstrap

Initial bootstrap is governed exclusively by the pinned [Bootstrap State Machine Contract](contracts/bootstrap-state-machine.md). Ordinary spawning and recovery do not share or enter through that machine.

After the Launcher has verified the complete pinned composition, MasterMason bootstraps Imperium's primordial operational triad in dependency order:

1. activate the pinned Conscription runtime and invoke the sole pinned mechanical Recruiter bootstrap
2. verify the prepared Recruiter against the pinned Profile, substrate, Seat, and mechanical invariants, then bind it to the resident Recruiter Seat
3. commission occupied Conscription to assemble and qualify the pinned Secretary and Rector manifestations
4. verify both returned manifestation packets against their pinned Profiles, substrates, Seats, and Charter generation
5. activate the pinned Secretariat and Castellan definitions
6. bind Secretary and Rector to their exact pinned resident Seats
7. verify and open only the pinned Secretariat–Castellan routes
8. declare the primordial triad ready
9. expose Secretariat as the Operator-facing cognitive interface

Conscription must precede Secretariat and Castellan because Recruiter supplies their resident cognition. Secretariat and Castellan are both primordial because Secretary's one-question-at-a-time intake depends upon immediate Rector direction and disposition.

Secretary and Rector do not accept work before the readiness declaration. If either manifestation, Office activation, binding, or required route fails, neither Office is exposed; MasterMason records the bounded failure and preserves a retryable pre-ready state.

Every bootstrap event must carry the bootstrap transaction, instance, Bootstrap Manifest, and Charter-generation identifiers. MasterMason executes only the pinned transition whose predecessor state, inputs, predicates, action, output, failure code, and retry edge all match. A mismatch refuses the dependent transition.

## Spawning-request management

Every spawning request enters through MasterMason.

During bootstrap, MasterMason originates only the exact Charter-declared and Manifest-pinned primordial commissions. During continuing operation, an authorized occupied Office declares institutional necessity and submits an attributable structured request to MasterMason. A vacant Seat is the target of a request; it is never the requester.

MasterMason mechanically:

1. validates requester identity and occupancy, admitted route, target Office and Seat, exact current Profile, correlation, preconditions, and Charter authority
2. refuses requests whose authority or required facts are absent, ambiguous, stale, mismatched, or not mechanically decidable
3. activates the target Office runtime when the Charter permits it
4. commissions occupied Conscription to assemble and qualify the required manifestation
5. verifies the returned manifestation packet and qualification disposition
6. binds the qualified manifestation to the exact vacant Seat
7. opens only the declared communication routes
8. records the request, Charter basis, validations, runtime events, and resulting disposition

MasterMason manages the request and the runtime transition. Conscription owns incarnation and qualification; the requesting Office owns neither operation.

## Permitted operations

MasterMason may:

- validate and manage every spawning request
- start, suspend, resume, and retire Office runtime instances
- read and enforce the authenticated Charter and verified Office, Seat, Profile, route, and lifecycle declarations
- invoke the sole mechanical Recruiter bootstrap
- commission occupied Conscription
- verify returned manifestation packets
- bind qualified manifestations to exact vacant Seats
- open and close declared communication routes
- suspend or vacate invalid occupancy
- record runtime transitions and bounded failures
- halt or terminate the runtime when the Charter mechanically requires it

MasterMason may not:

- reason, interpret evidence, resolve ambiguity, or judge necessity
- make or replace an Office disposition
- author, approve, sign, install, or qualify a Profile
- create, admit, alter, or interpret a Persona
- assemble or qualify a manifestation
- originate authority or enlarge an admitted route
- discover, select, substitute, or infer compatibility among primordial artifacts
- operate an Office through a vacant Seat
- accept an administrative identity as permission to bypass the Charter

Any mismatch, ambiguity, missing authority, invalid signature, stale artifact, occupied target Seat, undeclared route, or failed invariant fails closed at the smallest dependent boundary.

## Boundary maxim

```text
The Charter commands.
The Bootstrap Manifest pins one complete primordial composition.
The Launcher verifies; it does not choose.
MasterMason makes the pinned Charter executable.
Occupied Offices declare institutional necessity.
MasterMason manages every spawning request.
Conscription assembles and qualifies.
MasterMason binds and operates.
Occupied Seats deliberate and decide.
Imperator administers exceptionally, outside normal runtime sequence.
```
