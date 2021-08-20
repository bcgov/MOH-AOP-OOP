import { getStateNameFromCode as Function } from "@/helpers/us-states.js";

describe("Helper us-states.js", () => {
  it("returns a string when passed a string", () => {
    const result = Function("LA");
    expect(result).toBeDefined();
    expect(typeof result).toEqual("string");
  });

  it("returns undefined when passed null", () => {
    const result = Function();
    expect(result).toBeUndefined();
  });

  it("returns non-string arguments passed into it", () => {
    const result = Function(["default"]);
    expect(result).toEqual(["default"]);
  });

  it("returns a full state name when passed a state code", () => {
    const result = Function("LA");
    expect(result).toEqual("Louisiana");
  });

  it("returns a full state name when passed a state code (case 2)", () => {
    const result = Function("AE");
    expect(result).toEqual(
      "Armed Forces Europe, Canada, Africa and Middle East"
    );
  });

  it("returns a full state name when passed a state code (case 3)", () => {
    const result = Function("PR");
    expect(result).toEqual("Puerto Rico");
  });
});
