;(function(angular, app) {
  app.controller('publishNotebook', ['$timeout', '$scope', 'Factories', function($timeout, $scope, F) {
    var publishType;
    $scope.showButtons = true;

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
      if ($scope.notebook.current.publication.categoryId == 0) {
        return $scope.error = true;
      }
      _.extend($scope.notebook.current.publication, {notebookId: $scope.notebook.current.id});
      F.Notebooks[publishType]($scope.notebook.current.publication).then(function(notebook) {
        $scope.notebook.current = notebook;
        $scope.$emit('closeModal');
      });
    };

    $scope.refresh = function() {
      $scope.error = ($scope.notebook.current.publication.categoryId == 0);
    }

    $scope.savePublish = function() {
      $scope.showButtons = false;
      $scope.save();
      // Currently there is no way to detect if notebook was saved in Bunsen,
      // so we wait before publishing it
      $timeout($scope.publish, 1000);
    };

    $scope.cancelPublish = function() {
      $scope.$emit('closeModal');
    };

    $scope.categoryBase = [{ id: 0, name: 'Select a Category' }];
    $scope.notebook.current.publication.categoryId = $scope.notebook.current.publication.categoryId || 0;

    F.PublicationCategories.getAll().then(function(categories) {
      $scope.categories = $scope.categoryBase.concat(_.sortBy(categories, "name"));
    });
  }]);
} (angular, window.bunsen));
