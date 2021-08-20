import { getStateNameFromCode as testFunction } from "@/helpers/us-states.js";

describe("Helper us-states.js", () => {
  it("returns a string when passed a string", () => {
    const result = testFunction("LA");
    expect(result).toBeDefined();
    expect(typeof result).toEqual("string");
  });

  it("returns undefined when passed null", () => {
    const result = testFunction();
    expect(result).toBeUndefined();
  });

  it("returns non-string arguments passed into it", () => {
    const result = testFunction(["default"]);
    expect(result).toEqual(["default"]);
  });

  it("returns a full state name when passed a state code", () => {
    const result = testFunction("LA");
    expect(result).toEqual("Louisiana");
  });

  it("returns a full state name when passed a state code (case 2)", () => {
    const result = testFunction("AE");
    expect(result).toEqual(
      "Armed Forces Europe, Canada, Africa and Middle East"
    );
  });

  it("returns a full state name when passed a state code (case 3)", () => {
    const result = testFunction("PR");
    expect(result).toEqual("Puerto Rico");
  });
});
