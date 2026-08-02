export type OpenAIKeyStatus = {
  configured: boolean;
  source: "process-environment" | "env-local" | "none";
};

export const OPENAI_KEY_NAME: "OPENAI_API_KEY";

export function parseLocalEnvironment(contents: string): Map<string, string>;

export function inspectOpenAIKey(options?: {
  environment?: Record<string, string | undefined>;
  directory?: string;
}): Promise<OpenAIKeyStatus>;

export function storeOpenAIKey(key: string, options?: {
  directory?: string;
}): Promise<OpenAIKeyStatus>;

export function runInitialSetup(options?: {
  directory?: string;
}): Promise<OpenAIKeyStatus>;
