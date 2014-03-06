!(function(angular, app) {
  app.controller('project', ['$scope', 'Restangular', '$state', function($scope, Restangular, $state) {
    var R = Restangular;

    R.one('users', window.userID)
      .one('projects', $state.params.id)
      .get().then(function(d) {
        $scope.project = d;
      });
  }]);
})(angular, window.bunsen);
