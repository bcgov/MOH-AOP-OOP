import { replaceSpecialCharacters } from "@/helpers/string.js";

describe("Helper string.js", () => {
  it("returns a string when passed a string", () => {
    const result = replaceSpecialCharacters("string");
    expect(result).toBeDefined();
    expect(typeof result).toEqual("string");
  });

  it("returns null when called without an argument", () => {
    const result = replaceSpecialCharacters();
    expect(result).toBeNull();
  });

  it("replaces special characters with similar equivalents", () => {
    const result = replaceSpecialCharacters("Á");
    expect(result).toEqual("A");
  });

  it("replaces special characters with similar equivalents (case 2)", () => {
    const result = replaceSpecialCharacters(" Ę ");
    expect(result).toEqual(" E ");
  });

  it("replaces special characters with similar equivalents (case 3)", () => {
    const result = replaceSpecialCharacters("aꝋa");
    expect(result).toEqual("aoa");
  });

  it("leaves numerals passed through in a string alone", () => {
    const result = replaceSpecialCharacters("2");
    expect(result).toEqual("2");
  });
});
