import { randomUUID } from "node:crypto";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { IsoldeSecretariatOfficer } from "../src/isolde-secretariat-officer.js";
import { MasterMasonLiveIsoldeSession, openLocksmithLiveIsoldeAccess } from "../src/openai-live-isolde.js";
import { RectorCastellanOfficer, RectorCognitivePort } from "../src/rector-castellan-officer.js";

const forbiddenCognition: RectorCognitivePort = {
  assessMissionPredicates: () => { throw new Error("the one-question smoke test may not evaluate an Operator response"); },
};

async function main(): Promise<void> {
  if (!stdin.isTTY || !stdout.isTTY) throw new Error("live Isolde requires an interactive terminal");
  const prompt = createInterface({ input: stdin, output: stdout });
  try {
    const operatorText = await prompt.question("Operator: ");
    if (!operatorText.trim()) throw new Error("one nonblank Operator input is required");
    const access = await openLocksmithLiveIsoldeAccess();
    const session = new MasterMasonLiveIsoldeSession(access, new IsoldeSecretariatOfficer(), new RectorCastellanOfficer(forbiddenCognition));
    const result = await session.runOneQuestion("operator:local", operatorText, `live-isolde-${randomUUID()}`);
    stdout.write(`Isolde: ${result.exactQuestion}\n`);
    stdout.write(`Audit: provider=${result.provider}; model=${result.model}; credential_exposed_to_isolde=false; response_evaluated=false; mission_executed=false; turns=1\n`);
  } finally {
    prompt.close();
  }
}

main().catch((error: unknown) => {
  process.stderr.write(`Live Isolde failed: ${error instanceof Error ? error.message : "unknown failure"}\n`);
  process.exitCode = 1;
});
