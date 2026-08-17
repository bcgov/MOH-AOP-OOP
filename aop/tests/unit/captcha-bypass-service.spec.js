import { bypassCaptcha } from "@/services/captcha-bypass-service.js";

describe("captcha-bypass-service", () => {
  it("returns undefined when called with no arguments", () => {
    const response = bypassCaptcha()
    expect(response).toBeUndefined();
  });
  it("returns defined when called with arguments", () => {
    const uuid = "abcdefga-1234-abcd-1234-abcdefgabcde"
    const salt = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz"
    const response = bypassCaptcha(uuid, salt)

    expect(response).toBeDefined();
    //the first two characters of a properly formatted JWT are always ey
    expect(response[0]).toEqual("e");
    expect(response[1]).toEqual("y");
    expect(response.length).toBeGreaterThan(100);
  });
});