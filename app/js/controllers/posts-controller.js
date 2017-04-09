app.controller('postsController', function($scope, $http, $location, PostService) {
 
  $scope.saveDraft = function() {
    PostService
      .saveDraft($scope.draft)
        .then(function success() {
          $scope.resetDraftModel();
          $location.path("/postsList");
          Materialize.toast('Post has been saved', 3000);
        }, function error() {
          Materialize.toast('Cannot save post. Server error', 5000);
        });
  };

  $scope.findAll = function() {
    PostService
      .findAll()
        .then(function success(response) {
          $scope.drafts = response;
          $('.modal').modal(); //Setting up the modals
          $scope.findAll();
        }, function error(response) {
          Materialize.toast('Cannot retrieve posts. Server error', 5000);
        });
  };
 
  $scope.deleteDraft = function() {
    if($scope.drafts.length > 0 && $scope.selectedPost !== undefined) {
      PostService
        .deleteDraft($scope.selectedPost)
          .then(function success(response) {
            Materialize.toast('Post has been deleted', 3000);
          }, function error() {
            Materialize.toast('Cannot delete post. Server error', 5000);
          });
    } else {
      Materialize.toast('You need to select a post before delete', 5000);
    }
  };
 
  $scope.resetDraftModel = function() {
    $scope.draft = undefined;
    $scope.draftForm.$setUntouched();
  };
 
  $scope.setSelectedPost = function(id) {
    $scope.selectedPost = id;
  };

  $scope.findAll();

});