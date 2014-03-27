!(function(app) {

  app.factory('CategoriesFactory', function(Restangular) {
    return Restangular.one('categories').getList();
  });

})(window.bunsen);
