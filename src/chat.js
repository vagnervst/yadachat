import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
let socket = io();

import Message from './components/Message';

socket.on('connect', function() {
  let chatForm = document.forms.chatForm;

  if( chatForm ) {

    $(chatForm).submit( function(e) {
      e.preventDefault();

      var usernameInput = $('#config-username')[0];
      var messageInput = $('#chat-message')[0];

      socket.emit('postMessage', {
        username: usernameInput.value,
        message: messageInput.value
      });

      messageInput.value = '';
      messageInput.focus();

    });

    socket.on('updateMessages', function( messageData ) {
      showMessage( messageData );
    });

  }

});

function showMessage( messageData ) {
  const message = <Message messageData={messageData} />

  ReactDOM.render(
    message,
    document.querySelector('.container .chat-box .container-messages')
  );
}
