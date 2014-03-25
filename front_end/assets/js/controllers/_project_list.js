;(function(angular, app) {
  app.controller('projectsList', ['$scope', 'ProjectsFactory', function($scope, ProjectsFactory) {
    ProjectsFactory.getProjects($scope).then(function(d) {
      $scope.projects.list = d;
    });

    $scope.$watch('projectSearch', function(v) {
      if (v !== void(0)) {
        ProjectsFactory.getProjects($scope, v).then(function(d) {
          $scope.projects.list = d;
        });
      }
    });
  }]);
})(angular, window.bunsen);
