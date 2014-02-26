!(function(angular, app) {
  app.controller('marketPlace', ['$scope', 'Restangular', function($scope, Restangular) {
    Restangular.one('data_sets').getList().then(function(d) {
      $scope.data = d;
    });
  }]);
})(angular, window.bunsen);
