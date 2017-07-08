var express = require('express');
var router = express.Router();
var session = require('express-session');

router.post('/user/new', function(req, res, next) {
  var userInfo = req.body;

  var session = req.session;
  var oldName = session.username;
  session.username = userInfo.username;

  res.send({
    name: oldName,
    newName: userInfo.username
  });
});

router.post('/user/updatestatus', function(req, res, next) {
  var statusCode = req.body.userstatus;

  var session = req.session;
  session.userstatus = statusCode;

  res.send(session);
});

router.get('/user/getid', function(req, res, next) {
  var session = req.session;

  const NO_CONTENT_STATUS_CODE = 204;
  if( session.id === undefined ) {
    res.sendStatus( NO_CONTENT_STATUS_CODE );
  } else {
    var userID = session.id;
    res.send( userID );
  }

});

module.exports = router;
