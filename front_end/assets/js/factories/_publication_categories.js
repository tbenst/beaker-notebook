;(function(app) {
  app.factory('PublicationCategoriesFactory', ['Restangular', function(Restangular) {
    return {
      getAll: function() {
        return Restangular.all('publication_categories').getList();
      }
    }
  }]);
})(window.bunsen);
