import { randomUUID } from "node:crypto";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { IsoldeSecretariatOfficer } from "../src/isolde-secretariat-officer.js";
import { MasterMasonLiveIsoldeSession, openLocksmithLiveIsoldeAccess } from "../src/openai-live-isolde.js";
import { RectorCastellanOfficer, RectorCognitivePort } from "../src/rector-castellan-officer.js";
const initialOnly: RectorCognitivePort = { assessMissionPredicates: () => { throw new Error("live Rector assessment must enter through Locksmith's bounded provider port"); } };

async function main(): Promise<void> {
  if (!stdin.isTTY || !stdout.isTTY) throw new Error("live Isolde requires an interactive terminal");
  const prompt = createInterface({ input: stdin, output: stdout });
  try {
    const operatorText = await prompt.question("Operator mission request: ");
    if (!operatorText.trim()) throw new Error("one nonblank Operator input is required");
    const access = await openLocksmithLiveIsoldeAccess();
    const session = new MasterMasonLiveIsoldeSession(access, new IsoldeSecretariatOfficer(), new RectorCastellanOfficer(initialOnly));
    const result = await session.runConversation("operator:local", operatorText, `live-isolde-${randomUUID()}`, async (question) => {
      const answer = await prompt.question(`Isolde: ${question}\nOperator: `);
      if (!answer.trim()) throw new Error("one nonblank Operator response is required");
      return answer;
    });
    stdout.write("Isolde: Castellan has completed the mission intake.\n");
    stdout.write(`Candidate: ${JSON.stringify(result.candidate.payload, null, 2)}\n`);
    stdout.write(`Audit: provider=${result.provider}; model=${result.model}; credential_exposed_to_isolde=false; responses_evaluated_by_castellan=true; mission_executed=false; turns=${result.turns}\n`);
  } finally {
    prompt.close();
  }
}

main().catch((error: unknown) => {
  process.stderr.write(`Live Isolde failed: ${error instanceof Error ? error.message : "unknown failure"}\n`);
  process.exitCode = 1;
});
