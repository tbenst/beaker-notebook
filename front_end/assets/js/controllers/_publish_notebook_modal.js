;(function(angular, app) {
  app.controller('publishNotebook', ['$timeout', '$scope', 'Factories', function($timeout, $scope, F) {
    $scope.showButtons = true;

    $scope.publish = function() {
      F.Notebooks.publish($scope.notebook.current).then(function(notebook) {
        $scope.notebook.current = notebook;
        $scope.$emit('closeModal');
      });
    };

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
    $scope.notebook.current.categoryId = 0;

    F.PublicationCategories.getAll().then(function(categories) {
      $scope.categories = $scope.categoryBase.concat(categories);
    });
  }]);
} (angular, window.bunsen));
