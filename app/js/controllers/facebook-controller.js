app.controller('facebookController', function ($scope, $location, ProfilesService, FacebookService) {
  $scope.profiles = [];
  $scope.selectedProfiles = [];

  $scope.login = function () {
    FacebookService.login()
      .then(function () {

        FacebookService
          .login()
            .then(function success(response) {
              $scope.token = response.accessToken;

              FacebookService
                .getCurrentProfile()
                  .then(function (response) {
                    $scope.profiles.push(response);
                  });

              FacebookService
                .getCurrentUserPages()
                  .then(function (response) {
                    if(response != undefined) {
                      for (var i = 0; i < response.length; i++) {
                        $scope.profiles.push(response[i]);
                      }
                    }
                  });
            });
      });
  };

  $scope.saveProfiles = function() {
    $scope.loading = true;

    for(var i = 0; i < $scope.selectedProfiles.length; i++) {
      var selected = $scope.selectedProfiles[i];

      if(selected) {
        var profile = $scope.profiles[i];
        var profileToSave = {
                              "profileId": profile.id, 
                              "name": profile.name, 
                              "token": profile.token,
                              "createdAt": moment().format("YYYY-MM-DDTHH:mmZZ")
                            }

        ProfilesService
          .saveProfile(profileToSave)
            .then(function () {
              $scope.loading = false;
              $location.path("/profilesList");
              Materialize.toast('Profile has been saved', 3000);
            }, function error() {
              $scope.loading = false;
              Materialize.toast('Cannot save post. Server error', 5000);
            });
      }
    }
  };

  $scope.isSelectedProfilesEmpty = function() {
    if($scope.selectedProfiles.length == 0) {
      return true;
    }

    for(var i = 0; i < $scope.selectedProfiles.length; i++) {
      var selected = $scope.selectedProfiles[i];

      if(selected) {
        return false;
      }
    }

    return true;

  };

});