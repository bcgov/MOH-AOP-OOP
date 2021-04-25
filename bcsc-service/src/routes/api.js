const express = require('express');
const auth = require('../auth');

const router = express.Router();

module.exports = function (config) {

  router.get('/url', (req, res) => {
    const url = auth.getAuthUrl(config);
    res.json({ url });
  });

  router.post('/logout', (req, res) => {
    req.session.destroy();
    res.status(204).end();
  });

  router.get('/userinfo', (req, res) => {
    // console.log("session = ", req.session);
    const token = req.session.token;
    if (!token) {
      return res.json({ error: "auth" });
    }
    // console.log("token=", token);

    auth.getInfo(config, token)
      .then(info => {
        res.json(info);
      })
      .catch(err => {
        console.log(err);
        res.json({ err });
      });
  });

  router.get('/auth/:code', (req, res) => {
    const code = req.params.code;
    if (!code) {
      return res.json({ error: "code" });
    }

    auth.getToken(config, code)
      .then(token => {
        req.session.token = token;
        return auth.getInfo(config, token);
      })
      .then(info => {
        return res.json(info);
      })
      .catch(err => {
        console.log(err);
        const error = err.error ? err.error : err;
        return res.json({ error });
      });
  });

  return router;
};
