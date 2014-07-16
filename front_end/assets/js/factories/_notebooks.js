;(function(angular, app) {
  app.factory('NotebooksFactory', ["Restangular", '$window', '$location', function(Restangular, $window, $location) {
    var R = Restangular;

    function project(id) {
      return R.one('projects', id);
    }

    return {
      getNotebook: function(notebookId) {
        return R.one('notebooks', notebookId).get();
      },

      getNotebooks: function() {
        return R.all('notebooks').getList();
      },

      update: function(attrs) {
        return R.one('notebooks', attrs.id).customPUT(attrs);
      },

      destroy: function(id) {
        return R.one('notebooks', id).remove();
      },

      createNotebook: function(projectId, attrs) {
        return project(projectId).all('notebooks').post(attrs);
      }
    };
  }]);
})(angular, window.bunsen);
