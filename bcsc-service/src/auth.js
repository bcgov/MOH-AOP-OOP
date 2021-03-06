const axios = require('axios');
const { decrypt } = require('./jwt');

const getAuthUrl = function (config) {

  const client_url = `${config.auth_uri}?response_type=code` +
    `&scope=${config.auth_scope}&client_id=${config.client_id}` +
    `&redirect_uri=${config.redirect_uri}&state=A`;

  return client_url;
};

const getToken = function (config, code) {

  const template = `&redirect_uri=${config.redirect_uri}&client_id=${config.client_id}&client_secret=${config.client_secret}&grant_type=${config.grant_type}`;
  const data = `code=${code}${template}`;
  // console.log(data);

  return axios.post(config.token_uri, data)
    .then(res => {
      console.log(res.data);
      return res.data.access_token;
    })
    .catch(err => {
      console.log("getToken: ", err.response.data);
      throw (err);
    });
};

const getInfo = function (config, token,) {
  const headers = {
    Accept: config.jwe ? 'application/jwt' : 'application/json',
    Authorization: 'bearer ' + token
  };
  // console.log(headers);

  return axios.get(config.info_uri, { headers })
    .then(res => {
      return res.data;
    })
    .then(info => {
      console.log("raw:", info);
      return config.jwe ? decrypt(config.jwk, info) : info;
    })
    .then(info => {
      console.log("final:", info);
      return info;
    })
    .catch(err => {
      console.log("getInfo: ", err);
      throw (err);
    });
};

module.exports = { getAuthUrl, getToken, getInfo };