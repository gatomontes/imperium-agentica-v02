import { describe, expect, it } from "vitest";
import * as Imperium from "../src/index.js";

describe("public reference API", () => {
  it("exports the reference facade and core boundaries", () => {
    expect(Imperium.ImperiumReference).toBeDefined();
    expect(Imperium.Secretariat).toBeDefined();
    expect(Imperium.Castellan).toBeDefined();
    expect(Imperium.Guildhall).toBeDefined();
    expect(Imperium.Foundry).toBeDefined();
    expect(Imperium.Pit).toBeDefined();
    expect(Imperium.Garrison).toBeDefined();
    expect(Imperium.Conscription).toBeDefined();
    expect(Imperium.ExemplarReview).toBeDefined();
  });
});
