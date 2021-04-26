require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const auth = require('./auth');
const config = require('./config');
const session = require('./redis-session');
const apiRoutes = require('./routes/api');
const testRoutes = require('./routes/test');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(session(config.session_options));
app.use("/api", apiRoutes(config));
app.use("/test", testRoutes(config));

app.get('/hello', (req, res) => {
  res.end();
});

// Convenience route for redirect
app.get('/auth', (req, res) => {
  const url = auth.getAuthUrl(config);
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
