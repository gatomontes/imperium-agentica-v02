# Runtime Empirical Harness

## Status

Local simulated evidence harness. Not a production Runtime, reference architecture, or admission.

## Purpose

Exercise the candidate Runtime, CONTROL_PLANE, Runtime Maintenance Procedure, Runtime Observation Envelope, and Master Mason boundaries against executable failure and recovery scenarios.

The harness uses Node's built-in test runner and simulated effects only. It contains no credentials, provider integrations, deployment infrastructure, network calls, or autonomous repair.

## Run

```text
cd tests/runtime/empirical-harness
npm test
```

## Evidence boundary

Passing tests establish only that this deliberately small model can preserve the candidate distinctions under the encoded scenarios. They do not prove production safety, performance, durability, distributed-system correctness, or admission readiness by themselves.
