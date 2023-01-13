import {
  getStateNameFromCode,
  getStateCodeFromName,
} from "@/helpers/us-states.js";

describe("Helper us-states.js getStateNameFromCode()", () => {
  it("returns a string when passed a string", () => {
    const result = getStateNameFromCode("LA");
    expect(result).toBeDefined();
    expect(typeof result).toEqual("string");
  });

  it("returns undefined when passed null", () => {
    const result = getStateNameFromCode();
    expect(result).toBeUndefined();
  });

  it("returns non-string arguments passed into it", () => {
    const result = getStateNameFromCode(["default"]);
    expect(result).toEqual(["default"]);
  });

  it("returns a full state name when passed a state code", () => {
    const result = getStateNameFromCode("LA");
    expect(result).toEqual("Louisiana");
  });

  it("returns a full state name when passed a state code (case 2)", () => {
    const result = getStateNameFromCode("AE");
    expect(result).toEqual(
      "Armed Forces Europe, Canada, Africa and Middle East"
    );
  });

  it("returns a full state name when passed a state code (case 3)", () => {
    const result = getStateNameFromCode("PR");
    expect(result).toEqual("Puerto Rico");
  });
});

describe("Helper us-states.js getStateCodeFromName()", () => {
  it("returns a string when passed a string", () => {
    const result = getStateCodeFromName("Louisiana");
    expect(result).toBeDefined();
    expect(typeof result).toEqual("string");
  });

  it("returns undefined when passed null", () => {
    const result = getStateCodeFromName();
    expect(result).toBeUndefined();
  });

  it("returns non-string arguments passed into it", () => {
    const result = getStateCodeFromName(["default"]);
    expect(result).toEqual(["default"]);
  });

  it("returns a full state name when passed a state code", () => {
    const result = getStateCodeFromName("Louisiana");
    expect(result).toEqual("LA");
  });

  it("returns a full state name when passed a state code (case 2)", () => {
    const result = getStateCodeFromName(
      "Armed Forces Europe, Canada, Africa and Middle East"
    );
    expect(result).toEqual("AE");
  });

  it("returns a full state name when passed a state code (case 3)", () => {
    const result = getStateCodeFromName("Puerto Rico");
    expect(result).toEqual("PR");
  });
});
