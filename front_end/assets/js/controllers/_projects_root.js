!(function(app) {

  app.controller('projectsRoot', ['$scope', 'Factories', '$state', function($scope, Factories, $state) {
    var F = Factories;

    $scope.projects = {};

    $scope.$watch('projects.search', function(v) {
      if (v !== void(0) && v !== '') {
        if (!$state.includes('**.search')) {
          $state.go($state.current.name + '.search');
        }
        F.Projects.getProjects($scope, v).then(function(d) {
          $scope.projects.searchResults = d;
        });
      } else if (!$state.is('projects.items') && !$state.is('projects.items.item')) {
        // Empty search term, go back to the parent state
        $state.go('^');
      }
    });
  }]);

})(window.bunsen);
