;(function(app) {
  app.factory('RecentNotebooksFactory', ["Restangular", function(Restangular) {
    var R = Restangular;

    return {
      get: function() {
        return R.all("recent_notebooks").getList();
      },

      add: function(key) {
        return R.all("recent_notebooks").post({viewing: key});
      }
    }
  }])
}(window.bunsen));
