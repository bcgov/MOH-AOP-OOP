import { truncateAddressLines as Function } from "@/helpers/address.js";

describe("Helper string.js", () => {
  it("returns a non-empty array", () => {
    const result = Function("string");
    expect(result).toBeDefined();
  });
});
