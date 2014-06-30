;(function(app) {
  app.controller('subscriptionsRoot', ['$scope', 'Factories', function($scope, Factories) {
    var F = Factories;

    F.Subscriptions.getSubscriptions().then(function(subscriptions) {
      $scope.subscriptions = subscriptions;
    });
  }]);
})(window.bunsen);
