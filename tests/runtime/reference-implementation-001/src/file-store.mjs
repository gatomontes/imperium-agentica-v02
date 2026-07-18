import {
  closeSync,
  existsSync,
  fsyncSync,
  openSync,
  readFileSync,
  unlinkSync,
  writeFileSync,
  writeSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { mkdirSync } from "node:fs";

const schema = "imperium-runtime-reference-store-001";

export class FileBackedStore {
  constructor(directory) {
    this.directory = directory;
    this.journalPath = join(directory, "runtime-reference.journal");
    this.lockPath = join(directory, "runtime-reference.lock");
    this.components = new Map();
    this.realizations = new Map();
    this.effects = new Map();
    this.sequence = 0;
    this.closed = false;

    mkdirSync(dirname(this.journalPath), { recursive: true });
    try {
      this.lockFd = openSync(this.lockPath, "wx");
    } catch (error) {
      if (error.code === "EEXIST") throw new Error("STORE_ALREADY_OPEN");
      throw error;
    }
    try {
      this.replay();
      this.recoverDispatchedEffects();
    } catch (error) {
      this.releaseLock();
      throw error;
    }
  }

  replay() {
    if (!existsSync(this.journalPath)) return;
    const bytes = readFileSync(this.journalPath, "utf8");
    if (bytes.length === 0) return;
    if (!bytes.endsWith("\n")) throw new Error("JOURNAL_TRUNCATED_OR_CORRUPT");
    for (const line of bytes.slice(0, -1).split("\n")) {
      let entry;
      try {
        entry = JSON.parse(line);
      } catch {
        throw new Error("JOURNAL_TRUNCATED_OR_CORRUPT");
      }
      if (entry.schema !== schema || entry.sequence !== this.sequence + 1) {
        throw new Error("JOURNAL_SCHEMA_OR_SEQUENCE_MISMATCH");
      }
      this.sequence = entry.sequence;
      this.apply(entry);
    }
  }

  recoverDispatchedEffects() {
    for (const [id, effect] of this.effects) {
      if (effect.status !== "DISPATCHED") continue;
      this.saveEffect(id, {
        ...effect,
        status: "QUARANTINED_INDETERMINATE",
        recoveryReason: "PROCESS_RESTART_AFTER_DISPATCH",
      });
    }
  }

  append(type, id, value) {
    if (this.closed) throw new Error("STORE_CLOSED");
    const entry = { schema, sequence: this.sequence + 1, type, id, value: structuredClone(value) };
    const line = `${JSON.stringify(entry)}\n`;
    const fd = openSync(this.journalPath, "a");
    try {
      writeSync(fd, line, undefined, "utf8");
      fsyncSync(fd);
    } finally {
      closeSync(fd);
    }
    this.sequence = entry.sequence;
    this.apply(entry);
  }

  apply(entry) {
    const table = entry.type === "COMPONENT"
      ? this.components
      : entry.type === "REALIZATION"
        ? this.realizations
        : entry.type === "EFFECT"
          ? this.effects
          : null;
    if (!table) throw new Error("JOURNAL_ENTRY_TYPE_UNKNOWN");
    table.set(entry.id, structuredClone(entry.value));
  }

  addComponent(id, state = {}) {
    this.saveComponent(id, {
      operationalState: "INACTIVE",
      implementationVersion: "impl-1",
      semanticMappingVersion: "map-1",
      ...structuredClone(state),
    });
  }

  hasComponent(id) {
    return this.components.has(id);
  }

  getComponent(id) {
    const value = this.components.get(id);
    return value && structuredClone(value);
  }

  saveComponent(id, value) {
    this.append("COMPONENT", id, value);
  }

  getRealization(id) {
    const value = this.realizations.get(id);
    return value && structuredClone(value);
  }

  saveRealization(id, value) {
    this.append("REALIZATION", id, value);
  }

  getEffect(id) {
    const value = this.effects.get(id);
    return value && structuredClone(value);
  }

  saveEffect(id, value) {
    this.append("EFFECT", id, value);
  }

  close() {
    if (this.closed) return;
    this.closed = true;
    this.releaseLock();
  }

  releaseLock() {
    if (this.lockFd !== undefined) {
      closeSync(this.lockFd);
      this.lockFd = undefined;
    }
    if (existsSync(this.lockPath)) unlinkSync(this.lockPath);
  }
}

export function appendCorruptTail(directory, text = "{") {
  const path = join(directory, "runtime-reference.journal");
  const fd = openSync(path, "a");
  try {
    writeSync(fd, text, undefined, "utf8");
    fsyncSync(fd);
  } finally {
    closeSync(fd);
  }
}

export function writeUnknownSchemaJournal(directory) {
  mkdirSync(directory, { recursive: true });
  writeFileSync(join(directory, "runtime-reference.journal"), JSON.stringify({
    schema: "unknown",
    sequence: 1,
    type: "COMPONENT",
    id: "worker",
    value: {},
  }) + "\n");
}
