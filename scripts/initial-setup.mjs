import { chmod, readFile, rename, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const OPENAI_KEY_NAME = "OPENAI_API_KEY";

export function parseLocalEnvironment(contents) {
  const result = new Map();
  for (const line of contents.split(/\r?\n/u)) {
    const match = line.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/u);
    if (!match) continue;
    let value = match[2];
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    result.set(match[1], value);
  }
  return result;
}

export async function inspectOpenAIKey({ environment = process.env, directory = process.cwd() } = {}) {
  if (typeof environment[OPENAI_KEY_NAME] === "string" && environment[OPENAI_KEY_NAME].trim() !== "") {
    return { configured: true, source: "process-environment" };
  }

  const path = resolve(directory, ".env.local");
  try {
    const local = parseLocalEnvironment(await readFile(path, "utf8"));
    const value = local.get(OPENAI_KEY_NAME);
    return value?.trim()
      ? { configured: true, source: "env-local" }
      : { configured: false, source: "none" };
  } catch (error) {
    if (error?.code === "ENOENT") return { configured: false, source: "none" };
    throw error;
  }
}

export async function storeOpenAIKey(key, { directory = process.cwd() } = {}) {
  const normalized = key.trim();
  if (!normalized || /[\r\n]/u.test(normalized)) throw new Error("OPENAI_API_KEY must be one non-empty line");

  const path = resolve(directory, ".env.local");
  let contents = "";
  try {
    contents = await readFile(path, "utf8");
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }

  const lines = contents === "" ? [] : contents.replace(/\r\n/gu, "\n").split("\n");
  const assignment = `${OPENAI_KEY_NAME}=${normalized}`;
  const index = lines.findIndex((line) => /^\s*(?:export\s+)?OPENAI_API_KEY\s*=/u.test(line));
  if (index >= 0) lines[index] = assignment;
  else lines.push(assignment);

  const next = `${lines.filter((line, position) => line !== "" || position < lines.length - 1).join("\n")}\n`;
  const temporary = `${path}.tmp-${process.pid}`;
  await writeFile(temporary, next, { encoding: "utf8", mode: 0o600 });
  await chmod(temporary, 0o600);
  await rename(temporary, path);
  return { configured: true, source: "env-local" };
}

async function readSecret(prompt) {
  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    throw new Error("Interactive setup requires a terminal. Set OPENAI_API_KEY in the process environment or .env.local, then rerun npm run setup.");
  }

  process.stdout.write(prompt);
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.setEncoding("utf8");

  return await new Promise((resolvePromise, reject) => {
    let value = "";
    const finish = () => {
      process.stdin.setRawMode(false);
      process.stdin.pause();
      process.stdout.write("\n");
    };
    const onData = (character) => {
      if (character === "\u0003") {
        finish();
        reject(new Error("Setup cancelled"));
      } else if (character === "\r" || character === "\n") {
        process.stdin.off("data", onData);
        finish();
        resolvePromise(value);
      } else if (character === "\u007f") {
        value = value.slice(0, -1);
      } else {
        value += character;
      }
    };
    process.stdin.on("data", onData);
  });
}

export async function runInitialSetup({ directory = process.cwd() } = {}) {
  const status = await inspectOpenAIKey({ directory });
  if (status.configured) {
    process.stdout.write(`OpenAI credential: configured (${status.source}). Value not displayed.\n`);
    return status;
  }

  process.stdout.write("OpenAI credential: not configured.\n");
  const key = await readSecret("Enter OPENAI_API_KEY (input hidden): ");
  const stored = await storeOpenAIKey(key, { directory });
  process.stdout.write("OpenAI credential: configured in .env.local. Value not displayed.\n");
  return stored;
}

const invokedDirectly = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  runInitialSetup().catch((error) => {
    process.stderr.write(`Initial setup failed: ${error.message}\n`);
    process.exitCode = 1;
  });
}
