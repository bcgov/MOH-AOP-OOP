
const readJwk = function (base64) {
  const json = Buffer.from(base64, 'base64');
  return JSON.parse(json);
};

const config = {
  grant_type: 'authorization_code',
  auth_scope: process.env.AUTH_SCOPE,
  redirect_uri: process.env.REDIRECT_URI,
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  token_uri: process.env.TOKEN_URI,
  auth_uri: process.env.AUTH_URI,
  info_uri: process.env.INFO_URI,
  jwe: process.env.JWE === 'true',
  jwk: readJwk(process.env.JWK),
  sessions: process.env.SESSIONS || undefined,
  session_options: {
    host: process.env.SESSION_HOST || undefined,
    password: process.env.SESSION_HOST_PASSWORD || undefined,
    secret: process.env.SESSION_SECRET,
    ttl: process.env.SESSION_TTL || 2600,
  }
};

module.exports = config;