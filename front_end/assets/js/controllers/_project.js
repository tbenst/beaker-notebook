!(function(angular, app) {
  app.controller('project', ['$scope', 'Restangular', '$state', 'NotebooksFactory', function($scope, Restangular, $state, NotebooksFactory) {
    var R = Restangular;
    var project = R.one('users', window.userID).one('projects', $state.params.id);

    project.get().then(function(d) {
      $scope.project = d;
      $scope.updatedAt = new Date(d.updatedAt);
    });

    NotebooksFactory.getNotebooks($state.params.id).then(function(notebooks) {
      $scope.notebooks = notebooks.list;
      $scope.numCommits = notebooks.numCommits;
      $scope.notebookUpdated = notebooks.lastUpdated;
    });

    $scope.$watch('updatedAt + notebookUpdated', function() {
      $scope.lastUpdated = new Date(Math.max($scope.updatedAt, $scope.notebookUpdated));
    });

  }]);
})(angular, window.bunsen);
