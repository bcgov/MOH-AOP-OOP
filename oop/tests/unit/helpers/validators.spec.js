import * as Helper from "@/helpers/validators.js";

describe("Helper validators.js bcPostalCodeValidator()", () => {
  it("returns a boolean", () => {
    const result = Helper.bcPostalCodeValidator();
    expect(result).toBeDefined();
    expect(typeof result).toEqual("boolean");
  });

  it("returns true when given a string containing a BC postal code", () => {
    const result = Helper.bcPostalCodeValidator("V8W1L4");
    expect(result).toEqual(true);
  });

  it("returns true when given a string containing a BC postal code with a space in the middle", () => {
    const result = Helper.bcPostalCodeValidator("V8W 1L4");
    expect(result).toEqual(true);
  });

  it("returns false when given a string that does not contain a BC postal code", () => {
    const result = Helper.bcPostalCodeValidator("default string");
    expect(result).toEqual(false);
  });

  it("returns false when given a non-BC postal code (does not start with V)", () => {
    const result = Helper.bcPostalCodeValidator("H0H 0H0");
    expect(result).toEqual(false);
  });
});

describe("Helper validators.js postalCodeValidator()", () => {
  it("returns a boolean", () => {
    const result = Helper.postalCodeValidator();
    expect(result).toBeDefined();
    expect(typeof result).toEqual("boolean");
  });

  it("returns true when given a string containing a BC postal code", () => {
    const result = Helper.postalCodeValidator("V8W1L4");
    expect(result).toEqual(true);
  });

  it("returns true when given a string containing a BC postal code with a space in the middle", () => {
    const result = Helper.postalCodeValidator("V8W 1L4");
    expect(result).toEqual(true);
  });

  it("returns false when given a string that does not contain a BC postal code", () => {
    const result = Helper.postalCodeValidator("default string");
    expect(result).toEqual(false);
  });

  it("returns true when given a non-BC postal code (does not start with V)", () => {
    const result = Helper.postalCodeValidator("H0H 0H0");
    expect(result).toEqual(true);
  });
});
