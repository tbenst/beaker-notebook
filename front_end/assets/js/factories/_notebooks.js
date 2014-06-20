;(function(angular, app) {
  app.factory('NotebooksFactory', ["Restangular", '$window', '$location', function(Restangular, $window, $location) {
    var R = Restangular;

    function project(id) {
      return R.one('projects', id);
    }

    return {
      open: function(notebookId) {
        return R.all('open_notebook').post({
          notebookId: notebookId
        });
      },

      close: function(notebookId) {
        return R.all('open_notebook').remove({
          notebookId: notebookId
        });
      },

      getNotebook: function(notebookId) {
        return R.one('notebooks', notebookId).get();
      },

      getOpenNotebooks: function() {
        return R.all('open_notebooks').getList();
      },

      getRecentNotebooks: function() {
        return R.all('recent_notebooks').getList();
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
