app.controller('eventsController', function($scope, EventsService) {
  $scope.event = {'initialDate': new Date(), 'limitDate': new Date(), 'interval': 1};

  $scope.save = function() {
    EventsService.save($scope.event)
      .then(function(response) {
         $location.path("/eventsList");
         Materialize.toast('Event has been saved', 3000);
      }, function error(response) {
        Materialize.toast('Cannot save event. Server error', 5000);
      });
  };

  $scope.findAll = function () {
    EventsService.findAll()
      .then(function success(response) {
        $scope.events = response;
        $scope.findAll();
      }, function error(response) {
        Materialize.toast('Cannot retrieve events. Server error', 5000);
      });
  }

  $scope.delete = function () {
    if ($scope.drafts.length > 0 && $scope.selectedPost !== undefined) {
      EventsService.delete($scope.selectedEvent)
        .then(function success(response) {
          Materialize.toast('Event has been deleted', 3000);
        }, function error() {
          Materialize.toast('Cannot delete events. Server error', 5000);
        });
    } else {
      Materialize.toast('You need to select a event before delete', 5000);
    }
  };

  $scope.setSelectedEvent = function(id) {
    $scope.selectedEvent = id;
  };

  $('select').material_select();
});