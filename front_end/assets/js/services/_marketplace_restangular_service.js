;(function(app) {
  app.service('MarketplaceRestangular', [
    'Restangular',
    function(R) {
      return R.withConfig(function(config) {
        config.setBaseUrl('api/v1');
      });
    }]);
})(window.bunsen);
