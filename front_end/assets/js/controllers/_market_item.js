!(function(angular, app) {
  app.controller('marketItem', ['$scope', 'Restangular', '$state', function($scope, Restangular, $state) {
    Restangular.one('data_sets', $state.params.id).get().then(function(d) {
      $scope.item = d;
    });
  }]);
})(angular, window.bunsen);
