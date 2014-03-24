;(function(angular, app) {
  app.controller('projectsList', ['$scope', 'Restangular', function($scope, Restangular) {
    var R = Restangular;

    R.one('users', window.userID)
     .getList('projects')
     .then(function(d) {
        $scope.projects = d;
      });
  }]);
})(angular, window.bunsen);
