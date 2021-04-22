require('dotenv').config();
const express = require('express');
const session = require('express-session');
const http = require('http');
const auth = require('./auth');
const config = require('./config');

const PORT = process.env.PORT || 8080;
const app = express();


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

app.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.status(204).end("");
});

app.get('/api/userinfo', (req, res) => {
  // console.log("session = ", req.session);
  const token = req.session.token;
  if (!token) {
    res.json({ error: "auth" });
    return;
  }

  // console.log("token=", token);

  auth.getInfo(config.info_uri, token)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/callback', (req, res) => {
  const code = req.query.code;
  if (!code) {
    res.json({ error: "auth" });
    return;
  }

  auth.getToken(config, code)
    .then(token => {
      req.session.token = token;
      res.redirect(process.env.HOME_URI);
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
