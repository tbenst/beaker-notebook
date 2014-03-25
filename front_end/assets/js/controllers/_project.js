!(function(angular, app) {
  app.controller('project', ['$scope', 'Restangular', '$state', function($scope, Restangular, $state) {
    var R = Restangular;
    var project = R.one('users', window.userID).one('projects', $state.params.id);

    project.get().then(function(d) {
      $scope.project = d;
    });

    project.getList("notebooks").then(function(notebooks) {
      $scope.notebooks = notebooks;
    });

  }]);
})(angular, window.bunsen);
