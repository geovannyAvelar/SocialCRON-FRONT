app.controller('profilesController', function($scope, ProfilesService) {

  $scope.findAll = function() {
    $scope.loading = true;

    ProfilesService
      .findAll()
        .then(function success(response) {
          $scope.profiles = response;

          for(var i = 0; i < $scope.profiles.length; i++) {
            var profile = $scope.profiles[i];
            profile.expires = moment.unix(profile.expires).format("dddd, MMMM Do YYYY, h:mm:ss a");
            $scope.profiles[i] = profile;
          }

          $scope.loading = false;
        }, function error() {
          $scope.loading = false;
        });
  };

  $scope.findAll();

});