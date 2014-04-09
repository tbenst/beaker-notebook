;(function(angular, app) {
  app.controller('projects', ['$scope', 'Factories', function($scope, Factories) {
    delete $scope.projects.search;
  }]);
})(angular, window.bunsen);
