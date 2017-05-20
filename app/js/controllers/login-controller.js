app.controller("loginController", function($scope, $rootScope, $cookies, 
                                           $location, $interval, AuthService) {
  
  $scope.credential = {"username": "", "password": "", "grant_type": "password"};

  $scope.login = function() {
    $scope.loading = true;

    AuthService
      .login($scope.credential)
        .then(function success(token) {
          $location.path('/newPost');
          $scope.loading = false;
        }, function error() {
          $scope.error = "Invalid username or password. Try again.";
          $scope.loading = false;
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

  $scope.getAvatar = function() {
    return AuthService.getAvatar();
  };
 
  $scope.logout = function() {
    AuthService
      .logout()
        .then(function success() {
          $location.path('/');
        });
  };
 
});