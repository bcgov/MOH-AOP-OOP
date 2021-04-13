const jwt = require("jsonwebtoken");

const bypassCaptcha = (uuid, SECRET) => {
  return jwt.sign({ data: { nonce: uuid } }, SECRET, { expiresIn: "180m" });

};

export default bypassCaptcha;
