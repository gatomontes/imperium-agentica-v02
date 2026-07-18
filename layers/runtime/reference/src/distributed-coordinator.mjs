function clone(value) {
  return value === undefined ? undefined : structuredClone(value);
}

export class DeterministicQuorumCoordinator {
  constructor(members = ["node-a", "node-b", "node-c"]) {
    if (!Array.isArray(members) || members.length < 3 || new Set(members).size !== members.length) {
      throw new Error("QUORUM_MEMBERS_INVALID");
    }
    this.members = [...members];
    this.majority = Math.floor(members.length / 2) + 1;
    this.reachable = new Set(members);
    this.term = 0;
    this.activeLease = null;
    this.effects = new Map();
    this.events = [];
  }

  setReachable(members) {
    if (members.some((member) => !this.members.includes(member))) throw new Error("QUORUM_MEMBER_UNKNOWN");
    this.reachable = new Set(members);
  }

  hasQuorum(nodeId) {
    return this.reachable.has(nodeId) && this.reachable.size >= this.majority;
  }

  acquire(nodeId) {
    if (!this.members.includes(nodeId)) return { accepted: false, reason: "NODE_UNKNOWN" };
    if (!this.hasQuorum(nodeId)) return { accepted: false, reason: "QUORUM_UNAVAILABLE" };
    const lease = {
      nodeId,
      term: ++this.term,
      fencingToken: `fence-${this.term}`,
    };
    this.activeLease = lease;
    this.events.push({ type: "LEASE_ACQUIRED", ...lease });
    return { accepted: true, lease: clone(lease) };
  }

  validate(lease) {
    if (!lease || !this.activeLease) return { accepted: false, reason: "LEASE_ABSENT" };
    if (!this.hasQuorum(lease.nodeId)) return { accepted: false, reason: "QUORUM_UNAVAILABLE" };
    if (lease.term !== this.activeLease.term ||
        lease.nodeId !== this.activeLease.nodeId ||
        lease.fencingToken !== this.activeLease.fencingToken) {
      return { accepted: false, reason: "STALE_FENCE" };
    }
    return { accepted: true };
  }

  claimEffect(lease, { effectId, attemptId }) {
    const valid = this.validate(lease);
    if (!valid.accepted) return valid;
    const prior = this.effects.get(effectId);
    if (prior && prior.status !== "ABANDONED_PRE_DISPATCH") {
      return {
        accepted: false,
        reason: prior.status === "QUARANTINED_INDETERMINATE"
          ? "INDETERMINATE_EFFECT_QUARANTINED"
          : "DUPLICATE_EFFECT",
      };
    }
    const effect = {
      effectId,
      attemptId,
      status: "CLAIMED",
      nodeId: lease.nodeId,
      term: lease.term,
      fencingToken: lease.fencingToken,
    };
    this.effects.set(effectId, effect);
    this.events.push({ type: "EFFECT_CLAIMED", ...effect });
    return { accepted: true, fencingToken: lease.fencingToken };
  }

  markDispatched(lease, { effectId, attemptId }) {
    const valid = this.validate(lease);
    if (!valid.accepted) return valid;
    const effect = this.effects.get(effectId);
    if (!this.owns(effect, lease, attemptId) || effect.status !== "CLAIMED") {
      return { accepted: false, reason: "EFFECT_CLAIM_NOT_CURRENT" };
    }
    effect.status = "DISPATCHED";
    this.events.push({ type: "EFFECT_DISPATCHED", effectId, attemptId, fencingToken: lease.fencingToken });
    return { accepted: true };
  }

  complete(lease, { effectId, attemptId, result }) {
    const valid = this.validate(lease);
    if (!valid.accepted) return valid;
    const effect = this.effects.get(effectId);
    if (!this.owns(effect, lease, attemptId) || effect.status !== "DISPATCHED") {
      return { accepted: false, reason: "EFFECT_DISPATCH_NOT_CURRENT" };
    }
    effect.status = result;
    this.events.push({ type: "EFFECT_COMPLETED", effectId, attemptId, result, fencingToken: lease.fencingToken });
    return { accepted: true };
  }

  quarantine(lease, { effectId, attemptId }) {
    const valid = this.validate(lease);
    if (!valid.accepted) return valid;
    const effect = this.effects.get(effectId);
    if (!this.owns(effect, lease, attemptId) || effect.status !== "DISPATCHED") {
      return { accepted: false, reason: "EFFECT_DISPATCH_NOT_CURRENT" };
    }
    effect.status = "QUARANTINED_INDETERMINATE";
    effect.recoveryReason = "DISTRIBUTED_EFFECT_OUTCOME_UNKNOWN";
    this.events.push({ type: "EFFECT_QUARANTINED", effectId, attemptId, fencingToken: lease.fencingToken });
    return { accepted: true };
  }

  recover(lease) {
    const valid = this.validate(lease);
    if (!valid.accepted) return valid;
    for (const effect of this.effects.values()) {
      if (effect.term === lease.term) continue;
      if (effect.status === "CLAIMED") {
        effect.status = "ABANDONED_PRE_DISPATCH";
        effect.recoveryReason = "LEASE_REPLACED_BEFORE_DISPATCH";
      } else if (effect.status === "DISPATCHED") {
        effect.status = "QUARANTINED_INDETERMINATE";
        effect.recoveryReason = "LEASE_REPLACED_AFTER_DISPATCH";
      }
    }
    this.events.push({ type: "RECOVERY_COMPLETED", ...lease });
    return { accepted: true };
  }

  owns(effect, lease, attemptId) {
    return effect && effect.attemptId === attemptId && effect.term === lease.term &&
      effect.nodeId === lease.nodeId && effect.fencingToken === lease.fencingToken;
  }

  getEffect(effectId) {
    return clone(this.effects.get(effectId));
  }

  getEvents() {
    return clone(this.events);
  }
}

export class FencedExecutionGate {
  constructor(coordinator, nodeId) {
    this.coordinator = coordinator;
    this.nodeId = nodeId;
    this.lease = null;
  }

  acquire() {
    const result = this.coordinator.acquire(this.nodeId);
    if (result.accepted) this.lease = result.lease;
    return result;
  }

  recover() {
    return this.coordinator.recover(this.lease);
  }

  claim(request) {
    return this.coordinator.claimEffect(this.lease, request);
  }

  markDispatched(request) {
    return this.coordinator.markDispatched(this.lease, request);
  }

  complete(request) {
    return this.coordinator.complete(this.lease, request);
  }

  quarantine(request) {
    return this.coordinator.quarantine(this.lease, request);
  }
}
