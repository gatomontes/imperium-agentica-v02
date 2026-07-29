import { describe, expect, it } from "vitest";
import { HttpAuthorizer } from "../src/http-auth.js";

describe("HTTP authentication boundary", () => {
  it("allows an injected authorizer without selecting a provider", () => {
    const authorizer: HttpAuthorizer<{ subject: string }> = {
      authorize: (context) => ({ subject: context.operatorInstanceId }),
    };

    expect(
      authorizer.authorize({
        requestId: "auth-1",
        operatorInstanceId: "operator-1",
        authorization: "Bearer opaque",
      }),
    ).toEqual({ subject: "operator-1" });
  });
});
