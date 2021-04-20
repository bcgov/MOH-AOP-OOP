
const startHttps = function (port, app) {
  console.log("Starting Https");
  const https = require('https');
  const base64 = require('./base64');
  console.log("reading SSL cert & key");

  // Decode Cert & Key
  const cert = base64.decode(process.env.SSL_CERT);
  const key = base64.decode(process.env.SSL_KEY);
  // console.log(cert);
  // console.log(key);

  if (cert && key) {
    console.log("create SSL server");
    httpsServer = https.createServer({ key, cert }, app);
    httpsServer.listen(8443, () =>
      console.log(`Auth app listening on port ${port}!`),
    );
  }
};

module.exports = startHttps;