import {
  isValidPhone,
  isValidEmail,
  isValidLastName,
  isValidSecondaryLastName,
  hasSecondaryNumber,
  hasSecondaryLastName,
  hasDistinctFiles,
  hasNoInvalidJSON,
} from "@/helpers/validators.js";

describe("Helper validators.js isValidPhone", () => {
  it("matches a phone number with no spaces", () => {
    const result = isValidPhone("2501234567");
    expect(result).toBe(true);
  });
  it("matches a phone number with spaces", () => {
    const result = isValidPhone("250 123 4567");
    expect(result).toBe(true);
  });
  it("matches a phone number with dashes", () => {
    const result = isValidPhone("250-123-4567");
    expect(result).toBe(true);
  });
  it("matches a phone number with periods", () => {
    const result = isValidPhone("250.123.4567");
    expect(result).toBe(true);
  });
  it("matches a phone number with 12 digits", () => {
    const result = isValidPhone("250.123.456789");
    expect(result).toBe(true);
  });
  it("matches a phone number when passed as an integer", () => {
    const result = isValidPhone(2501234567);
    expect(result).toBe(true);
  });
  it("matches a phone number if it's contained in an array", () => {
    const result = isValidPhone(["2501234567"]);
    expect(result).toBe(true);
  });
  it("does NOT match a phone number if it's contained in an object", () => {
    const result = isValidPhone({ 1: "2501234567" });
    expect(result).toBe(false);
  });
  it("does NOT match a string", () => {
    const result = isValidPhone("a");
    expect(result).toBe(false);
  });
  it("does NOT match a boolean", () => {
    const result = isValidPhone(true);
    expect(result).toBe(false);
  });
  it("does NOT match when passed an empty array", () => {
    const result = isValidPhone([]);
    expect(result).toBe(false);
  });
  it("does NOT match when passed an empty object", () => {
    const result = isValidPhone({});
    expect(result).toBe(false);
  });
  it("does NOT match when passed an empty string", () => {
    const result = isValidPhone("");
    expect(result).toBe(false);
  });
});

describe("Helper validators.js isValidEmail", () => {
  it("matches a standard email", () => {
    const result = isValidEmail("something@mail.ca");
    expect(result).toBe(true);
  });
  it("matches a standard email (2)", () => {
    const result = isValidEmail("a@a.aa");
    expect(result).toBe(true);
  });
  it("matches a standard email that starts with a special character", () => {
    const result = isValidEmail("!@a.aa");
    expect(result).toBe(true);
  });
  it("does NOT match if a special character comes after the @ sign", () => {
    const result = isValidEmail("a@!.aa");
    expect(result).toBe(false);
  });
  it("does NOT match if a special character comes after the .", () => {
    const result = isValidEmail("a@a.!a");
    expect(result).toBe(false);
  });
  it("does NOT match if there's nothing before the @ sign", () => {
    const result = isValidEmail("@mail.ca");
    expect(result).toBe(false);
  });
  it("does NOT match if there's nothing between the @ and .", () => {
    const result = isValidEmail("something@.ca");
    expect(result).toBe(false);
  });
  it("does NOT match if there's nothing after the .", () => {
    const result = isValidEmail("something@mail.");
    expect(result).toBe(false);
  });
  it("does NOT match if there's only one letter after the .", () => {
    const result = isValidEmail("something@mail.a");
    expect(result).toBe(false);
  });
  it("does NOT match when passed an empty array", () => {
    const result = isValidEmail([]);
    expect(result).toBe(false);
  });
  it("does NOT match when passed an empty object", () => {
    const result = isValidEmail({});
    expect(result).toBe(false);
  });
  it("does NOT match when passed an empty string", () => {
    const result = isValidEmail("");
    expect(result).toBe(false);
  });
});

describe("Helper validators.js isValidLastName", () => {
  it("matches a standard surname", () => {
    const result = isValidLastName("Anderson");
    expect(result).toBe(true);
  });
  it("matches a standard surname (2)", () => {
    const result = isValidLastName("Wu");
    expect(result).toBe(true);
  });
  it("matches a string that has a period in it", () => {
    const result = isValidLastName("W.");
    expect(result).toBe(true);
  });
  it("matches a string that has a space in it", () => {
    const result = isValidLastName("W ");
    expect(result).toBe(true);
  });
  it("matches a string that has an apostrophe in it", () => {
    const result = isValidLastName("W'");
    expect(result).toBe(true);
  });
  it("matches a string that has a dash in it", () => {
    const result = isValidLastName("W-");
    expect(result).toBe(true);
  });
  it("matches a lowercase string", () => {
    const result = isValidLastName("wu");
    expect(result).toBe(true);
  });
  it("does NOT match when the string starts with a special character", () => {
    const result = isValidLastName("-W");
    expect(result).toBe(false);
  });
  it("does NOT match when the string contains a number", () => {
    const result = isValidLastName("Anderso2n");
    expect(result).toBe(false);
  });
  it("does NOT match when the string contains an unauthorized special character", () => {
    const result = isValidLastName("Anderso(n");
    expect(result).toBe(false);
  });
  it("does NOT match when passed an integer", () => {
    const result = isValidLastName(2);
    expect(result).toBe(false);
  });
  it("does NOT match when passed an empty array", () => {
    const result = isValidLastName([]);
    expect(result).toBe(false);
  });
  it("does NOT match when passed an empty object", () => {
    const result = isValidLastName({});
    expect(result).toBe(false);
  });
  it("does NOT match when passed an empty string", () => {
    const result = isValidLastName("");
    expect(result).toBe(false);
  });
});

describe("Helper validators.js isValidSecondaryLastName", () => {
  it("matches a standard surname", () => {
    const result = isValidSecondaryLastName("Anderson");
    expect(result).toBe(true);
  });
  it("matches a standard surname (2)", () => {
    const result = isValidSecondaryLastName("Wu");
    expect(result).toBe(true);
  });
  it("matches a string that has a period in it", () => {
    const result = isValidSecondaryLastName("W.");
    expect(result).toBe(true);
  });
  it("matches a string that has a space in it", () => {
    const result = isValidSecondaryLastName("W ");
    expect(result).toBe(true);
  });
  it("matches a string that has an apostrophe in it", () => {
    const result = isValidSecondaryLastName("W'");
    expect(result).toBe(true);
  });
  it("matches a string that has a dash in it", () => {
    const result = isValidSecondaryLastName("W-");
    expect(result).toBe(true);
  });
  it("matches an empty string", () => {
    const result = isValidSecondaryLastName("");
    expect(result).toBe(true);
  });
  it("does NOT match when the string starts with a special character", () => {
    const result = isValidSecondaryLastName("-W");
    expect(result).toBe(false);
  });
  it("does NOT match when the string contains a number", () => {
    const result = isValidSecondaryLastName("Anderso2n");
    expect(result).toBe(false);
  });
  it("does NOT match when the string contains an unauthorized special character", () => {
    const result = isValidSecondaryLastName("Anderso(n");
    expect(result).toBe(false);
  });
  it("does NOT match when passed an integer", () => {
    const result = isValidSecondaryLastName(2);
    expect(result).toBe(false);
  });
  it("does NOT match when passed an empty array", () => {
    const result = isValidSecondaryLastName([]);
    expect(result).toBe(false);
  });
  it("does NOT match when passed an empty object", () => {
    const result = isValidSecondaryLastName({});
    expect(result).toBe(false);
  });
});

describe("Helper validators.js hasSecondaryNumber", () => {
  //this function needs to be passed a value and a vm
  it("returns true when passed a value and secondary number", () => {
    const result = hasSecondaryNumber("a", { secondaryNumber: "a" });
    expect(result).toBe(true);
  });
  it("returns true when passed no value but a secondary number", () => {
    const result = hasSecondaryNumber("", { secondaryNumber: "a" });
    expect(result).toBe(true);
  });
  it("returns true when passed two empty values", () => {
    const result = hasSecondaryNumber("", { secondaryNumber: "" });
    expect(result).toBe(true);
  });
  it("returns false when passed value and empty secondary", () => {
    const result = hasSecondaryNumber("a", { secondaryNumber: "" });
    expect(result).toBe(false);
  });
  it("works the same with values contained in arrays", () => {
    const result = hasSecondaryNumber([], { secondaryNumber: ["a"] });
    expect(result).toBe(true);
  });
  it("works the same with values contained in arrays (2)", () => {
    const result = hasSecondaryNumber(["a"], { secondaryNumber: [] });
    expect(result).toBe(false);
  });
});

describe("Helper validators.js hasSecondaryLastName", () => {
  //this function needs to be passed a value and a vm
  it("returns true when passed a value and secondary number", () => {
    const result = hasSecondaryLastName("a", { secondaryLastName: "a" });
    expect(result).toBe(true);
  });
  it("returns true when passed no value but a secondary number", () => {
    const result = hasSecondaryLastName("", { secondaryLastName: "a" });
    expect(result).toBe(true);
  });
  it("returns true when passed two empty values", () => {
    const result = hasSecondaryLastName("", { secondaryLastName: "" });
    expect(result).toBe(true);
  });
  it("returns false when passed value and empty secondary", () => {
    const result = hasSecondaryLastName("a", { secondaryLastName: "" });
    expect(result).toBe(false);
  });
  it("works the same with values contained in arrays", () => {
    const result = hasSecondaryLastName([], { secondaryLastName: ["a"] });
    expect(result).toBe(true);
  });
  it("works the same with values contained in arrays (2)", () => {
    const result = hasSecondaryLastName(["a"], { secondaryLastName: [] });
    expect(result).toBe(false);
  });
});

describe("Helper validators.js hasDistinctFiles", () => {
  //this function needs to be passed a value and a vm
  it("returns true when passed matching values", () => {
    const result = hasDistinctFiles([{ name: "whatever" }], {
      files: [{ name: "whatever2" }],
    });
    expect(result).toBe(true);
  });
  it("returns false when passed matching values", () => {
    const result = hasDistinctFiles([{ name: "whatever" }], {
      files: [{ name: "whatever" }],
    });
    expect(result).toBe(false);
  });
});

describe("Helper validators.js hasNoInvalidJSON", () => {
  it("returns true with valid input", () => {
    const result = hasNoInvalidJSON("valid text");
    expect(result).toBe(true);
  });
  it("returns false with invalid input, backslash", () => {
    const result = hasNoInvalidJSON("\\ invalid text");
    expect(result).toBe(false);
  });
  it("returns false with invalid input, forward slash", () => {
    const result = hasNoInvalidJSON("/ invalid text");
    expect(result).toBe(false);
  });
  it("returns false with invalid input, double quote", () => {
    const result = hasNoInvalidJSON(`" invalid text`);
    expect(result).toBe(false);
  });
});
