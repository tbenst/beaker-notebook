!(function(angular, app) {
  app.controller('projects', ['$scope', 'Restangular', function($scope, Restangular) {
    var R = Restangular;

    $scope.createProject = function() {
      R.one('users', window.userID)
        .all('projects').post({
          name: "sample project " + Math.random()
        })
        .then(function(p) {
          $scope.projects.push(p);
        });
    };
  }]);
})(angular, window.bunsen);
