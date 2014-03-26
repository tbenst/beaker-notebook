!(function(angular, app) {
  app.controller('notebook', ['$scope', 'Restangular', '$state', function($scope, Restangular, $state) {
    var R = Restangular;
    var project = R.one('users', window.userID).one('projects', $state.params.id);
    var notebook = project.one('notebooks', $state.params.name);

    project.get().then(function(project) {
      $scope.project = project;
    });

    notebook.get().then(function(notebook) {
      $scope.notebook = notebook;
    });
  }]);
})(angular, window.bunsen);
