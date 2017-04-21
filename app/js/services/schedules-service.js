app.service('SchedulesService', function($http, BASE_URL, AuthService) {
  var scheduleService = {};

  scheduleService.findByEvent = function(event) {
    return $http({
       method: 'GET',
       url: BASE_URL + '/v2/schedules/event/' + event.id,
       headers: {
         "Authorization": "Bearer " + AuthService.getToken()
       }
    }).then(function(response) {
      return response;
    }, function error(response) {
      return {};
    });
  };

  scheduleService.findByPost = function(postId) {
    return $http({
       method: 'GET',
       url: BASE_URL + '/v2/schedules/post/' + postId,
       headers: {
         "Authorization": "Bearer " + AuthService.getToken()
       }
    }).then(function(response) {
      return response.data;
    }, function error(response) {
      return {};
    });
  };

  return scheduleService;
  
});