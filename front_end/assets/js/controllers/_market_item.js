!(function(angular, app) {
  app.controller('marketItem', ['$scope', '$rootScope', '$state', 'Factories', 'Restangular', '$sessionStorage', function($scope, $rootScope, $state, Factories, Restangular, $sessionStorage) {
    var R = Restangular;
    var F = Factories;

    $scope.item = {};

    F.DataSets.getDataSet($state.params.id).then(function(d) {
      $scope.item = d;
      $scope.subscribed = !!(_.findWhere(d.users, {id: $sessionStorage.currentUser.id}));
    });

    F.Vendors.getVendors().then(function(v) {
      $scope.marketPlace.vendors = v;
    });

    if (_.contains($rootScope.referrer.fromState.name, 'subscriptions')) {
      $scope.referrerList = 'subscriptions.items';
    } else {
      $scope.referrerList = 'marketPlace.items';
    }

    $scope.unsubscribe = function() {
       R.one('subscriptions', $state.params.id).remove().then(function(d) {
        $scope.subscribed = false;
       });
    }

    $scope.subscribe = function() {
       R.one('subscriptions', $state.params.id).put().then(function(d) {
        $scope.subscribed = true;
       });
    }
  }]);
})(angular, window.bunsen);
