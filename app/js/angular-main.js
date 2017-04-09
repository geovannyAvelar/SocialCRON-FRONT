var app = angular.module('socialcron', ['ngCookies', 'ngRoute', 'ui.calendar', 'ngFacebook']);
app.constant('BASE_URL', 'http://138.197.105.148:8080');

app.config(function ($routeProvider, $httpProvider, $facebookProvider) {


  $routeProvider
    .when("/", {
      templateUrl: 'app/partials/login.html',
      controller: 'loginController'
    });

});