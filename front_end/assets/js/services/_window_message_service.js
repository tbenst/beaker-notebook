;(function(app) {
  app.service('WindowMessageService', ['$window', '$location', '$rootScope', 'Factories', function($window, $location, $rootScope, Factories) {
    var F = Factories;

    function saveNotebook(data) {
      var createNotebook = _.partial(F.Notebooks.createNotebook, data.projectId);
      var saveFunction = data.operation == 'create' ?
        createNotebook : F.Notebooks.update;
      saveFunction(data.notebook).
        then(function(notebook) {
          $rootScope.$broadcast('window-message-notebook-'+data.operation, notebook);
        }, function(response) {
          $window.alert("Error attempting to " + data.operation + " notebook.");
        });
    };

    function resizeIframe(data) {
      var iframe = document.getElementById('beaker-frame-' + data.notebookId);
      angular.element(iframe).attr('height', data.height);
    };

    function setNotebookEdited(data) {
      $rootScope.$broadcast('notebook-edited', data);
    };

    function receiveWindowMessage(e) {
      if (new URL(e.origin).hostname !== $location.host()) {
        throw "message received from unauthorized host " + e.origin.host;
      }
      if (e.data.operation == 'resize') return resizeIframe(e.data);
      if (e.data.operation == 'edited') return setNotebookEdited(e.data);
      if (!e.data.notebook) return; // could be a message for a different purpose
      saveNotebook(e.data);
    }

    function sendToIFrame(contentWindow, data) {
      var uiUrl = $location.absUrl().split("#")[0];

      contentWindow.postMessage(data, uiUrl);
    }

    $window.addEventListener('message', receiveWindowMessage, false);

    return { sendToIFrame: sendToIFrame };
  }]);
})(window.bunsen);
