;(function(app) {
  app.service('RenameNotebook', [
    '$compile',
    'Notebooks',
    '$rootScope',
    function($compile, Notebooks, $rootScope) {
      return {
        openModal: function($scope, notebook) {
          scope = $scope.$new();
          scope.notebookNewName = notebook.name;

          scope.renameCancel = function() {
            scope.$destroy();
            $rootScope.$broadcast('closeModal');
          };

          scope.renameSave = function() {
            Notebooks.update({ id: notebook['public-id'], name: scope.notebookNewName }).then(function(updatedNotebook) {
              notebook.name = updatedNotebook.name;
              scope.$destroy();
              $rootScope.$broadcast('closeModal');
            }).catch(function(response) {
              scope.error = response.data.name[0];
            });
          };

          scope.$emit('openModal', $compile(templates.rename_notebook())(scope));
        }
      }
    }]);
})(window.bunsen);
