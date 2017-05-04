app.service('AuthService', function($http, Session, BASE_URL) {
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
      Session.create(token);

      $http({
        method: "GET",
        url: BASE_URL + "/v1/users",
        headers: { "Authorization": "Bearer " + token },
        params: credentials
      })
      .then(function(response) {
        console.log(response);
        Session.saveUsername(response.data.name);
        Session.saveEmail(response.data.email);
        Session.saveAvatar(response.data.avatar);
      });

      return token;

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
      if(!AuthService.isAuthenticated() && next.loadedTemplateUrl != "app/partials/login.html") {
        $location.path("/");
      }

      if(AuthService.isAuthenticated() && next.loadedTemplateUrl != "app/partials/login.html") {
        $location.path("/newPost");
      }

    });
 })