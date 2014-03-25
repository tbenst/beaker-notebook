;(function(angular, app) {
  app.controller('projects', ['$scope', 'ProjectsFactory', function($scope, ProjectsFactory) {
    $scope.createProject = function() {
      ProjectsFactory.createProject($scope.projects.list);
    };
  }]);
})(angular, window.bunsen);
