!(function(app) {

  app.controller('projectsRoot', ['$scope', 'ProjectsFactory', function($scope, ProjectsFactory) {
    $scope.projects = {};

  }]);
})(window.bunsen);
