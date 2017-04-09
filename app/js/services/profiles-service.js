app.service('ProfilesService', function($http, BASE_URL, AuthService) {
  var profileService = {};

  profileService.saveProfile = function(profile) {
    return $http({
        method: "POST",
        url: BASE_URL + "/v1/profiles",
        headers: {
          "Authorization": "Bearer " + AuthService.getToken()
        },
        data: profile
      }).then(function success(response) {
        return response;
      }, function error(response) {
        return {};
      });
  };

  profileService.findAll = function() {
    return $http({
      method: "GET",
      url: BASE_URL + "/v1/profiles/all",
      headers: {
        "Authorization": "Bearer " + AuthService.getToken()
      }
    }).then(function success(response) {
      return response.data;
    }, function error(response) {
      return [];
    });
  };

  profileService.delete = function (id) {
    return $http({
      method: "DELETE",
      url: BASE_URL + "/v1/profiles/" + id,
      headers: {
        "Authorization": "Bearer " + AuthService.getToken()
      }
    }).then(function success(response) {
      return response;
    }, function error(success) {
      return {};
    });
  };

  return profileService;

});