;(function(angular, app) {
  app.controller('publishNotebook', ['$scope', 'Factories', function($scope, F) {
    $scope.publish = function() {
      F.Notebooks.publish($scope.notebook.current).then(function(notebook) {
        $scope.notebook.current = notebook;
        $scope.$emit('closeModal');
      });
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
