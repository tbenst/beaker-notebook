;(function(angular, app) {
  app.controller('closeNotebook', [
    '$scope',
    'Notebooks',
    '$rootScope',
    function(
      $scope,
      Notebooks,
      $rootScope) {

    $scope.closeWithoutSaving = function() {
      Notebooks.closeNotebook($scope.notebookId)
      .then(function() {
        $rootScope.$broadcast('closeModal');
      })
    };
  }]);
})(angular, window.bunsen);
