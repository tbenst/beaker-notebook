!(function(angular, app) {
  app.controller('notebook', ['$scope', '$state', 'Factories', function($scope, $state, Factories) {
    var F = Factories;

    $scope.projects.search = '';
    $scope.projects.list = [];

    F.Projects.getProject($state.params.id).then(function(project) {
      $scope.project = project;
    });

    F.Notebooks.getNotebook($state.params.id, $state.params.name).then(function(notebook) {
      $scope.notebook = notebook;
    });
  }]);
})(angular, window.bunsen);
