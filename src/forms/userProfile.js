import $ from 'jquery';


$(document).ready( function() {

  function registerUser( userData ) {
    /**
     * @param userData: object { name: user_name }
     */

    $.ajax({
      url: 'api/user/new',
      method: 'POST',
      data: userData
    }).done(function( response ) {
      console.log(response);
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
      console.log(response);
    });
  }

  var profileForm = $("#profileForm");
  $(profileForm).submit( function(e) {
    e.preventDefault();

    var formData = $(this).serialize();

    registerUser( formData );
  });

  $(profileForm).find("#userstatus").change( function(e) {
    changeStatus( this.value );
  });

});
