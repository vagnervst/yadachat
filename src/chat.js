import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
let socket = io();

import MessageList from './components/MessageList';

socket.on('connect', function() {
  let chatForm = document.forms.chatForm;

  if( chatForm ) {

    $(chatForm).submit( function(e) {
      e.preventDefault();

      var usernameInput = $('#config-username')[0];
      var messageInput = $('#chat-message')[0];

      socket.emit('postMessage', {
        userId: socket.id,
        username: usernameInput.value,
        message: messageInput.value
      });

      messageInput.value = '';
      messageInput.focus();

    });

    socket.on('updateMessages', function( messageList ) {
      showMessage( messageList );
    });

  }

});

function showMessage( messageList ) {
  const list = <MessageList currentUserId={socket.id} messages={messageList} />

  ReactDOM.render(
    list,
    document.querySelector('.container .chat-box')
  );
}
