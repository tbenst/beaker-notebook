!(function(app) {

  app.controller('projectsRoot', ['$scope', 'ProjectsFactory', function($scope, ProjectsFactory) {
    $scope.projects = {};

    $scope.$watch('projects.search', function(v) {
      if (v !== void(0)) {
        ProjectsFactory.getProjects($scope, v).then(function(d) {
          $scope.projects.list = d;
        });
      }
    });
  }]);

})(window.bunsen);
