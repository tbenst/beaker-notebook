!(function(app) {

  app.factory('CategoriesFactory', ['Restangular', function(Restangular) {
    return {
      getCategories: function() {
        return Restangular.one('categories').getList();
      }
    }
  }]);

})(window.bunsen);
