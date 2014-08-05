;(function(angular, app) {
  app.controller('copyNotebook', ['$scope', '$state', 'Factories', function($scope, $state, Factories) {
    var F = Factories;

    $scope.newNotebookName = $scope.publication.notebook.name;

    $scope.cancel = function() {
      $scope.$emit('closeModal');
    };

    $scope.copyNotebook = function() {
      F.Publications.copy($scope.publication.id, { projectId: $scope.copyToProject.id, name: $scope.newNotebookName }).then(function(notebook) {
        $scope.$emit('closeModal');
        $state.go('projects.items.item.notebook', { id: notebook.projectId, notebook_id: notebook.id });
        delete $scope.error;
      })
      .catch(function(response) {
        $scope.error = response.data.error;
      });
    };

    F.Projects.getProjects().then(function(projects) {
      $scope.projects = projects;
      $scope.copyToProject = projects[0];
    });
  }]);
})(angular, window.bunsen);
