;(function(app) {
  app.factory('MarketplaceFactory', [
    'MarketplaceRestangular',
    function(
      MarketplaceRestangular) {
      return {
        getCatalogs: function() {
          return MarketplaceRestangular.all('indices').getList();
        }
      };
    }]);
})(window.bunsen);
