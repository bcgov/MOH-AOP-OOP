import { isValidPhone } from "@/helpers/validators.js";

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
