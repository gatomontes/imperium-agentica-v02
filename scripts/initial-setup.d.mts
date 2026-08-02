export type OpenAIKeyStatus = {
  configured: boolean;
  source: "process-environment" | "env-local" | "none";
};

export const OPENAI_KEY_NAME: "OPENAI_API_KEY";
export const DEEPSEEK_KEY_NAME: "DEEPSEEK_API_KEY";

export function parseLocalEnvironment(contents: string): Map<string, string>;

export function inspectOpenAIKey(options?: {
  environment?: Record<string, string | undefined>;
  directory?: string;
}): Promise<OpenAIKeyStatus>;

export function inspectProviderKey(keyName: string, options?: {
  environment?: Record<string, string | undefined>;
  directory?: string;
}): Promise<OpenAIKeyStatus>;

export function storeOpenAIKey(key: string, options?: {
  directory?: string;
}): Promise<OpenAIKeyStatus>;

export function storeProviderKey(keyName: string, key: string, options?: {
  directory?: string;
  provider?: "openai" | "deepseek";
}): Promise<OpenAIKeyStatus>;

export function selectProvider(options?: {
  readSelection?: (prompt: string) => Promise<string>;
  write?: (value: string) => unknown;
}): Promise<"openai" | "deepseek">;

export function runInitialSetup(options?: {
  directory?: string;
  provider?: "openai" | "deepseek";
  chooseProvider?: () => Promise<"openai" | "deepseek">;
}): Promise<OpenAIKeyStatus>;
