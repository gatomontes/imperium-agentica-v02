import {
  NodeProcessSupervisorAdapter,
  NodeProcessSupervisorEnvironment,
} from "./node-process-supervisor-adapter.mjs";
import { SyntheticCredentialResults } from "./synthetic-credential-broker.mjs";

export const SyntheticNodeProcessSupervisorCredentialPurpose =
  "NODE_PROCESS_SUPERVISOR_INITIATE_RECOVERY";

export class SyntheticCredentialNodeProcessSupervisorAdapter {
  #adapter;

  constructor({
    driver,
    credentialBroker,
    credentialHandle,
    environment = NodeProcessSupervisorEnvironment,
  }) {
    if (!driver || typeof driver.initiateRecovery !== "function") {
      throw new Error("PROCESS_SUPERVISOR_DRIVER_REQUIRED");
    }
    if (!credentialBroker || typeof credentialBroker.consume !== "function") {
      throw new Error("SYNTHETIC_CREDENTIAL_BROKER_REQUIRED");
    }
    if (typeof credentialHandle !== "string" || credentialHandle.length === 0) {
      throw new Error("SYNTHETIC_CREDENTIAL_HANDLE_REQUIRED");
    }

    this.#adapter = new NodeProcessSupervisorAdapter({
      environment,
      driver: {
        initiateRecovery: (request) => {
          let providerOutcome;
          const consumption = credentialBroker.consume({
            handle: credentialHandle,
            environment: request.environment,
            component: request.component,
            scope: request.scope,
            purpose: SyntheticNodeProcessSupervisorCredentialPurpose,
          }, (credentialView) => {
            providerOutcome = driver.initiateRecovery(request, credentialView);
            if (providerOutcome && typeof providerOutcome.then === "function") {
              return providerOutcome;
            }
            return SyntheticCredentialResults.CONSUMED;
          });

          if (consumption !== SyntheticCredentialResults.CONSUMED) {
            return { status: "RECOVERY_REFUSED" };
          }
          return providerOutcome;
        },
      },
    });
  }

  dispatch(request) {
    return this.#adapter.dispatch(request);
  }

  accepts(request) {
    return this.#adapter.accepts(request);
  }
}
