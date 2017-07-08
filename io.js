var io = require('socket.io')();
var messages = require('./messages');
var cookie = require('cookie');
var cookieParser = require('cookie-parser');

io.on('connection', function(socket) {
  var request = socket.request;

  var parsedCookie = cookie.parse( request.headers.cookie );
  var userId = cookieParser.signedCookie( parsedCookie['connect.sid'], 'secret' );

  socket.on('updateMessages', function( messagesClientData ) {
    console.log("UPDATEMESSAGES");
    console.log(JSON.stringify(messagesClientData));

    io.emit('showMessages', {
      messageList: messages,
      currentUserId: userId
    });

  });

  socket.on('postMessage', function(messageData) {
    messages.push( messageData );

    io.emit('showMessages', {
      messageList: messages,
      currentUserId: userId
    });

  });

});

module.exports = io;
