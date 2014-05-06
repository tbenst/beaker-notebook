;(function(angular, app) {
  app.factory('NotebooksFactory', ["Restangular", '$window', '$location', function(Restangular, $window, $location) {
    var R = Restangular;

    function project(id) {
      return R.one('projects', id);
    }

    return {
      open: function(projectId, notebookName) {
        return R.all('open_notebooks').post({
          projectId: projectId,
          notebookName: notebookName
        });
      },

      close: function(projectId, notebookName) {
        return R.all('open_notebooks').remove({
          projectId: projectId,
          notebookName: notebookName
        });
      },

      getNotebook: function(projectId, name) {
        return project(projectId).one('notebooks', name).get();
      },

      getOpenNotebooks: function() {
        return R.all('open_notebooks').getList();
      },

      updateNotebook: function(projectId, attrs) {
        return project(projectId).all('notebooks').one(attrs.name).put(attrs);
      },

      createNotebook: function(projectId, attrs) {
        return project(projectId).all('notebooks').post(attrs);
      }
    };
  }]);
})(angular, window.bunsen);
