import { isValidPhone, isValidEmail } from "@/helpers/validators.js";

describe("isValidPhone", () => {
  it("returns false when called with no arguments", () => {
    const response = isValidPhone();
    expect(response).toEqual(false);
  });
  it("returns false when called with an invalid phone number", () => {
    const response = isValidPhone("foobar");
    expect(response).toEqual(false);
  });
  it("returns false when called with a phone number without an area code", () => {
    const response = isValidPhone("1234567");
    expect(response).toEqual(false);
  });
  it("returns true when called with valid phone number", () => {
    const response = isValidPhone("2501234567");
    expect(response).toEqual(true);
  });
  it("returns true when called with valid phone number (with hyphens)", () => {
    const response = isValidPhone("250-123-4567");
    expect(response).toEqual(true);
  });
  it("returns true when called with valid phone number (with periods)", () => {
    const response = isValidPhone("250.123.4567");
    expect(response).toEqual(true);
  });
  it("returns true when called with valid phone number (with parentheses)", () => {
    const response = isValidPhone("(250)-123-4567");
    expect(response).toEqual(true);
  });
  it("returns true when called with valid phone number (with spaces)", () => {
    const response = isValidPhone("(250) 123 4567");
    expect(response).toEqual(true);
  });
  it("returns true when called with valid phone number (with a +1 at the beginning)", () => {
    const response = isValidPhone("+12501234567");
    expect(response).toEqual(true);
  });
});

describe("isValidEmail", () => {
  it("returns false when called with no arguments", () => {
    const response = isValidEmail();
    expect(response).toEqual(false);
  });
  it("returns false when called with an incorrectly formatted email address", () => {
    const response = isValidEmail("foobar");
    expect(response).toEqual(false);
  });
  it("returns false when called with an incorrectly formatted email address (with commas)", () => {
    const response = isValidEmail("foobar#foobar,com");
    expect(response).toEqual(false);
  });
  it("returns false when called with an incorrectly formatted email address (extra period in domain)", () => {
    const response = isValidEmail("foobar@.foober.com");
    expect(response).toEqual(false);
  });
  it("returns false when called with an incorrectly formatted email address (extra period in address)", () => {
    const response = isValidEmail("foobar..foobar@foobar.com");
    expect(response).toEqual(false);
  });
  it("returns false when called with an incorrectly formatted email address (leading period)", () => {
    const response = isValidEmail(".foobar@foobar.com");
    expect(response).toEqual(false);
  });
  it("returns false when called with an incorrectly formatted email address (trailing hyphen)", () => {
    const response = isValidEmail("foobar@foobar-.com");
    expect(response).toEqual(false);
  });
  it("returns false when called with an incorrectly formatted email address (with an @ symbol)", () => {
    const response = isValidEmail("foobar@foobar");
    expect(response).toEqual(false);
  });
  it("returns true when called with a validly formatted email address", () => {
    const response = isValidEmail("foobar@foobar.com");
    expect(response).toEqual(true);
  });
  it("returns true when called with a validly formatted email address (with a period in it)", () => {
    const response = isValidEmail("foobar.foobar@foobar.com");
    expect(response).toEqual(true);
  });
  it("returns true when called with a validly formatted email address (with a plus in it)", () => {
    const response = isValidEmail("foobar+foobar@foobar.com");
    expect(response).toEqual(true);
  });
  it("returns true when called with a validly formatted email address (with a dash in it)", () => {
    const response = isValidEmail("foobar-foobar@foobar.com");
    expect(response).toEqual(true);
  });
});