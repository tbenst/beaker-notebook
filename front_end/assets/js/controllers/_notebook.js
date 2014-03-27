!(function(angular, app) {
  app.controller('notebook', ['$scope', 'Restangular', '$state', 'NotebooksFactory', function($scope, Restangular, $state, NotebooksFactory) {
    var R = Restangular;
    var project = R.one('users', window.userID).one('projects', $state.params.id);
    var notebook = project.one('notebooks', $state.params.name);

    $scope.projects.search = '';
    $scope.projects.list = [];

    project.get().then(function(project) {
      $scope.project = project;
    });

    NotebooksFactory.getNotebook($state.params.id, $state.params.name).then(function(notebook) {
      $scope.notebook = notebook;
    });
  }]);
})(angular, window.bunsen);
