!(function(angular, app) {
  app.controller('project', ['$scope', 'Restangular', '$state', function($scope, Restangular, $state) {
    var R = Restangular;
    var project = R.one('users', window.userID).one('projects', $state.params.id);

    project.get().then(function(d) {
      $scope.project = d;
      $scope.updatedAt = new Date(d.updatedAt);
    });

    project.getList("notebooks").then(function(notebooks) {
      $scope.notebooks = notebooks;
      $scope.numCommits = _.reduce(notebooks, function(sum, notebook) {
        return sum + notebook.numCommits;
      }, 0);

      var updates = _.map(notebooks, function(notebook) {return new Date(notebook.lastModified)});
      $scope.notebookUpdated = Math.max.apply(null, updates);

    });

    $scope.$watch('updatedAt + notebookUpdated', function() {
      $scope.lastUpdated = new Date(Math.max($scope.updatedAt, $scope.notebookUpdated));
    });

  }]);
})(angular, window.bunsen);
