import { describe, expect, it } from "vitest";
import { debugPacket, parseLiveIsoldeFlags, summarizeAdjudication, summarizeResolution } from "../src/live-isolde-output.js";

describe("live Isolde output", () => {
  it("is concise by default and enables full packets only with --debug", () => {
    expect(parseLiveIsoldeFlags([])).toEqual({ debug: false });
    expect(parseLiveIsoldeFlags(["--debug"])).toEqual({ debug: true });
    expect(() => parseLiveIsoldeFlags(["--verbose"])).toThrow("unknown option");
    expect(debugPacket("packet", { one: 1 })).toContain('\n  "one": 1');
  });

  it("summarizes adjudication and resolution without dumping packets", () => {
    const adjudication = summarizeAdjudication({ queue: [{ professionIdentity: "Data Scientist" }, { professionIdentity: "Musicologist" }] } as never);
    expect(adjudication).toBe("Guildmaster adjudication complete: 2 profession(s) approved — Data Scientist, Musicologist.");
    const resolution = summarizeResolution({ items: [
      { professionIdentity: "Data Scientist", disposition: "REUSED_ADMITTED_PROFSPEC" },
      { professionIdentity: "Musicologist", disposition: "PROFSPEC_CREATION_REQUIRED" },
    ] } as never);
    expect(resolution).toContain("1 reused, 1 require creation");
    expect(resolution).toContain("Musicologist: creation required");
  });
});
