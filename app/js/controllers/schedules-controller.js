app.controller('schedulesController', function($scope, $location, EventsService, 
                                               PostService, ProfilesService, SchedulesService) {
  $scope.periods = [{"name": "HOUR"}, {"name": "DAY"}, {"name": "WEEK"}];
  $scope.event = { 'limitDate': new Date(), 
                   'interval': 1, 
                   'period': $scope.periods[0]};
  $scope.repeat = false;
 
  $scope.init = function() {
    $('#period').material_select();
    $('.collapsible').collapsible();
    $scope.loadPosts();
    $scope.loadProfiles();
    $scope.findAll();
  };

  $scope.save = function() {
    $scope.saving = true;
    $scope.eventToSave = {}

    if($scope.repeat) {
      $scope.eventToSave.limitDate = moment($scope.event.limitDate).format("YYYY-MM-DDTHH:mmZZ");
      $scope.eventToSave.interval = $scope.event.interval;
      $scope.eventToSave.period = $scope.event.period.name;
    }

    $scope.eventToSave.initialDate = moment($scope.event.initialDate).format("YYYY-MM-DDTHH:mmZZ");
    $scope.eventToSave.post = $scope.post;
    $scope.eventToSave.profile = $scope.event.profile;

    EventsService
      .save($scope.eventToSave)
        .then(function(response) {
          $scope.findSchedulesByPost();
          $("#eventForm").modal('close');
          $("#calendarModal").modal('open');
          $scope.saving = false;
          Materialize.toast('Event has been saved', 3000);
        }, function error() {
           $scope.saving = false;
           Materialize.toast('Cannot save event. Server error', 5000);
        });
  };

  $scope.findAll = function () {
    $scope.loading = true;

    EventsService
      .findAll()
        .then(function success(response) {
          $scope.events = response;
          $scope.loading = false;
        }, function error(response) {
          $scope.loading = false;
          Materialize.toast('Cannot retrieve events. Server error', 5000);
        });
  };

  $scope.findSchedulesByPost = function() {
    if($scope.selectedPostId !== undefined) {
      $scope.schedulesLoading = true;

      SchedulesService
        .findByPost($scope.selectedPostId)
          .then(function success(response) {
            $scope.schedules = [];

            for(var i in response) {
              var schedule = response[i];

              if(schedule['completed'] == false) {
                schedule['date'] = moment(schedule['date']).utc().local().format("LLL");
                $scope.schedules.push(schedule);
              }

            }

            $scope.schedulesLoading = false;

          }, function error() {
            Materialize.toast('Cannot retrieve posts. Server error', 5000);
            $scope.schedulesLoading = false;
          });
    }
  };

  $scope.delete = function () {
    if ($scope.drafts.length > 0 && $scope.selectedPostId !== undefined) {
      PostsService
        .delete($scope.selectedPostId)
          .then(function success(response) {
            Materialize.toast('Event has been deleted', 3000);
          }, function error() {
            Materialize.toast('Cannot delete events. Server error', 5000);
          });
    } else {
      Materialize.toast('You need to select a event before delete', 5000);
    }
  };

  $scope.loadPosts = function() {
    PostService
      .findAll()
        .then(function success(response) {
          $scope.posts = response;
          $('.modal').modal(); //Setting up the modals
        }, function error() {
          Materialize.toast('Cannot load profiles. Server error', 5000);
        });
  };

  $scope.loadProfiles = function() {
    ProfilesService
      .findAll()
        .then(function success(response) {
          $scope.profiles = response;
          $('#profile').material_select('destroy');
          $('#profile').material_select();
        }, function error() {
          Materialize.toast('Cannot load profiles. Server error', 5000);
        });
  };

  $scope.setSelectedPost = function(id) {
    $scope.selectedPostId = id;

    PostService
      .findOne($scope.selectedPostId)
        .then(function(response) {
          $scope.post = response;
        });
  };
  
});