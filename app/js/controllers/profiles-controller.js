app.controller('profilesController', function($scope, ProfilesService) {

  $scope.findAll = function() {
    $scope.loading = true;

    ProfilesService
      .findAll()
        .then(function success(response) {
          $scope.profiles = response;
          $scope.loading = false;
        }, function error() {
          $scope.loading = false;
        });
  };

  $scope.findAll();

});