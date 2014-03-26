;(function(angular, app) {
  app.controller('projectsList', ['$scope', 'ProjectsFactory', function($scope, ProjectsFactory) {
    ProjectsFactory.getProjects($scope).then(function(d) {
      $scope.projects.list = d;
    });
  }]);
})(angular, window.bunsen);
