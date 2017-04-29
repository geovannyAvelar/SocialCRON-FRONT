app.service('PostService', function ($http, AuthService, BASE_URL) {
  var postService = {};

  postService.saveDraft = function (draft) {
    return $http({
      method: "POST",
      url: BASE_URL + "/v2/posts",
      headers: {
        "Authorization": "Bearer " + AuthService.getToken()
      },
      data: draft
    }).then(function success(response) {
      return response;
    }, function error(response) {
      return {};
    });
  };

  postService.findAll = function() {
    return $http({
      method: "GET",
      url: BASE_URL + "/v2/posts/all",
      headers: {
        "Authorization": "Bearer " + AuthService.getToken()
      }
    }).then(function success(response) {
      return response.data;
    }, function error(response) {
      return [];
    });
  };

  postService.findOne = function(id) {
    return $http({
      method: "GET",
      url: BASE_URL + "/v2/posts/" + id,
      headers: {
        "Authorization": "Bearer " + AuthService.getToken()
      }
    }).then(function success(response) {
      return response.data;
    }, function error(response) {
      return [];
    });
  };

  postService.deleteDraft = function (id) {
    return $http({
      method: "DELETE",
      url: BASE_URL + "/v2/posts/" + id,
      headers: {
        "Authorization": "Bearer " + AuthService.getToken()
      }
    }).then(function success(response) {
      return response;
    }, function error(success) {
      return {};
    });
  };

  return postService;

});