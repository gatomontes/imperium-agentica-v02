import { chmod, readFile, rename, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const OPENAI_KEY_NAME = "OPENAI_API_KEY";
export const DEEPSEEK_KEY_NAME = "DEEPSEEK_API_KEY";

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
  return inspectProviderKey(OPENAI_KEY_NAME, { environment, directory });
}

export async function inspectProviderKey(keyName, { environment = process.env, directory = process.cwd() } = {}) {
  if (typeof environment[keyName] === "string" && environment[keyName].trim() !== "") {
    return { configured: true, source: "process-environment" };
  }

  const path = resolve(directory, ".env.local");
  try {
    const local = parseLocalEnvironment(await readFile(path, "utf8"));
    const value = local.get(keyName);
    return value?.trim()
      ? { configured: true, source: "env-local" }
      : { configured: false, source: "none" };
  } catch (error) {
    if (error?.code === "ENOENT") return { configured: false, source: "none" };
    throw error;
  }
}

export async function storeOpenAIKey(key, { directory = process.cwd() } = {}) {
  return storeProviderKey(OPENAI_KEY_NAME, key, { directory });
}

export async function storeProviderKey(keyName, key, { directory = process.cwd(), provider } = {}) {
  const normalized = key.trim();
  if (!normalized || /[\r\n]/u.test(normalized)) throw new Error(`${keyName} must be one non-empty line`);

  return storeLocalValues(new Map([
    [keyName, normalized],
    ...(provider ? [["IMPERIUM_LIVE_PROVIDER", provider]] : []),
  ]), { directory });
}

async function storeLocalValues(values, { directory = process.cwd() } = {}) {
  const path = resolve(directory, ".env.local");
  let contents = "";
  try {
    contents = await readFile(path, "utf8");
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }

  const lines = contents === "" ? [] : contents.replace(/\r\n/gu, "\n").split("\n");
  for (const [name, value] of values) {
    const assignment = `${name}=${value}`;
    const pattern = new RegExp(`^\\s*(?:export\\s+)?${name}\\s*=`, "u");
    const index = lines.findIndex((line) => pattern.test(line));
    if (index >= 0) lines[index] = assignment;
    else lines.push(assignment);
  }

  const next = `${lines.filter((line, position) => line !== "" || position < lines.length - 1).join("\n")}\n`;
  const temporary = `${path}.tmp-${process.pid}`;
  await writeFile(temporary, next, { encoding: "utf8", mode: 0o600 });
  await chmod(temporary, 0o600);
  await rename(temporary, path);
  return { configured: true, source: "env-local" };
}

async function readSecret(prompt) {
  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    throw new Error("Interactive setup requires a terminal. Set the selected provider key in the process environment or .env.local, then rerun npm run setup.");
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

async function readLine(prompt) {
  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    throw new Error("Interactive setup requires a terminal. Pass openai or deepseek explicitly when running non-interactively.");
  }

  process.stdout.write(prompt);
  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  return await new Promise((resolvePromise, reject) => {
    const onError = (error) => {
      process.stdin.off("data", onData);
      reject(error);
    };
    const onData = (value) => {
      process.stdin.off("error", onError);
      process.stdin.pause();
      resolvePromise(value.replace(/[\r\n]+$/u, ""));
    };
    process.stdin.once("error", onError);
    process.stdin.once("data", onData);
  });
}

export async function selectProvider({ readSelection = readLine, write = (value) => process.stdout.write(value) } = {}) {
  write("Available live providers:\n  1) OpenAI API\n  2) DeepSeek API\n");
  const selection = (await readSelection("Select provider [1-2]: ")).trim().toLowerCase();
  if (selection === "1" || selection === "openai") return "openai";
  if (selection === "2" || selection === "deepseek") return "deepseek";
  throw new Error("Provider selection must be 1 (OpenAI API) or 2 (DeepSeek API)");
}

export async function runInitialSetup({ directory = process.cwd(), provider, chooseProvider = selectProvider } = {}) {
  const selectedProvider = (provider || await chooseProvider()).trim().toLowerCase();
  if (selectedProvider !== "openai" && selectedProvider !== "deepseek") throw new Error("Provider must be openai or deepseek");
  const keyName = selectedProvider === "deepseek" ? DEEPSEEK_KEY_NAME : OPENAI_KEY_NAME;
  const label = selectedProvider === "deepseek" ? "DeepSeek" : "OpenAI";
  const status = await inspectProviderKey(keyName, { directory });
  if (status.configured) {
    await storeLocalValues(new Map([["IMPERIUM_LIVE_PROVIDER", selectedProvider]]), { directory });
    process.stdout.write(`${label} credential: configured (${status.source}) and selected. Value not displayed.\n`);
    return status;
  }

  process.stdout.write(`${label} credential: not configured.\n`);
  const key = await readSecret(`Enter ${keyName} (input hidden): `);
  const stored = await storeProviderKey(keyName, key, { directory, provider: selectedProvider });
  process.stdout.write(`${label} credential: configured in .env.local and selected. Value not displayed.\n`);
  return stored;
}

const invokedDirectly = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  runInitialSetup({ provider: process.argv[2] }).catch((error) => {
    process.stderr.write(`Initial setup failed: ${error.message}\n`);
    process.exitCode = 1;
  });
}
