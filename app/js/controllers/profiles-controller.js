app.controller('profilesController', function($scope, ProfilesService) {

  $scope.findAll = function() {
    ProfilesService
      .findAll()
        .then(function success(response) {
          $scope.profiles = response;
        });
  };

  $scope.findAll();

});