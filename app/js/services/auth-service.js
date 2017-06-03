app.service('AuthService', function($http, $location, Session, BASE_URL) {
  var authService = {};
 
  authService.login = function(credentials) {
    return $http({
      method: "POST",
      url: BASE_URL + "/oauth/token",
      headers: { "Authorization": "Basic c29jaWFsY3Jvbjpzb2NpYWxjcm9u" },
      params: credentials
    })
    .then(function success(response) {
      var token = response.data.access_token;
      var refreshToken = response.data['refresh_token'];
      var expires = response.data['expires_in'] * 1000; // * 1000 to convert to milliseconds
      Session.setRefreshToken(refreshToken);

      var closeSession = setInterval(function () {
        authService.logout();
        $location.path("/");
        Materialize.toast('Your session has expired. Sign in again');
      }, expires);

      Session.create(token);

      authService
        .getUser(token)
          .then(function (user) {
            Session.saveUsername(user.data.name);
            Session.saveEmail(user.data.email);
            Session.saveAvatar(user.data.avatar);
          });

      return token;
    });
  };

  authService.getUser = function(token) {
    return $http({
        method: "GET",
        url: BASE_URL + "/v1/users",
        headers: { "Authorization": "Bearer " + token },
      })
      .then(function(response) {
        return response;
      }, function error() {
        return {};
      });
  };

  authService.refreshToken = function(refreshToken) {
    return $http({
      method: "POST",
      url: BASE_URL + "/oauth/token",
      headers: { "Authorization": "Basic c29jaWFsY3Jvbjpzb2NpYWxjcm9u" },
      params: {"grant_type": "refresh_token", "refresh_token": refreshToken}
    }).then(function success(response) {
      console.log(response);
      return response['access_token'];
    }, function error() {
      return "";
    });
  };
 
  authService.isAuthenticated = function() {
    if(Session.getToken() !== undefined) {
      return true;
    }
    return false;
  };
 
  authService.getToken = function() {
    return Session.getToken();
  };
 
  authService.getUsername = function() {
    return Session.getUsername();
  };

  authService.getEmail = function() {
    return Session.getEmail();
  };

  authService.getAvatar = function() {
    return Session.getAvatar();
  };
 
  authService.logout = function() {
    return $http({
      method: "GET",
      url: BASE_URL + "/oauth/logout",
    }).then(function success() {
      Session.destroy();
    });
  };
 
  return authService;
 
});

app.run(function($rootScope, $location, AuthService) {
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
      // Redirect the user to login if there is no session
      if (current != undefined) {
        if (!AuthService.isAuthenticated() && current.loadedTemplateUrl != "app/partials/login.html") {
          $location.path("/");
        }

        if (AuthService.isAuthenticated() && current.loadedTemplateUrl == "app/partials/login.html") {
          $location.path("/newPost");
        }
      } else {
        if(AuthService.isAuthenticated()) {
          $location.path("/newPost");
        }
      }
    });
 })