;(function(angular, app) {
  app.controller('projectsList', ['$scope', '$state', 'Factories', function($scope, $state, Factories) {
    var F = Factories;

    $scope.createProject = function() {
      F.Projects.createProject($scope.projects.list)
      .then(function(p) {
        $state.go('projects.items.item', { id: p.id});
      });
    };

    //We can replace this function with '$state.includes('projects.items.item', {id: project.id})' in the view
    //when ui-router v0.3 is released
    $scope.isCurrent = function (projectId) {
      return $state.includes('projects.items.item') && $state.params.id == projectId;
    };

  }]);
})(angular, window.bunsen);
