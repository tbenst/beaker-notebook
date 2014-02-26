!(function(angular, app) {
  app.controller('project', ['$scope', 'Restangular', '$state', function($scope, Restangular, $state) {
    var R = Restangular;

    R.one('users', 1)
      .one('projects', $state.params.id)
      .get().then(function(d) {
        $scope.project = d;
      });

    $scope.deleteProject = function() {
      R.one('users', 1)
       .one('projects', $state.params.id)
       .remove().then(function() {
          $state.go('projects');
       });
    };
  }]);
})(angular, window.bunsen);
