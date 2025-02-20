import { describe, it, expect } from "vitest";

import { Client } from "../src";

describe("PopAdsClient", () => {
  it("should be instantiated with an API key", () => {
    const client = new Client("test-api-key");
    expect(client).toBeDefined();
  });
});
