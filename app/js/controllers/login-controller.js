app.controller("loginController", function($scope, $rootScope, $cookies, $location, AuthService) {
  $scope.credential = {"username": "", "password": "", "grant_type": "password"};
 
  $scope.login = function() {
    AuthService
      .login($scope.credential)
        .then(function success(token) {
          $location.path('/newPost');
        });
  };
 
  $scope.isAuthenticated = function() {
    return AuthService.isAuthenticated();
  };
 
  $scope.getUsername = function() {
    return AuthService.getUsername();
  };

  $scope.getEmail = function() {
    return AuthService.getEmail();
  };
 
  $scope.logout = function() {
    AuthService
      .logout()
        .then(function success() {
          $location.path('/');
        });
  };
 
});