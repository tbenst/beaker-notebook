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
  }]);
} (angular, window.bunsen));
