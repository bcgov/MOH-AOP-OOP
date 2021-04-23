require('dotenv').config();
const cors = require('cors');
const express = require('express');
const session = require('express-session');
const http = require('http');
const auth = require('./auth');
const config = require('./config');

const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: ['veryimportantsecret', 'notsoimportantsecret', 'highlyprobablysecret'],
}));

app.use(express.static("public"));

app.get('/hello', (req, res) => {
  res.end("ok");
});

app.get('/auth', (req, res) => {
  const url = auth.getAuthUrl(config);
  res.redirect(url);
});

app.get('/callback', (req, res) => {
  const code = req.query.code;
  if (!code) {
    return res.json({ error: "code" });
  }
  const url = `/api/auth/${code}`;
  res.redirect(url);
});

app.get('/api/url', (req, res) => {
  const url = auth.getAuthUrl(config);
  res.json({ url });
});

app.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.status(204).end("");
});

app.get('/api/userinfo', (req, res) => {
  console.log("session = ", req.session);
  const token = req.session.token;
  if (!token) {
    return res.json({ error: "auth" });
  }
  // console.log("token=", token);

  auth.getInfo(config, token)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.json({ err });
    });
});

app.get('/api/auth/:code', (req, res) => {
  const code = req.params.code;
  if (!code) {
    return res.json({ error: "code" });
  }

  auth.getToken(config, code)
    .then(token => {
      req.session.token = token;
      return res.json({ auth: true });
    })
    .catch(err => {
      console.log(err);
      return res.json(err);
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
