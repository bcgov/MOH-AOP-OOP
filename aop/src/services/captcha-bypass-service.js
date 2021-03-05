import axios from "axios";

const bypassCaptcha = async uuid => {
  let token;
  const captchaUrl = '/msp/api/captcha/captcha';
  const verifyUrl = '/msp/api/captcha/verify/captcha';

  try {
    const encryptedCaptcha = await axios.post(captchaUrl, { nonce: uuid });
    const response = await axios.post(verifyUrl, {
      nonce: uuid,
      answer: "irobot",
      validation: encryptedCaptcha.validation
    });

    token = response.jwt;
  } catch (error) {
    console.log(error);
  }

  return token;
};

export default bypassCaptcha;
