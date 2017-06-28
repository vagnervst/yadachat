import $ from 'jquery';

$(document).ready(function() {

  $("header .button-menu").click( function(e) {

    let drawer = $(".drawer")[0];
    let drawerClone = $(drawer).clone(true);

    let white_background = $(".white-background")[0];
    let white_backgroundClone = $(white_background).clone(true);

    drawer.parentNode.removeChild(drawer);
    white_background.parentNode.removeChild(white_background);

    $(white_backgroundClone).removeClass("unfolding");
    $(drawerClone).removeClass("unfolding");

    $(white_backgroundClone).addClass("folding");
    $(drawerClone).addClass("folding");

    $(drawerClone).insertAfter('header');
    $(white_backgroundClone).insertAfter('header');

    $(".drawer .button-unfold .fold").toggleClass("fadingIn", true);
  });

  $(".drawer .button-unfold .fold").click( function(e) {
    let drawer = $(".drawer")[0];
    let drawerClone = $(drawer).clone(true);

    let white_background = $(".white-background")[0];
    let white_backgroundClone = $(white_background).clone(true);

    drawer.parentNode.removeChild(drawer);
    white_background.parentNode.removeChild(white_background);

    $(white_backgroundClone).removeClass("folding");
    $(drawerClone).removeClass("folding");

    $(white_backgroundClone).addClass("unfolding");
    $(drawerClone).addClass("unfolding");

    $(this).css("display", "none");

    $(drawerClone).insertAfter('header');
    $(white_backgroundClone).insertAfter('header');

  });

  $('.messager-box .button-send').click( function(e) {
    $(document.forms.chatForm).trigger('submit');
  });

});
