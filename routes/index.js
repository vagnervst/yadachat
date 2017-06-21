var express = require('express');
var router = express.Router();
var messages = require('../messages');
var io = require('socket.io')();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Yada' });
});

module.exports = router;
