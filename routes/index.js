var express = require('express');
var router = express.Router();
var messages = require('../messages');
var io = require('socket.io')();

/* GET home page. */
router.get('/', function(req, res, next) {
  var session = req.session;
  console.log(session);

  if( session.username ) {
    res.render('index',
    {
      title: 'Yada',
      hasDrawer: true,
      username: session.username,
      userstatus: session.userstatus
    });

  } else {
    res.redirect('/profile');
  }

});

router.get('/profile', function(req, res, next) {
  var session = req.session;
  console.log(session);

  res.render('profile',
  {
    title: 'Profile',
    hasDrawer: false,
    username: session.username,
    userstatus: session.userstatus
  });

});

module.exports = router;
