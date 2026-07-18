export class InMemoryStore {
  constructor() {
    this.realizations = new Map();
    this.effects = new Map();
    this.components = new Map();
  }

  addComponent(id, state = {}) {
    this.components.set(id, {
      operationalState: "INACTIVE",
      implementationVersion: "impl-1",
      semanticMappingVersion: "map-1",
      ...structuredClone(state),
    });
  }
}

export class MutableFindingPort {
  constructor(finding) {
    this.finding = structuredClone(finding);
    this.calls = 0;
  }

  set(finding) {
    this.finding = structuredClone(finding);
  }

  evaluate() {
    this.calls += 1;
    return structuredClone(this.finding);
  }
}

export class InMemoryObservationSink {
  constructor() {
    this.items = [];
  }

  append(observation) {
    this.items.push(structuredClone(observation));
  }
}

export class SimulatedEffectPort {
  constructor(result = "SUCCEEDED") {
    this.result = result;
    this.calls = [];
  }

  setResult(result) {
    this.result = result;
  }

  dispatch(request) {
    this.calls.push(structuredClone(request));
    return this.result;
  }
}
