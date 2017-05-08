$(document).ready(function() {
    console.log($(".collapse-mobile"));
    $('.collapse-mobile').sideNav({
      menuWidth: 300,
      edge: 'left',
      closeOnClick: true,
      draggable: true
    });
});