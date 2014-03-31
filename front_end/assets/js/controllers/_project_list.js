;(function(angular, app) {
  app.controller('projectsList', ['$scope', 'Factories', function($scope, Factories) {
    var F = Factories;

    F.Projects.getProjects($scope).then(function(d) {
      $scope.projects.list = d;
    });
  }]);
})(angular, window.bunsen);
