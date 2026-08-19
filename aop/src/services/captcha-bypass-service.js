import * as jwt from "jsonwebtoken";

export const bypassCaptcha = (uuid, salt) => {
  let response;
  try {
    response = jwt.sign(
      { data: { nonce: uuid } },
      salt,
      { expiresIn: "180m" },
    );
  } catch (error) {
    // console.log("ERROR: Could not sign the token with JWT", error);
  }
  return response;
};

export default bypassCaptcha;
