;(function(app) {
  app.service('MarketplaceRestangular', [
    'Restangular',
    function(R) {
      return R.withConfig(function(config) {
        config.setBaseUrl('marketplace/v1');
        config.setFullResponse(true);
      });
    }]);
})(window.bunsen);
