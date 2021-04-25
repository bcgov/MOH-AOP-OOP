const session = require('express-session');
const redis = require("redis");

module.exports = function (options) {

  // Conenct to redis
  const client = redis.createClient(options);

  client.on('error', function (err) {
    console.log('Could not connect to redis server:', err);
  });
  client.on('connect', function (err) {
    console.log('Connected to redis server');
  });

  const Store = require('connect-redis')(session);
  const store = new Store({ client, ttl: options.ttl });

  return session({
    store,
    secret: options.secret || "85754332*&^43",
    resave: false,
    saveUninitialized: false,
  });
};