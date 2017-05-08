app.controller('profilesController', function($scope, ProfilesService) {

  $scope.findAll = function() {
    $scope.loading = true;

    ProfilesService
      .findAll()
        .then(function success(response) {
          $scope.profiles = response;

          for(var i = 0; i < $scope.profiles.length; i++) {
            var profile = $scope.profiles[i];
            $scope.profiles[i].createdAt = moment(profile.createdAt).format("LLLL"); 
            $scope.profiles[i].expires = moment(profile.expires).format("LLLL"); 
          }

          $scope.loading = false;
        }, function error() {
          $scope.loading = false;
        });
  };

  $scope.findAll();

});