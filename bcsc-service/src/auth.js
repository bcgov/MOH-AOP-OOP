const axios = require('axios');

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
      console.log(err.response.data);
      throw (err.response.status);
    });
};

const getInfo = function (config, token,) {

  return axios.get(config.info_uri, {
    headers: { Authorization: 'bearer ' + token }
  })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
      throw ("error");
    });
};

module.exports = { getAuthUrl, getToken, getInfo };