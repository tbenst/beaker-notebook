!(function(app) {

  app.factory('CategoriesFactory', ['Restangular', function(Restangular) {
    return {
      getCategories: function(queryParams) {
        return Restangular.all('categories').getList(queryParams);
      }
    }
  }]);

})(window.bunsen);
