import {
  bcPostalCodeValidator,
  postalCodeValidator,
  nonBCValidator,
  hasEmptyPostalCode,
  nonBCPostalCodeValidator,
  canadaPostalCodeLengthValidator,
} from "@/helpers/validators.js";

describe("Helper validators.js bcPostalCodeValidator()", () => {
  it("returns a boolean", () => {
    const result = bcPostalCodeValidator();
    expect(result).toBeDefined();
    expect(typeof result).toEqual("boolean");
  });

  it("returns true when given a string containing a BC postal code", () => {
    const result = bcPostalCodeValidator("V8W1L4");
    expect(result).toEqual(true);
  });

  it("returns true when given a string containing a BC postal code with a space in the middle", () => {
    const result = bcPostalCodeValidator("V8W 1L4");
    expect(result).toEqual(true);
  });

  it("returns false when given a string that does not contain a BC postal code", () => {
    const result = bcPostalCodeValidator("default string");
    expect(result).toEqual(false);
  });

  it("returns false when given a non-BC postal code (does not start with V)", () => {
    const result = bcPostalCodeValidator("H0H 0H0");
    expect(result).toEqual(false);
  });
});

describe("Helper validators.js postalCodeValidator()", () => {
  it("returns a boolean", () => {
    const result = postalCodeValidator();
    expect(result).toBeDefined();
    expect(typeof result).toEqual("boolean");
  });

  it("returns true when given a string containing a BC postal code", () => {
    const result = postalCodeValidator("V8W1L4");
    expect(result).toEqual(true);
  });

  it("returns true when given a string containing a BC postal code with a space in the middle", () => {
    const result = postalCodeValidator("V8W 1L4");
    expect(result).toEqual(true);
  });

  it("returns false when given a string that does not contain a BC postal code", () => {
    const result = postalCodeValidator("default string");
    expect(result).toEqual(false);
  });

  it("returns true when given a non-BC postal code (does not start with V)", () => {
    const result = postalCodeValidator("H0H 0H0");
    expect(result).toEqual(true);
  });
});

describe("Helper validators.js nonBCValidator()", () => {
  it("returns a boolean", () => {
    const result = nonBCValidator();
    expect(result).toBeDefined();
    expect(typeof result).toEqual("boolean");
  });

  it("returns false if string equals BC", () => {
    const result = nonBCValidator("BC");
    expect(result).toEqual(false);
  });

  it("returns true if string does not equal BC", () => {
    const result = nonBCValidator("AB");
    expect(result).toEqual(true);
  });
});

describe("Helper validators.js hasEmptyPostalCode()", () => {
  it("returns a boolean", () => {
    const result = hasEmptyPostalCode();
    expect(result).toBeDefined();
    expect(typeof result).toEqual("boolean");
  });

  it("returns true if passed a null value", () => {
    const result = hasEmptyPostalCode(null);
    expect(result).toEqual(true);
  });

  it("returns true if passed an empty string", () => {
    const result = hasEmptyPostalCode("");
    expect(result).toEqual(true);
  });

  it("returns false if passed a postal code", () => {
    const result = hasEmptyPostalCode("H0H 0H0");
    expect(result).toEqual(false);
  });

  it("returns false if passed an undefined value", () => {
    const result = hasEmptyPostalCode(undefined);
    expect(result).toEqual(false);
  });
});

describe("Helper validators.js nonBCPostalCodeValidator()", () => {
  it("returns a boolean", () => {
    const result = nonBCPostalCodeValidator();
    expect(result).toBeDefined();
    expect(typeof result).toEqual("boolean");
  });

  it("returns false if given a BC postal code", () => {
    const result = nonBCPostalCodeValidator("V1V 1V1");
    expect(result).toEqual(false);
  });

  it("returns true if given a non-BC postal code", () => {
    const result = nonBCPostalCodeValidator("H0H 0H0");
    expect(result).toEqual(true);
  });
});

describe("Helper validators.js canadaPostalCodeLengthValidator()", () => {
  it("returns true if given a string seven characters long", () => {
    const result = canadaPostalCodeLengthValidator("V1V 1V1");
    expect(result).toEqual(true);
  });

  it("returns false if given a string not seven characters long", () => {
    const result = canadaPostalCodeLengthValidator("H0H0H0");
    expect(result).toEqual(false);
  });
});
