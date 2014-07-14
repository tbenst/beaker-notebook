;(function(angular, app) {
  app.controller('projectsList', ['$scope', 'Factories', function($scope, Factories) {
    var F = Factories;

    F.Projects.getProjects($scope).then(function(d) {
      $scope.projects.list = d;
    });

    $scope.createProject = function() {
      F.Projects.createProject($scope.projects.list);
    };
  }]);
})(angular, window.bunsen);
