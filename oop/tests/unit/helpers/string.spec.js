import { replaceSpecialCharacters as testFunction } from "@/helpers/string.js";

describe("Helper string.js", () => {
  it("returns a string when passed a string", () => {
    const result = testFunction("string");
    expect(result).toBeDefined();
    expect(typeof result).toEqual("string");
  });

  it("returns null when called without an argument", () => {
    const result = testFunction();
    expect(result).toBeNull();
  });

  it("replaces special characters with similar equivalents", () => {
    const result = testFunction("Á");
    expect(result).toEqual("A");
  });

  it("replaces special characters with similar equivalents (case 2)", () => {
    const result = testFunction(" Ę ");
    expect(result).toEqual(" E ");
  });

  it("replaces special characters with similar equivalents (case 3)", () => {
    const result = testFunction("aꝋa");
    expect(result).toEqual("aoa");
  });

  it("leaves numerals passed through in a string alone", () => {
    const result = testFunction("2");
    expect(result).toEqual("2");
  });
});
