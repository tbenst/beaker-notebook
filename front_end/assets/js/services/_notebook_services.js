;(function(app) {
  app.service('Notebooks', function($rootScope, Factories) {
    function setOpenNotebooks(open) {
      this.openNotebooks = open;
      $rootScope.$broadcast("openNotebookChange");
      return this.openNotebooks;
    }

    function setRecentNotebooks(recent) {
      this.recentNotebooks = recent;
      $rootScope.$broadcast("recentNotebookChange");
      return this.recentNotebooks;
    }

    return {
      setOpenNotebooks: setOpenNotebooks,

      setRecentNotebooks: setRecentNotebooks,

      getOpenNotebooks: function() {
        return this.openNotebooks;
      },

      getRecentNotebooks: function() {
        return this.recentNotebooks;
      },

      },

      closeNotebook: function(notebookId) {
        Factories.Notebooks.close(notebookId).then(function(openNotebooks) {
          setOpenNotebooks.bind(this)(openNotebooks);
          if (frame = document.querySelector("#beaker-frame-"+notebookId)) {
            document.body.removeChild(frame);
          }
        }.bind(this));
      },
    }
  });
})(window.bunsen);
