var app = angular.module('socialcron', ['ngCookies', 'ngRoute', 'ui.calendar', 'ngFacebook']);
app.constant('BASE_URL', 'http://138.197.105.148:5756');

app.config(function ($routeProvider, $httpProvider, $facebookProvider) {

  (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  $facebookProvider.setAppId('1052750751465673');
  $facebookProvider.setPermissions("email,publish_pages,publish_actions,manage_pages,user_posts");

  $routeProvider
    .when("/", {
      templateUrl: 'app/partials/login.html',
      controller: 'loginController'
    })
    .when("/newPost", {
      templateUrl: 'app/partials/newPost.html',
      controller: 'postsController'
    })
    .when("/postsList", {
      templateUrl: 'app/partials/postsList.html',
      controller: 'postsController'
    })
    .when("/newEvent", {
      templateUrl: 'app/partials/newEvent.html',
      controller: 'schedulesController'
    })
    .when("/newProfile", {
      templateUrl: 'app/partials/newProfile.html',
      controller: 'facebookController'
    })
    .when("/profilesList", {
      templateUrl: 'app/partials/profilesList.html',
      controller: 'profilesController'
    });
});