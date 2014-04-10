!(function(angular, app) {
  app.controller('project', ['$scope', '$state', 'Factories', function($scope, $state, Factories) {
    var F = Factories;
    $scope.editMode = false;

    F.Projects.getProject($state.params.id).then(function(d) {
      $scope.project = d;
      $scope.updatedAt = new Date(d.updated_at);
    });

    F.Notebooks.getNotebooks($state.params.id).then(function(notebooks) {
      $scope.notebooks = notebooks.list;
      $scope.numCommits = notebooks.numCommits;
      $scope.notebookUpdated = notebooks.lastUpdated;
    });

    $scope.$watch('updatedAt + notebookUpdated', function() {
      $scope.lastUpdated = new Date(Math.max($scope.updatedAt, $scope.notebookUpdated));
    });

    $scope.editProject = function() {
      $scope.editMode = true;
    };

    $scope.updateProject = function() {
      $scope.project.put().then(function() {
        $scope.editMode = false;
      });
    }

    $scope.deleteProject = function() {
      F.Projects.deleteProject($state.params.id).then(function() {
        // We have to make sure to delete the
        // project from the internal
        // scope project list.
        $scope.projects.list =  _.where($scope.projects.list, function(p) {
          return p.id !== +$state.params.id;
        });

        $state.go('projects.items');
      });
    };
  }]);
})(angular, window.bunsen);
