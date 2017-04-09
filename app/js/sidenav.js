$(document).ready(function() {
    $('.collapse').sideNav({
      menuWidth: 300,
      edge: 'left',
      closeOnClick: false,
    });

    $('.collapse-mobile').sideNav({
      menuWidth: 300,
      edge: 'left',
      closeOnClick: true,
      draggable: true
    });
});