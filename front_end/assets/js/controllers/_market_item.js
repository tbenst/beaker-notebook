!(function(angular, app) {
  app.controller('marketItem', ['$scope', 'Restangular', '$state', function($scope, Restangular, $state) {
    var R = Restangular;
    R.one('data_sets', $state.params.id).get().then(function(d) {
      $scope.item = d;
      $scope.subscribed = !!(_.findWhere(d.users, {id: window.userID}));
    });

    $scope.unsubscribe = function() {
      R.one('users', window.userID)
       .one('subscriptions', $state.params.id).remove().then(function(d) {
        $scope.subscribed = false;
       });
    }

    $scope.subscribe = function() {
      R.one('users', window.userID)
       .one('subscriptions', $state.params.id).put().then(function(d) {
        $scope.subscribed = true;
       });
    }
  }]);
})(angular, window.bunsen);
