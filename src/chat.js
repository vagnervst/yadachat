import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
let socket = io();

import MessageList from './components/MessageList';

socket.on('connect', function() {

  socket.on('showMessages', function( messageData ) {

    $.ajax({
      url: 'api/user/getid',
      type: 'GET',
      statusCode: {
        204: function() {
          alert("User ID not defined");
        }
      },
      success: function( user_session_id ) {
        showMessage( messageData.messageList, user_session_id );
      }

    }); //Ajax call

  });

  let chatForm = document.forms.chatForm;

  if( chatForm ) {

    $(chatForm).submit( function(e) {
      e.preventDefault();

      var usernameInput = $('#config-username')[0];
      var messageInput = $('#chat-message')[0];

      if( usernameInput.value.length > 0 && messageInput.value.length > 0 ) {

        $.ajax({
          url: 'api/user/getid',
          type: 'GET',
          statusCode: {
            204: function() {
              alert("User ID not defined");
            }
          },
          success: function( res ) {
            const user_session_id = res;

            socket.emit('postMessage', {
              userId: user_session_id,
              username: usernameInput.value,
              message: messageInput.value
            });

            messageInput.value = '';
            messageInput.focus();

          }

        }); //Ajax call

      }

    }); //Submit event
  }

}); //Socket connection event

function showMessage( messageList, userID ) {

  const list = <MessageList currentUserId={userID} messages={messageList} />

  ReactDOM.render(
    list,
    document.querySelector('.container .chat-box')
  );
}

$(document).ready(function() {

  if( $("#homePage")[0] ) {
    socket.emit('updateMessages', {});
  }

});
