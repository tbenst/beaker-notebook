;(function(app) {
  app.factory('MarketplaceFactory', [
    'MarketplaceRestangular',
    function(
      MarketplaceRestangular) {
      return {
        getCatalogs: function() {
          return MarketplaceRestangular.all('catalogs').getList();
        }
      };
    }]);
})(window.bunsen);
