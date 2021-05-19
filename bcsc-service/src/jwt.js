const jose = require('node-jose');
const jwt_decode = require("jwt-decode");

//  Returns Promise
const decrypt = function (jwk, input) {

  return jose.JWK.asKey(jwk).
    then(function (key) {
      return jose.JWE.createDecrypt(key).
        decrypt(input.toString());
    })
    .then(function (result) {
      return result.payload.toString();
    })
    .then(token => {
      // console.log(token);

      const decoded = jwt_decode(token);
      return decoded;
    });

};

const getKey = function (jwk, private = false) {
  return jose.JWK.asKey(jwk).
    then(function (key) {
      return key.toJSON(private);
    });
};

const createKeyPair = function () {

  const keyStore = jose.JWK.createKeyStore();
  keyStore.generate('RSA', 2048, { alg: 'RS256', use: 'enc' })
    .then(result => {
      return keyStore.toJSON(true);
    });
};

module.exports = { decrypt, createKeyPair, getKey };