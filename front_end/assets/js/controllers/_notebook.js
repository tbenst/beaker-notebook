!(function(angular, app) {
  app.controller('notebook', ['$scope', '$state', 'NotebooksFactory', 'ProjectsFactory', function($scope, $state, NotebooksFactory, ProjectsFactory) {
    $scope.projects.search = '';
    $scope.projects.list = [];

    ProjectsFactory.getProject($state.params.id).then(function(project) {
      $scope.project = project;
    });

    NotebooksFactory.getNotebook($state.params.id, $state.params.name).then(function(notebook) {
      $scope.notebook = notebook;
    });
  }]);
})(angular, window.bunsen);
