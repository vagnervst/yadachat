var express = require('express');
var router = express.Router();
var session = require('express-session');

router.post('/user/new', function(req, res, next) {
  var userInfo = req.body;

  var session = req.session;
  session.username = userInfo.username;

  res.send(session);
});

router.post('/user/updatestatus', function(req, res, next) {
  var statusCode = req.body.userstatus;

  var session = req.session;
  session.userstatus = statusCode;

  res.send(session);
});

module.exports = router;
