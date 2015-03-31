;(function(angular, app) {
  app.controller('projectsList', ['$scope', '$state', 'Factories', function($scope, $state, Factories) {
    var F = Factories;

    $scope.createProject = function() {
      F.Projects.createProject($scope.projects.list)
      .then(function(p) {
        $state.go('projects.items.item', { id: p.id});
      });
    };
  }]);
})(angular, window.bunsen);
