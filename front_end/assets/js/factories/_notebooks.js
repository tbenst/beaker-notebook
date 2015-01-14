;(function(angular, app) {
  app.factory('NotebooksFactory', [
    "Restangular",
    '$window',
    '$location',
    function(
      Restangular,
      $window,
      $location) {

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

        getOpened: function() {
          return R.all('notebooks').getList({opened: true});
        },

        update: function(attrs) {
          return R.one('notebooks', attrs.id).customPUT(attrs);
        },

        publish: function(attrs) {
          return R.all('publications').post(attrs);
        },

        updatePublication: function(attrs) {
          return R.one('publications', attrs.id).customPUT(attrs);
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
