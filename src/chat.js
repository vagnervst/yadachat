import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
let socket = io();
var moment = require('moment');

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

        $.when(
          $.ajax({
            url: 'api/user/getid',
            type: 'GET',
            statusCode: {
              204: function() {
                alert("User ID not defined");
              }
            }
          })
        ).then( function(userId) {

          const user_session_id = userId;

          var now = moment().unix();

          socket.emit('postMessage', {
            type: "usermessage",
            userId: user_session_id,
            username: usernameInput.value,
            message: messageInput.value,
            time: now
          });

          messageInput.value = '';
          messageInput.focus();
        });

        $.ajax(); //Ajax call

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

  $(".container-messages").scrollTop($(".container-messages")[0].scrollHeight);
}

$(document).ready(function() {

  if( $("#homePage")[0] ) {
    socket.emit('updateMessages', {});
  }

});
