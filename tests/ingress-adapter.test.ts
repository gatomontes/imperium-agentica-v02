import { describe, expect, it } from "vitest";
import { Castellan } from "../src/castellan.js";
import { CastellanFormationAdapter, SecretariatIngressAdapter } from "../src/ingress.js";
import { Secretariat } from "../src/secretariat.js";

describe("Secretariat ingress adapter boundary", () => {
  it("keeps ingress and formation replaceable", () => {
    const ingress = new SecretariatIngressAdapter(new Secretariat());
    const formation = new CastellanFormationAdapter(new Castellan());

    const petition = ingress.receive({
      content: "Define the professional pattern.",
      sessionReference: "opaque-adapter-session",
    });
    const work = formation.receivePetition(petition);

    expect(work?.payload.petitionRef).toBe(
      petition.identity + "@" + petition.version,
    );
    expect(work?.correlationId).toBe(petition.correlationId);
  });
});
