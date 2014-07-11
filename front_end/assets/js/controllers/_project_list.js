;(function(angular, app) {
  app.controller('projectsList', ['$scope', 'Factories', function($scope, Factories) {
    var F = Factories;

    $scope.createProject = function() {
      F.Projects.createProject($scope.projects.list);
    };
  }]);
})(angular, window.bunsen);
