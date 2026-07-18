import { EffectResults } from "./contracts.mjs";

export const NodeProcessSupervisorEnvironment = "node-process-supervisor-reference";

const SupportedAction = "INITIATE_RECOVERY";

export class NodeProcessSupervisorAdapter {
  constructor({ driver, environment = NodeProcessSupervisorEnvironment }) {
    if (!driver || typeof driver.initiateRecovery !== "function") {
      throw new Error("PROCESS_SUPERVISOR_DRIVER_REQUIRED");
    }
    this.driver = driver;
    this.environment = environment;
  }

  dispatch(request) {
    if (!this.accepts(request)) return EffectResults.FAILED;
    const driverRequest = {
      operationId: request.effectId,
      attemptId: request.attemptId,
      environment: request.plan.environment,
      component: request.plan.component,
      scope: request.plan.scope,
      action: request.plan.action,
    };
    try {
      const outcome = this.driver.initiateRecovery(driverRequest);
      if (outcome?.status === "RECOVERY_INITIATED") return EffectResults.SUCCEEDED;
      if (outcome?.status === "RECOVERY_REFUSED") return EffectResults.FAILED;
      return EffectResults.INDETERMINATE;
    } catch {
      return EffectResults.INDETERMINATE;
    }
  }

  accepts(request) {
    return Boolean(
      request?.effectId &&
      request?.attemptId &&
      request?.realization &&
      request?.plan &&
      request.realization.environment === this.environment &&
      request.plan.environment === this.environment &&
      request.plan.action === SupportedAction &&
      request.plan.component === request.realization.component &&
      request.plan.scope === request.realization.scope
    );
  }
}
