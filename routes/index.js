var express = require('express');
var router = express.Router();
var messages = require('../messages');
var io = require('socket.io')();

/* GET home page. */
router.get('/', function(req, res, next) {
  var session = req.session;
  var stored_username = ( session.username !== undefined )? session.username : "";

  if( session.username ) {
    res.render('index', {
      title: 'Yada',
      hasDrawer: true,
      username: stored_username,
      userstatus: session.userstatus,
      redirectWhenSubmit: false
    });

  } else {
    res.redirect('/profile');
  }

});

router.get('/profile', function(req, res, next) {
  var session = req.session;
  var stored_username = ( session.username !== undefined )? session.username : "";

  res.render('profile',
  {
    title: 'Profile',
    hasDrawer: false,
    username: stored_username,
    userstatus: session.userstatus,
    redirectWhenSubmit: true
  });

});

module.exports = router;
