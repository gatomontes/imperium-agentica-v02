# Runtime Reference Placement Conformance Plan 001

## Status

Candidate plan exercised by five focused placement tests and thirty-five preserved successor tests.

## Conformance Axes

| Axis | Required behavior |
|---|---|
| Ownership | executable reference lives under `layers/runtime/reference/` |
| Singularity | no duplicate source modules remain under the evidence package |
| Package identity | package is private and named `@imperium-agentica/runtime-reference` |
| Export surface | exactly five approved entry points are declared |
| Consumer boundary | repository tests import the layer-owned location directly |
| Production separation | `reference/` remains outside the RTB-002 manifest |
| Semantic ownership | software encoding does not absorb cited-layer ownership |
| Contract pins | exact admitted references remain byte-unchanged |
| Behavior regression | all 35 prior successor tests remain green |
| Historical regression | empirical harness remains 11 / 11 |
| Dependency boundary | no dependency, workspace, build, publish, or install mechanism is added |

## Stable Surface

```text
@imperium-agentica/runtime-reference
@imperium-agentica/runtime-reference/contracts
@imperium-agentica/runtime-reference/adapters/in-memory
@imperium-agentica/runtime-reference/adapters/file
@imperium-agentica/runtime-reference/coordination/deterministic
```

## Merge Gate

Before candidate merge:

1. require combined successor 40 / 40
2. require historical harness 11 / 11
3. require repository regression PASS
4. verify zero production manifest or semantic changes
5. verify source movement without duplication
6. preserve the private nonproduction boundary

## Non-Goal

Passing this plan does not admit a production implementation or promise public package compatibility.
