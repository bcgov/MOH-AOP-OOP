import axios from "axios";

const bypassCaptcha = async uuid => {
  let token;
  const captchaUrl = '/api/captcha/captcha';
  const verifyUrl = '/api/captcha/verify/captcha';

  try {
    const encryptedCaptcha = await axios.post(captchaUrl, { nonce: uuid });
    const response = await axios.post(verifyUrl, {
      nonce: uuid,
      answer: "irobot",
      validation: encryptedCaptcha.validation
    });

    token = response.data.jwt;
    
  } catch (error) {
    console.log(error);
  }

  return token;
};

export default bypassCaptcha;
