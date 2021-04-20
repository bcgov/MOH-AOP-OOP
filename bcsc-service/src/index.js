require('dotenv').config();
const express = require('express');
const http = require('http');
const auth = require('./auth');
const config = require('./config');

const PORT = process.env.PORT || 8080;
const app = express();

app.get('/health', (req, res) => {
  res.end("ok");
});

app.get('/auth', (req, res) => {
  const url = auth.getAuthUrl(config);
  res.redirect(url);
});

app.get('/callback', (req, res) => {
  const code = req.query.code;

  auth.getToken(code, config)
    .then(data => {
      return auth.getInfo(config.info_uri, data);
    })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
    });
});

// Optional https server
const SSL_PORT = process.env.SSL_PORT;
if (SSL_PORT) {
  const startHttps = require('./https');
  startHttps(SSL_PORT, app);
}

httpServer = http.createServer(app);
httpServer.listen(PORT, () =>
  console.log(`Auth app listening on port ${PORT}!`),
);
