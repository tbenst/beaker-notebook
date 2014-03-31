!(function(app) {

  app.controller('projectsRoot', ['$scope', 'Factories', function($scope, Factories) {
    var F = Factories;

    $scope.projects = {};

    $scope.$watch('projects.search', function(v) {
      if (v !== void(0)) {
        F.Projects.getProjects($scope, v).then(function(d) {
          $scope.projects.list = d;
        });
      }
    });
  }]);

})(window.bunsen);
