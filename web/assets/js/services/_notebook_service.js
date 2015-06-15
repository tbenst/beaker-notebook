;(function(app) {
  app.service('Notebooks', function(
    $rootScope,
    $state,
    $window,
    $location,
    bkEvaluateJobManager,
    bkHelper,
    bkSession,
    bkSessionManager,
    Factories) {

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      if (toState.name == "projects.items.item.notebook"
          && bkHelper !== void 0
          && bkSessionManager.getSessionId()
          && bkSessionManager.getSessionId() !== toParams.notebook_id
          && bkEvaluateJobManager.isAnyInProgress()) {
        event.preventDefault();
        return bkHelper.show2ButtonModal(
          "Switching notebooks; all running and pending cells will be cancelled.",
          "Warning!",
          function() {
            bkEvaluateJobManager.cancelAll().then(function() {
              $state.go(toState, toParams);
            });
          });
      }
    });

    function leaveActiveSession() {
      var notebookId = bkSessionManager.getSessionId();
      bkSessionManager.close().then(function() {
        return markNotebookClosed(notebookId);
      }).then(function() {
        $rootScope.$broadcast('activeNotebookClosed');
        if ($state.is("projects.items.item.notebook")
            && $state.params.notebook_id == notebookId) {
          $state.go('projects.items.item', {id: $state.params.id});
        }
      });
    }

    function markNotebookClosed(notebookId) {
      return Factories.Notebooks.update({id: notebookId, open: false})
        .then(function(notebook) {
          $rootScope.$broadcast('notebookUpdated', notebook);
          return notebook;
        }.bind(this));
    }

    return {
      create: function(projectId, attrs) {
        return Factories.Notebooks.createNotebook(projectId, attrs)
          .then(function(notebook) {
            $state.go('projects.items.item.notebook', { notebook_id: notebook['public-id'] });
          }, function(response) {
            $window.alert("Error attempting to create notebook.");
          });
      },

      update: function(attrs) {
        return Factories.Notebooks.update(attrs).then(function(notebook) {
          $rootScope.$broadcast('notebookUpdated', notebook);
          return notebook;
        }.bind(this));
      },

      closeNotebook: function(notebook) {
        // Does this notebook happen to be the currently active
        // notebook that beaker is managing?
        if (notebook['public-id'] == bkSessionManager.getSessionId()) {
          if (bkSessionManager.isNotebookModelEdited()) {
            return bkHelper.show3ButtonModal(
              "Do you want to save " + notebook.name + "?",
              "Confirm close",
              function() {
                bkHelper.saveNotebook().then(leaveActiveSession);
              },
              leaveActiveSession,
              null, "Save", "Don't save");
          }
          else {
            leaveActiveSession();
          }
        }
        else {
          bkSession.close(notebook['public-id']);
          return markNotebookClosed(notebook['public-id']);
        }
      },

      export: function(notebookId) {
        return Factories.Notebooks.getNotebook(notebookId)
        .then(function(notebook) {
          var anchor = document.createElement('a');
          var clickEvent = new MouseEvent('click');
          var filename = notebook.name + '.bkr';
          anchor.download = filename.split(' ').join('_');
          anchor.href = "data:text/richtext;," + notebook.contents;
          anchor.dispatchEvent(clickEvent);
        });
      },

      destroy: function(notebookId) {
        return Factories.Notebooks.destroy(notebookId).then(function() {
          if (notebookId == bkSessionManager.getSessionId()) {
            bkSessionManager.close();
          }
          return $rootScope.$broadcast('notebookDeleted', notebookId);
        }.bind(this));
      }
    }
  });
})(window.bunsen);
