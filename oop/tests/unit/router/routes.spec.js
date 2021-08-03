import { isPastPath as Function } from "@/router/routes.js";

describe("Helper address.js", () => {
  it("works on data formatted like addresses (case 2)", () => {
    const result = Function(["716 Yates Street Victoria, BC V8W 1K4"], 12);

    expect(result).toEqual(["716 Yates", "Street", "Victoria, BC", "V8W 1K4"]);
  });
});
