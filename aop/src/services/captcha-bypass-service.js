const jwt = require("jsonwebtoken");

const bypassCaptcha = (uuid, salt) => {
  return jwt.sign({ data: { nonce: uuid } }, salt, { expiresIn: "180m" });

};

export default bypassCaptcha;
