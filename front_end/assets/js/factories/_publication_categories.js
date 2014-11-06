;(function(app) {
  app.factory('PublicationCategoriesFactory', ['Restangular', function(Restangular) {
    return {
      getAll: function() {
        return Restangular.all('publication_categories').getList();
      },
      getCategory: function(id) {
        return Restangular.one('publication_categories', id).get();
      }
    }
  }]);
})(window.bunsen);
