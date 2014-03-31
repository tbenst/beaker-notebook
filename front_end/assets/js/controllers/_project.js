!(function(angular, app) {
  app.controller('project', ['$scope', '$state', 'Factories', function($scope, $state, Factories) {
    var F = Factories;

    F.Projects.getProject($state.params.id).then(function(d) {
      $scope.project = d;
      $scope.updatedAt = new Date(d.updatedAt);
    });

    F.Notebooks.getNotebooks($state.params.id).then(function(notebooks) {
      $scope.notebooks = notebooks.list;
      $scope.numCommits = notebooks.numCommits;
      $scope.notebookUpdated = notebooks.lastUpdated;
    });

    $scope.$watch('updatedAt + notebookUpdated', function() {
      $scope.lastUpdated = new Date(Math.max($scope.updatedAt, $scope.notebookUpdated));
    });

  }]);
})(angular, window.bunsen);
