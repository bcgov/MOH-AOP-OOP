import { isValidPhone } from "@/helpers/validators.js";

var expect = require('chai').expect

describe("Helper validators.js isValidPhone", () => {
    it("matches a phone number with no spaces", () => {
      const result = isValidPhone("2501234567");
      expect(result).to.be.true;
    })
    it("matches a phone number with spaces", () => {
      const result = isValidPhone("250 123 4567");
      expect(result).to.be.true;
    })
    it("matches a phone number with dashes", () => {
      const result = isValidPhone("250-123-4567");
      expect(result).to.be.true;
    })
    it("matches a phone number with periods", () => {
      const result = isValidPhone("250.123.4567");
      expect(result).to.be.true;
    })
    it("matches a phone number with 12 digits", () => {
      const result = isValidPhone("250.123.456789");
      expect(result).to.be.true;
    })
    it("matches a phone number when passed as an integer", () => {
      const result = isValidPhone(2501234567);
      expect(result).to.be.true;
    })
    it("matches a phone number if it's contained in an array", () => {
      const result = isValidPhone(["2501234567"]);
      expect(result).to.be.true;
    })
    it("does NOT match a phone number if it's contained in an object", () => {
      const result = isValidPhone({1: "2501234567"});
      expect(result).to.be.false;
    })
    it("does NOT match a string", () => {
      const result = isValidPhone("a");
      expect(result).to.be.false;
    })
    it("does NOT match a boolean", () => {
      const result = isValidPhone(true);
      expect(result).to.be.false;
    })
    
})