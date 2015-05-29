;(function(angular, app) {
  app.factory('SubscriptionsFactory', ['MarketplaceRestangular', function(MR) {
    return {
      getSubscriptions: function() {
        return MR.all('subscriptions').getList()
        .then(function(results) {
          return results.data;
        });
      },
    };
  }]);
})(angular, window.bunsen);
