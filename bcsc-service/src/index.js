require('dotenv').config();
const cors = require('cors');
const express = require('express');
const session = require('express-session');
const http = require('http');
const auth = require('./auth');
const config = require('./config');
const apiRoutes = require('./routes/api');

const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: ['veryimportantsecret', 'notsoimportantsecret', 'highlyprobablysecret'],
}));

app.use(express.static("public"));
app.use("/api", apiRoutes(config));

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
