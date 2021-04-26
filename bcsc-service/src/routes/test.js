const express = require('express');
const auth = require('../auth');

const router = express.Router();

module.exports = function (config) {

  // Test config - enabled by TEST_CONFIG env
  process.env.TEST_CONFIG === "enabled" &&
    router.get('/config', (req, res) => {
      res.json(config);
    });

  // Test route - enabled by TEST_CALLBACK
  process.env.TEST_CALLBACK === "enabled" &&
    router.get('/callback', (req, res) => {
      const code = req.query.code;
      if (!code) {
        return res.json({ error: "code" });
      }
      const url = `/api/auth/${code}`;
      res.redirect(url);
    });

  // Session Test Route
  process.env.TEST_SESSION === "enabled" &&
    router.get('/session', (req, res) => {
      let time = req.session.time;
      if (time) {
        return res.end(time);
      }

      time = new Date().toLocaleString();
      req.session.time = time;
      return res.end(time + " (NEW)");
    });


  return router;
};
