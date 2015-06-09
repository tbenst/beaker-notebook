;(function(angular, app) {
  app.controller('publishNotebook', [
    '$timeout',
    '$scope',
    'TrackingService',
    'bkSessionManager',
    'Factories',
    function(
      $timeout,
      $scope,
      TrackingService,
      bkSessionManager,
      F) {

    var publishType;
    $scope.showButtons = true;
    $scope.edited = bkSessionManager.isNotebookModelEdited();

    if($scope.published) {
      publishType = 'updatePublication';
      $scope.title = "Update Notebook";
      $scope.saveButton = "Update";
      $scope.savePublishButton = "Save and Update";
    } else {
      $scope.notebook.current.publication = {};
      publishType = 'publish';
      $scope.title = "Publish Notebook";
      $scope.saveButton = "Publish";
      $scope.savePublishButton = "Save and Publish";
    }

    $scope.publish = function() {
      if ($scope.notebook.current.publication.categoryID == 0) {
        return $scope.error = true;
      }
      TrackingService.mark('PublishNotebook');
      _.extend($scope.notebook.current.publication, {'notebook-id': $scope.notebook.current['public-id']});
      F.Notebooks[publishType]($scope.notebook.current.publication)
      .then(function(publication) {
        F.Notebooks.getNotebook($scope.notebook.current['public-id']).then(function(notebook) {
          $scope.notebook.current = notebook;          
          $scope.$emit('closeModal');
          TrackingService.mark('NotebookPublished');
          TrackingService.measure('BaselineNotebookPublishing', 'PublishNotebook', 'NotebookPublished');
        })
      });
    };

    $scope.refresh = function() {
      $scope.error = ($scope.notebook.current.publication.categoryID == 0);
    }

    $scope.savePublish = function() {
      $scope.showButtons = false;
      $scope.save().then(function() {
        $scope.publish();
      });
    };

    $scope.cancelPublish = function() {
      $scope.$emit('closeModal');
    };

    $scope.categoryBase = [{ 'public-id': 0, 'name': 'Select a Category' }];

    if ($scope.notebook.current.publication.category) {
      $scope.notebook.current.publication.categoryID = $scope.notebook.current.publication.category['public-id'];
    } else {
      $scope.notebook.current.publication.categoryID = 0;
    }

    F.PublicationCategories.getAll().then(function(categories) {
      $scope.categories = $scope.categoryBase.concat(_.sortBy(categories, "name"));
    });
  }]);
} (angular, window.bunsen));
