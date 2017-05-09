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

          $('.modal').modal(); //Setting up the modals

          $scope.loading = false;
        }, function error() {
          $scope.loading = false;
        });
  };

  $scope.deleteProfile = function() {
    if($scope.profiles.length > 0 && $scope.selectedProfile !== undefined) {
      ProfilesService
        .delete($scope.selectedProfile)
          .then(function success(response) {
            Materialize.toast('Profile has been deleted', 3000);
            $scope.findAll();
          }, function error() {
            Materialize.toast('Cannot delete profile. Server error', 5000);
          });
    } else {
      Materialize.toast('You need to select a profile before delete', 5000);
    }
  };

  $scope.setSelectedProfile = function(id) {
    $scope.selectedProfile = id;
  };

  $scope.findAll();

});