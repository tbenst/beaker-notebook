;(function(app) {
  app.factory('PublicationCategoriesFactory', ['Restangular', function(Restangular) {
    return {
      getAll: function() {
        return Restangular.all('categories').getList();
      },
      getCategory: function(id) {
        return Restangular.one('categories', id).get();
      }
    }
  }]);
})(window.bunsen);
