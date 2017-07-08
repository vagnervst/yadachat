import $ from 'jquery';
let socket = io();

$(document).ready( function() {

  function registerUser( userData, pageToRedirect = undefined ) {
    /**
     * @param userData: object { name: user_name }
     * @param pageToRedirect: string url for redirecting the user, undefined by default
     */


    $.ajax({
      url: 'api/user/new',
      method: 'POST',
      data: userData
    }).done(function( res ) {

      if( pageToRedirect !== undefined ) {

        socket.emit('postMessage', {
          type: "alert",
          message: res.newName + " connected"
        });

        window.location = pageToRedirect;
      } else {

        socket.emit('postMessage', {
          type: "alert",
          message: res.name + " is now called " + res.newName
        });

      }

    });
  }

  function changeStatus( statusCode ) {
    /**
    * @param statusCode: integer representing the user status for chatting (1: online, 2: AFK, 3: busy, 4: offline)
    */
    statusCode = "userstatus=" + statusCode;

    $.ajax({
      url: 'api/user/updatestatus',
      method: 'POST',
      data: statusCode
    }).done(function( response ) {

    });
  }

  var profileForm = $("#profileForm");
  $(profileForm).submit( function(e) {
    e.preventDefault();

    var formData = $(this).serialize();

    var redirectWhenSubmit = $(this).attr("data-redirect");

    var homePageUrl = ( redirectWhenSubmit === "true" )? "/" : undefined;

    registerUser( formData, homePageUrl );
  });

  $(profileForm).find("#userstatus").change( function(e) {
    changeStatus( this.value );
  });

});
