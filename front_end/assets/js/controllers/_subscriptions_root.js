;(function(app) {
  app.controller('subscriptionsRoot', ['$scope', 'Factories', function($scope, Factories) {
    var F = Factories;

    $scope.toggleSort = function(field, descending) {
      if ($scope.sort == 'dataSet.metadata.title') {
        $scope.sort = field;
        $scope.sortDescending = descending;
      } else {
        $scope.sort = 'dataSet.metadata.title';
        $scope.sortDescending = false;
      }
    };

    F.Subscriptions.getSubscriptions().then(function(subscriptions) {
      $scope.subscriptions = subscriptions;
    });

    $scope.sort = 'dataSet.metadata.title';
    $scope.sortDescending = false;
  }]);
})(window.bunsen);
