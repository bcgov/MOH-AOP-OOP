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

describe("Helper validators.js nonBCValidator()", () => {
  it("returns a boolean", () => {
    const result = Helper.nonBCValidator();
    expect(result).toBeDefined();
    expect(typeof result).toEqual("boolean");
  });

  it("returns false if string equals BC", () => {
    const result = Helper.nonBCValidator("BC");
    expect(result).toEqual(false);
  });

  it("returns true if string does not equal BC", () => {
    const result = Helper.nonBCValidator("AB");
    expect(result).toEqual(true);
  });
});

describe("Helper validators.js hasEmptyPostalCode()", () => {
  it("returns a boolean", () => {
    const result = Helper.hasEmptyPostalCode();
    expect(result).toBeDefined();
    expect(typeof result).toEqual("boolean");
  });

  it("returns true if passed a null value", () => {
    const result = Helper.hasEmptyPostalCode(null);
    expect(result).toEqual(true);
  });

  it("returns true if passed an empty string", () => {
    const result = Helper.hasEmptyPostalCode("");
    expect(result).toEqual(true);
  });

  it("returns false if passed a postal code", () => {
    const result = Helper.hasEmptyPostalCode("H0H 0H0");
    expect(result).toEqual(false);
  });

  it("returns false if passed an undefined value", () => {
    const result = Helper.hasEmptyPostalCode(undefined);
    expect(result).toEqual(false);
  });
});

describe("Helper validators.js invalidCharValidator()", () => {
  it("returns true if passed null value", () => {
    const result = Helper.invalidCharValidator(null);
    expect(result).toEqual(true);
  });

  it("returns true if passed empty string", () => {
    const result = Helper.invalidCharValidator("");
    expect(result).toEqual(true);
  });

  //function is not currently in use, so further tests were not written
});

describe("Helper validators.js nonBCPostalCodeValidator()", () => {
  it("returns a boolean", () => {
    const result = Helper.nonBCPostalCodeValidator();
    expect(result).toBeDefined();
    expect(typeof result).toEqual("boolean");
  });

  it("returns false if given a BC postal code", () => {
    const result = Helper.nonBCPostalCodeValidator("V1V 1V1");
    expect(result).toEqual(false);
  });

  it("returns true if given a non-BC postal code", () => {
    const result = Helper.nonBCPostalCodeValidator("H0H 0H0");
    expect(result).toEqual(true);
  });
});

describe("Helper validators.js canadaPostalCodeLengthValidator()", () => {
  it("returns true if given a string seven characters long", () => {
    const result = Helper.canadaPostalCodeLengthValidator("V1V 1V1");
    expect(result).toEqual(true);
  });

  it("returns false if given a string not seven characters long", () => {
    const result = Helper.canadaPostalCodeLengthValidator("H0H0H0");
    expect(result).toEqual(false);
  });
});