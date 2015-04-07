!(function(app) {

  app.factory('CategoriesFactory', ['Restangular', 'MarketplaceRestangular', function(Restangular, MR) {
    return {
      getCategories: function(queryParams) {
        return Restangular.all('categories').getList(queryParams);
      },
      getMarketPlaceCategories: function(params) {
        return MR.all('categories').getList(params);
      }
    };
  }]);

})(window.bunsen);
