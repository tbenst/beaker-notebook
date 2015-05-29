;(function(app) {
  app.factory('PublicationCategoriesFactory', ['NotebookRestangular', function(R) {
    return {
      getAll: function() {
        return R.all('categories').getList();
      },
      getCategory: function(id) {
        return R.one('categories', id).get();
      }
    }
  }]);
})(window.bunsen);
