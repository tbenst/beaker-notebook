;(function(angular, app) {
  app.factory('SubscriptionsFactory', ['Restangular', function(Restangular) {
    var R = Restangular;

    return {
      getSubscriptions: function() {
        return R.all('subscriptions').getList();
      },
    };
  }]);
})(angular, window.bunsen);
