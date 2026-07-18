# Runtime Layer Structural Map 001

## Status

Candidate diagram derived from current Runtime and Mason drafts.

Not doctrine, production architecture, service topology, or implementation selection.

## Structural Map

```mermaid
flowchart TB
    OP["External Operator"]

    subgraph SEM["Admitted Semantic Layers"]
        direction LR
        C["Cognitive"]
        A["Authority"]
        P["Provenance"]
        PR["Procedure"]
    end

    subgraph COG["Cognitive Layer"]
        M["Mason"]
    end

    subgraph RT["Runtime Layer"]
        direction TB

        CP["Control Plane"]
        RG["Realization and Dispatch Gate"]

        subgraph ENG["Operating Engine"]
            direction LR
            WT["Work Transport"]
            ST["Operational State"]
            FX["Effect Interface"]
        end

        OQ["Observation and Quarantine"]

        CP --> RG
        RG --> WT
        RG --> ST
        RG --> FX

        WT <--> ST
        WT --> FX

        WT --> OQ
        ST --> OQ
        FX --> OQ
    end

    EX["Theatre, Providers, and External Systems"]

    OP -->|"Structural decisions"| M
    M -->|"Maintenance instructions"| CP
    OQ -->|"Operating evidence"| M

    C --> RG
    A --> RG
    P --> RG
    PR --> RG

    FX -->|"External effects"| EX
```

## Cognitive Placement Detail

```mermaid
flowchart TB
    OP["External Operator"]

    subgraph IMP["Imperium — Cognitive Layer"]
        M["Mason"]

        subgraph CIT["Citadel"]
            CU["Curia"]
            MU["Muster"]
            AR["Armory"]
            LO["Locksmith"]
        end
    end

    RT["Runtime Control Plane"]

    OP -->|"Structural instruction"| M
    M -->|"Operate and maintain"| RT
    RT -->|"Operating observations"| M
    LO -.->|"Credential constraints"| M
```

## Component Labels

| Component | Meaning |
|---|---|
| Control Plane | activation, configuration, and recovery mechanisms |
| Realization and Dispatch Gate | contract, Authority, correlation, Procedure, and version checks |
| Work Transport | queues, workers, schedulers, delivery, and retries |
| Operational State | persistence, transactions, locks, isolation, and mappings |
| Effect Interface | credential bindings, adapters, tools, and external effects |
| Observation and Quarantine | results, failures, telemetry, and indeterminate effects |

## Reading Rule

The arrows represent control, dependency, observation, and effect relationships.

They do not define the Imperium mission lifecycle.
