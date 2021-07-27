import { replaceSpecialCharacters as Function } from "@/helpers/string.js";

describe("Helper string.js", () => {
  it("returns a string when passed a string", () => {
    const result = Function("string");
    expect(result).toBeDefined();
    expect(typeof result).toEqual("string");
  });

  it("returns null when called without an argument", () => {
    const result = Function();
    expect(result).toBeNull();
  });

  it("replaces special characters with similar equivalents", () => {
    const result = Function("Á");
    expect(result).toEqual("A");
  });

  it("replaces special characters with similar equivalents (case 2)", () => {
    const result = Function(" Ę ");
    expect(result).toEqual(" E ");
  });

  it("replaces special characters with similar equivalents (case 3)", () => {
    const result = Function("aꝋa");
    expect(result).toEqual("aoa");
  });

  it("leaves numerals passed through in a string alone", () => {
    const result = Function("2");
    expect(result).toEqual("2");
  });
});
