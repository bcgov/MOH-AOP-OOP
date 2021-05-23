require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const config = require('./config');
const apiRoutes = require('./routes/apiRoutes');
const pageRoutes = require('./routes/pageRoutes');

const PORT = process.env.PORT || 8080;
const app = express();
if(config.sessions)
  {
  const session = require('./redis-session');
  app.use(session(config.session_options));
  }

app.use(cors());
app.use("/api", apiRoutes(config));
app.use("/test", pageRoutes(config));

app.get('/hello', (req, res) => {
  res.end();
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
