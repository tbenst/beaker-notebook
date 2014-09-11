;(function(angular, app) {
  app.directive('renameNotebookToggle', ['$compile', 'Notebooks', function($compile, Notebooks) {
    return {
      restrict: 'A',
      scope: {
        notebook: '='
      },
      link: function($scope, element) {
        element.on('click', function() {
          $scope.$apply(function() {
            $scope.notebookNewName = $scope.notebook.name;
            $scope.$emit('openModal', $compile(templates.rename_notebook())($scope));
          });
        });

        element.on('$destroy', function() {
          element.off('click');
        });

        $scope.renameSave = function() {
          Notebooks.update({ id: $scope.notebook.id, name: $scope.notebookNewName }).then(function(notebook) {
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
      }
    }
  }]);
})(angular, window.bunsen);
