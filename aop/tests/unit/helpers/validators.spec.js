import {
  isValidPhone,
  isValidEmail,
  isValidLastName,
} from "@/helpers/validators.js";

var expect = require("chai").expect;

describe("Helper validators.js isValidPhone", () => {
  it("matches a phone number with no spaces", () => {
    const result = isValidPhone("2501234567");
    expect(result).to.be.true;
  });
  it("matches a phone number with spaces", () => {
    const result = isValidPhone("250 123 4567");
    expect(result).to.be.true;
  });
  it("matches a phone number with dashes", () => {
    const result = isValidPhone("250-123-4567");
    expect(result).to.be.true;
  });
  it("matches a phone number with periods", () => {
    const result = isValidPhone("250.123.4567");
    expect(result).to.be.true;
  });
  it("matches a phone number with 12 digits", () => {
    const result = isValidPhone("250.123.456789");
    expect(result).to.be.true;
  });
  it("matches a phone number when passed as an integer", () => {
    const result = isValidPhone(2501234567);
    expect(result).to.be.true;
  });
  it("matches a phone number if it's contained in an array", () => {
    const result = isValidPhone(["2501234567"]);
    expect(result).to.be.true;
  });
  it("does NOT match a phone number if it's contained in an object", () => {
    const result = isValidPhone({ 1: "2501234567" });
    expect(result).to.be.false;
  });
  it("does NOT match a string", () => {
    const result = isValidPhone("a");
    expect(result).to.be.false;
  });
  it("does NOT match a boolean", () => {
    const result = isValidPhone(true);
    expect(result).to.be.false;
  });
  it("does NOT match when passed an empty array", () => {
    const result = isValidPhone([]);
    expect(result).to.be.false;
  });
  it("does NOT match when passed an empty object", () => {
    const result = isValidPhone({});
    expect(result).to.be.false;
  });
  it("does NOT match when passed an empty string", () => {
    const result = isValidPhone("");
    expect(result).to.be.false;
  });
});

describe("Helper validators.js isValidEmail", () => {
  it("matches a standard email", () => {
    const result = isValidEmail("something@mail.ca");
    expect(result).to.be.true;
  });
  it("matches a standard email (2)", () => {
    const result = isValidEmail("a@a.aa");
    expect(result).to.be.true;
  });
  it("matches a standard email that starts with a special character", () => {
    const result = isValidEmail("!@a.aa");
    expect(result).to.be.true;
  });
  it("does NOT match if a special character comes after the @ sign", () => {
    const result = isValidEmail("a@!.aa");
    expect(result).to.be.false;
  });
  it("does NOT match if a special character comes after the .", () => {
    const result = isValidEmail("a@a.!a");
    expect(result).to.be.false;
  });
  it("does NOT match if there's nothing before the @ sign", () => {
    const result = isValidEmail("@mail.ca");
    expect(result).to.be.false;
  });
  it("does NOT match if there's nothing between the @ and .", () => {
    const result = isValidEmail("something@.ca");
    expect(result).to.be.false;
  });
  it("does NOT match if there's nothing after the .", () => {
    const result = isValidEmail("something@mail.");
    expect(result).to.be.false;
  });
  it("does NOT match if there's only one letter after the .", () => {
    const result = isValidEmail("something@mail.a");
    expect(result).to.be.false;
  });
  it("does NOT match when passed an empty array", () => {
    const result = isValidEmail([]);
    expect(result).to.be.false;
  });
  it("does NOT match when passed an empty object", () => {
    const result = isValidEmail({});
    expect(result).to.be.false;
  });
  it("does NOT match when passed an empty string", () => {
    const result = isValidEmail("");
    expect(result).to.be.false;
  });
});

describe("Helper validators.js isValidLastName", () => {
  it("matches a standard surname", () => {
    const result = isValidLastName("Anderson");
    expect(result).to.be.true;
  });
  it("matches a standard surname (2)", () => {
    const result = isValidLastName("Wu");
    expect(result).to.be.true;
  });
  it("matches a string that has a period in it", () => {
    const result = isValidLastName("W.");
    expect(result).to.be.true;
  });
  it("matches a string that has a space in it", () => {
    const result = isValidLastName("W ");
    expect(result).to.be.true;
  });
  it("matches a string that has an apostrophe in it", () => {
    const result = isValidLastName("W'");
    expect(result).to.be.true;
  });
  it("matches a string that has a dash in it", () => {
    const result = isValidLastName("W-");
    expect(result).to.be.true;
  });
  it("does NOT match when the string starts with a special character", () => {
    const result = isValidLastName("-W");
    expect(result).to.be.false;
  });
  it("does NOT match when the string contains a number", () => {
    const result = isValidLastName("Anderso2n");
    expect(result).to.be.false;
  });
  it("does NOT match when the string contains an unauthorized special character", () => {
    const result = isValidLastName("Anderso(n");
    expect(result).to.be.false;
  });
  it("does NOT match when passed an integer", () => {
    const result = isValidLastName(2);
    expect(result).to.be.false;
  });
  it("does NOT match when passed an empty array", () => {
    const result = isValidLastName([]);
    expect(result).to.be.false;
  });
  it("does NOT match when passed an empty object", () => {
    const result = isValidLastName({});
    expect(result).to.be.false;
  });
  it("does NOT match when passed an empty string", () => {
    const result = isValidLastName("");
    expect(result).to.be.false;
  });
});
