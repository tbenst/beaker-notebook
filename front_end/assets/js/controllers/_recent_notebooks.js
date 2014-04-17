;(function(angular, app) {
  app.controller('recentNotebooks', ['$scope', 'Factories', function($scope, Factories) {
    Factories.RecentNotebooks.get().then(function(d) {
      $scope.$parent.recentNotebooks = d;
    });
  }]);
})(angular, window.bunsen);
