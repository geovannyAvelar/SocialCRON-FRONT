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
    for(var i = 0; i < $scope.selectedProfiles.length; i++) {
      var selected = $scope.selectedProfiles[i];

      if(selected) {
        var profile = $scope.profiles[i];
        
        ProfilesService
          .saveProfile({"name": profile.name, "token": profile.token})
            .then(function () {
              $location.path("/profilesList");
            });
      }
    }
  };

});