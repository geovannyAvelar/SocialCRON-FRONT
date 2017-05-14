app.service('PostService', function ($http, AuthService, Upload, BASE_URL) {
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

  postService.addPhoto = function (postId, image) {
    return Upload.upload({
      url: BASE_URL + "/v2/photos",
      headers: {
        "Authorization": "Bearer " + AuthService.getToken()
      },
      data: {
        'file': image,
        'postId': postId
      }
    }).then(function (resp) {
      return resp;
    }, function (resp) {
      return resp;
    }, function (evt) {
      var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      return progressPercentage;
    });
  };

  postService.findPhoto = function(id) {
    return $http({
      url: BASE_URL + '/v2/photos/' + id,
      headers: {
        "Authorization": "Bearer " + AuthService.getToken()
      }
    }).then(function success(response) {
      return response.data;
    }, function error() {
      return "";
    });
  };

  postService.findAllPhotos = function(id) {
    return $http({
      url: BASE_URL + '/v2/photos/post/' + id,
      headers: {
        "Authorization": "Bearer " + AuthService.getToken()
      }
    }).then(function success(response) {
      return response.data;
    }, function error() {
      return [];
    });
  };

  return postService;

});