app.service('EventsService', function($http, AuthService, BASE_URL) {
  var eventsService = {};

  eventsService.save = function(event) {
    return $http({
      method: "POST",
      url: BASE_URL + "/v1/events",
      headers: {
        "Authorization": "Bearer " + AuthService.getToken()
      },
      data: event
    }).then(function success(response) {
      return response;
    }, function error(response) {
      return {};
    });
  };

    postService.findAll = function() {
    return $http({
      method: "GET",
      url: BASE_URL + "/v1/events/all",
      headers: {
        "Authorization": "Bearer " + AuthService.getToken()
      }
    }).then(function success(response) {
      return response.data;
    }, function error(success) {
      return [];
    });
  };

  postService.delete = function (id) {
    return $http({
      method: "DELETE",
      url: BASE_URL + "/v1/events/" + id,
      headers: {
        "Authorization": "Bearer " + AuthService.getToken()
      }
    }).then(function success(response) {
      return response;
    }, function error(success) {
      return {};
    });
  };


  return eventsService;

});