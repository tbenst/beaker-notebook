;(function(angular, app) {
  app.controller('copyNotebook', ['$scope', '$state', 'Factories', function($scope, $state, Factories) {
    var F = Factories;

    $scope.newNotebookName = $scope.publication.name;

    $scope.cancel = function() {
      $scope.$emit('closeModal');
    };

    $scope.copyNotebook = function() {
      F.Notebooks.createNotebook($scope.copyToProject['public-id'], {
        'publication-id': $scope.publication['public-id'],
        'name': $scope.newNotebookName})
      .then(function(notebook) {
        $scope.$emit('closeModal');
        $state.go('projects.items.item.notebook', {
          id: $scope.copyToProject['public-id'],
          notebook_id: notebook['public-id']
        });
        delete $scope.error;
      })
      .catch(function(response) {
        $scope.error = response.data.name[0];
      });
    };

    F.Projects.getProjects().then(function(projects) {
      $scope.projects = projects;
      $scope.copyToProject = projects[0];
    });
  }]);
})(angular, window.bunsen);
