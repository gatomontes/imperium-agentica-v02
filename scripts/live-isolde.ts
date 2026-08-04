import { randomUUID } from "node:crypto";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { IsoldeSecretariatOfficer } from "../src/isolde-secretariat-officer.js";
import { MasterMasonLiveIsoldeSession, openLocksmithLiveIsoldeAccess, runLiveGuildhallAdjudication, runLiveGuildhallBrainstorm } from "../src/openai-live-isolde.js";
import { RectorCastellanOfficer, RectorCognitivePort } from "../src/rector-castellan-officer.js";
import { GuildhallProfessionRegistry } from "../src/profession-resolution.js";
import { GuildmasterAdjudicationValidationError } from "../src/openai-live-isolde.js";
import { debugPacket, parseLiveIsoldeFlags, summarizeAdjudication, summarizeBrainstorm, summarizeCandidate, summarizeResolution } from "../src/live-isolde-output.js";
const initialOnly: RectorCognitivePort = { assessMissionPredicates: () => { throw new Error("live Rector assessment must enter through Locksmith's bounded provider port"); } };

let debug = false;

async function main(): Promise<void> {
  debug = parseLiveIsoldeFlags(process.argv.slice(2)).debug;
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
    stdout.write(`${summarizeCandidate(result.candidate.payload)}\n`);
    if (debug) stdout.write(`${debugPacket("Mission candidate", result.candidate.payload)}\n`);
    const guildhall = await runLiveGuildhallBrainstorm(access, result.candidate);
    stdout.write(`${summarizeBrainstorm(guildhall.packet.payload)}\n`);
    if (debug) stdout.write(`${debugPacket("Profession recommendations", guildhall.packet.payload)}\n`);
    const adjudication = await runLiveGuildhallAdjudication(access, result.candidate, guildhall.packet);
    stdout.write(`${summarizeAdjudication(adjudication.packet.payload)}\n`);
    if (debug) stdout.write(`${debugPacket("Adjudicated profession queue", adjudication.packet.payload)}\n`);
    const resolution = new GuildhallProfessionRegistry([]).resolve(adjudication.packet);
    stdout.write(`${summarizeResolution(resolution.payload)}\n`);
    if (debug) stdout.write(`${debugPacket("Profession resolution", resolution.payload)}\n`);
    stdout.write(`Audit: provider=${adjudication.provider}; model=${adjudication.model}; credential_exposed_to_isolde=false; people_selected=false; personas_selected=false; operatives_selected=false; officers_selected=false; suitability_determined=true; mission_executed=false; turns=${result.turns}\n`);
  } finally {
    prompt.close();
  }
}

main().catch((error: unknown) => {
  process.stderr.write(`Live Isolde failed: ${error instanceof Error ? error.message : "unknown failure"}\n`);
  if (debug && error instanceof GuildmasterAdjudicationValidationError) {
    process.stderr.write(`${debugPacket("Guildmaster provider attempts", error.debugAttempts)}\n`);
  } else if (debug && error instanceof Error && error.stack) {
    process.stderr.write(`[debug] ${error.stack}\n`);
  }
  process.exitCode = 1;
});
