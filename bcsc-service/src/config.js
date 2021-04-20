
const config = {
  grant_type: 'authorization_code',
  redirect_uri: process.env.REDIRECT_URI,
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  token_uri: process.env.TOKEN_URI,
  auth_uri: process.env.AUTH_URI,
  info_uri: process.env.INFO_URI,
  auth_scope: process.env.AUTH_SCOPE,
};

module.exports = config;