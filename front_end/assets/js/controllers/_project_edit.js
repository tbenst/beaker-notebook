!(function(angular, app) {
  app.controller('projectEdit', ['$scope', '$state', 'Factories', function($scope, $state, Factories) {
    var F = Factories;

    F.Projects.getProject($state.params.id).then(function(d) {
      $scope.project = d;
    });

    $scope.updateProject = function() {
      $scope.project.put().then(function() {
        $state.go("projects.items.item", {id: $scope.project.id});
      });
     }

    $scope.deleteProject = function() {
      F.Projects.deleteProject($state.params.id).then(function() {
        $state.go('projects.items');
      });
    };
  }]);
})(angular, window.bunsen);
