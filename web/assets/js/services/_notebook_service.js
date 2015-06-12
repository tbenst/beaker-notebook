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

    function getIFrame(notebookId) {
      return document.getElementById('beaker-frame-' + notebookId);
    }

    function saveNotebook(data) {
      var createNotebook = _.partial(Factories.Notebooks.createNotebook, data.projectId);
      var saveFunction = data.operation == 'create' ?
        createNotebook : Factories.Notebooks.update;
      saveFunction(data.notebook).
        then(function(notebook) {
          $rootScope.$broadcast('window-message-notebook-'+data.operation, notebook);
        }, function(response) {
          $window.alert("Error attempting to " + data.operation + " notebook.");
        });
    };

    function removeIFrame(frame) {
      frame.parentNode.removeChild(frame);
    }

    function resizeIframe(frame, height) {
      angular.element(frame).attr('height', height);
    };

    function receiveWindowMessage(e) {
      if (new URL(e.origin).hostname !== $location.host()) {
        throw "message received from unauthorized host " + e.origin.host;
      }
      if (e.data.operation == 'close') return removeIFrame(e.source.frameElement);
      if (e.data.operation == 'resize') return resizeIframe(e.source.frameElement, e.data.height);
      if (!e.data.notebook) return; // could be a message for a different purpose
      saveNotebook(e.data);
    }
    $window.addEventListener('message', receiveWindowMessage, false);

    var sendToIFrame = function(notebookId, payload) {
      var uiUrl = $location.absUrl().split("#")[0];
      getIFrame(notebookId).contentWindow.postMessage(payload, uiUrl);
    }

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
      sendToIFrame: sendToIFrame,

      create: function(projectId, attrs) {
        return Factories.Notebooks.createNotebook(projectId, attrs)
          .then(function(notebook) {
            $state.go('projects.items.item.notebook', { notebook_id: notebook['public-id'] });
          }, function(response) {
            $window.alert("Error attempting to create notebook.");
          });
      },

      save: function(notebookId, newName) {
        var data = { action: 'save' };
        if (newName) {
          data.name = newName;
        }

        sendToIFrame(notebookId, data);
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
