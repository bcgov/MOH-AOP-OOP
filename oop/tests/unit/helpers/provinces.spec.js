import {
  getProvinceNameFromCode,
  getProvinceCodeFromName,
} from "@/helpers/provinces.js";

describe("Helper provinces.js getProvinceNameFromCode()", () => {
  it("returns an undefined value when passed an undefined value", () => {
    const result = getProvinceNameFromCode();
    expect(result).toBeUndefined();
  });

  it("returns an array if passed an array", () => {
    const result = getProvinceNameFromCode([]);
    expect(result).toEqual([]);
  });

  it("returns a spelled out province name when passed an abbreviation", () => {
    const result = getProvinceNameFromCode("AB");
    expect(result).toEqual("Alberta");
  });

  it("returns a spelled out province name when passed an abbreviation (2)", () => {
    const result = getProvinceNameFromCode("MB");
    expect(result).toEqual("Manitoba");
  });

  it("returns initial input if not found", () => {
    const result = getProvinceNameFromCode("potato");
    expect(result).toEqual("potato");
  });
});

describe("Helper provinces.js getProvinceCodeFromName()", () => {
  it("returns an undefined value when passed an undefined value", () => {
    const result = getProvinceCodeFromName();
    expect(result).toBeUndefined();
  });

  it("returns an array if passed an array", () => {
    const result = getProvinceCodeFromName([]);
    expect(result).toEqual([]);
  });

  it("returns a spelled out province name when passed an abbreviation", () => {
    const result = getProvinceCodeFromName("Alberta");
    expect(result).toEqual("AB");
  });

  it("returns a spelled out province name when passed an abbreviation (2)", () => {
    const result = getProvinceCodeFromName("Manitoba");
    expect(result).toEqual("MB");
  });

  it("returns initial input if not found", () => {
    const result = getProvinceCodeFromName("potato");
    expect(result).toEqual("potato");
  });
});
