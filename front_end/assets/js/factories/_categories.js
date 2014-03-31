!(function(app) {

  app.factory('CategoriesFactory', ['Restangular', function(Restangular) {
    return Restangular.one('categories').getList();
  }]);

})(window.bunsen);
