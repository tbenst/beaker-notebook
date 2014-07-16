;(function(app) {
  app.service('Notebooks', function($rootScope, $state, Factories) {
    function closeIfOpen(notebookId) {
      if (frame = document.querySelector("#beaker-frame-"+notebookId)) {
        frame.parentNode.removeChild(frame);
      }
      if ($state.is("projects.items.item.notebook") && $state.params.notebook_id == notebookId) {
        $state.go('projects.items.item', {id: $state.params.id});
      }
    }

    return {
      update: function(attrs) {
        return Factories.Notebooks.update(attrs).then(function(notebook) {
          $rootScope.$broadcast('notebookUpdated', notebook);
          return notebook;
        }.bind(this));
      },

      closeNotebook: function(notebookId) {
        return Factories.Notebooks.update({id: notebookId, open: false}).then(function(notebook) {
          closeIfOpen(notebookId);
          $rootScope.$broadcast('notebookUpdated', notebook);
          return notebook;
        }.bind(this));
      },

      destroy: function(notebookId) {
        return Factories.Notebooks.destroy(notebookId).then(function(notebook) {
          closeIfOpen(notebookId);
          $rootScope.$broadcast('notebookDeleted', notebookId);
          return notebook;
        }.bind(this));
      }
    }
  });
})(window.bunsen);
