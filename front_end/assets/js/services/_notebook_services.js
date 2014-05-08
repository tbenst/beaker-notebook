;(function(app) {
  app.service('Notebooks', function($rootScope) {
    return {
      setOpenNotebooks: function(open) {
        this.openNotebooks = open;
        $rootScope.$broadcast("openNotebookChange");
        return this.openNotebooks;
      },

      getOpenNotebooks: function() {
        return this.openNotebooks;
      },

      setRecentNotebooks: function(recent) {
        this.recentNotebooks = recent;
        $rootScope.$broadcast("recentNotebookChange");
        return this.recentNotebooks;
      },

      getRecentNotebooks: function() {
        return this.recentNotebooks;
      }
    }
  });
})(window.bunsen);
