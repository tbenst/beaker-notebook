;(function(angular, app) {
  app.controller('closeNotebook', [
    '$scope',
    'Notebooks',
    '$rootScope',
    'Notebooks',
    function(
      $scope,
      Notebooks,
      $rootScope,
      Notebooks) {

    $scope.closeWithoutSaving = function() {
      Notebooks.closeNotebook($scope.notebookId)
      .then(function() {
        $rootScope.$broadcast('closeModal');
      })
    };

    $scope.saveAndClose = function() {
      Notebooks.save($scope.notebookId);
      Notebooks.closeNotebook($scope.notebookId)
      .then(function() {
        $rootScope.$broadcast('closeModal');
      })
    };
  }]);
})(angular, window.bunsen);
