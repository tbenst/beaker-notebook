;(function(angular, app) {
  app.directive('renameNotebookToggle', function() {
    return {
      restrict: 'A',
      controller: ['$scope', 'Factories', '$compile', function($scope, Factories, $compile) {
        var F = Factories;

        $scope.showRenameModal = function() {
          $scope.notebookNewName = $scope.notebook.name;
          $scope.$emit('openModal', $compile(templates.rename_notebook())($scope));
        };

        $scope.renameSave = function() {
          F.Notebooks.update({ id: $scope.notebook.id, name: $scope.notebookNewName }).then(function(notebook) {
            $scope.notebook.name = notebook.name;
            $scope.$emit('closeModal');
            delete $scope.error;
          }).catch(function(response) {
            $scope.error = response.data.error;
          });
        };

        $scope.renameCancel = function() {
          $scope.notebookNewName = $scope.notebook.name;
          $scope.$emit('closeModal');
        };
      }]
    }
  });
})(angular, window.bunsen);
