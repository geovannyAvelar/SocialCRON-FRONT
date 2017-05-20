app.controller('postsController', function($scope, $http, $location, PostService) {
  $scope.imageUploading = false;

  $scope.saveDraft = function() {
    $scope.saving = true;

    PostService
      .saveDraft($scope.draft)
        .then(function success() {
          $scope.resetDraftModel();
          $location.path("/postsList");
          $scope.saving = false;
          Materialize.toast('Post has been saved', 3000);
        }, function error() {
          $scope.saving = false;
          Materialize.toast('Cannot save post. Server error', 5000);
        });
  };

  $scope.findAll = function() {
    $scope.loading = true;

    PostService
      .findAll()
        .then(function success(response) {
          $scope.drafts = response;
          $scope.loading = false;
          $('.modal').modal(); //Setting up the modals
        }, function error(response) {
          $scope.loading = false;
          Materialize.toast('Cannot retrieve posts. Server error', 5000);
        });
  };
 
  $scope.deleteDraft = function() {
    if($scope.drafts.length > 0 && $scope.selectedPost !== undefined) {
      PostService
        .deleteDraft($scope.selectedPost)
          .then(function success(response) {
            Materialize.toast('Post has been deleted', 3000);
            $scope.findAll();
          }, function error() {
            Materialize.toast('Cannot delete post. Server error', 5000);
          });
    } else {
      Materialize.toast('You need to select a post before delete', 5000);
    }
  };

  $scope.addPhoto = function() {
    if($scope.drafts.length > 0 && $scope.selectedPost !== undefined) {
      $scope.imageUploading = true;

      PostService
        .addPhoto($scope.selectedPost, $scope.image)
          .then(function success(response) {
            Materialize.toast('Photo has been uploaded', 3000);
            $scope.findAllPhotos();
            $('#uploadPhotoModal').modal('close');
            $scope.imageUploading = false;
          }, function error() {
            Materialize.toast('Cannot upload photo. Server error', 5000);
            $scope.imageUploading = false;
          });
    }
  };

  $scope.findAllPhotos = function() {
    if($scope.drafts.length > 0 && $scope.selectedPost !== undefined) {
      PostService
        .findAllPhotos($scope.selectedPost)
          .then(function success(response) {
            $scope.images = response;
            setTimeout(function(){ $('.materialboxed').materialbox(); }, 1000);
          });
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