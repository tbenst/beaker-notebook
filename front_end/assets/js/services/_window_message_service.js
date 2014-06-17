;(function(app) {
  app.service('WindowMessageService', ['$window', '$location', 'Factories', function($window, $location, Factories) {

    var F = Factories;
    var saveNotebookCallbacks = {};

    function saveNotebook(data) {
      var createNotebook = _.partial(F.Notebooks.createNotebook, data.projectId);
      var saveFunction = data.operation == 'create' ?
        createNotebook : F.Notebooks.update;
      saveFunction(data.notebook).
        then(function(notebook) {
          var callbacks = saveNotebookCallbacks[data.projectId] || []
          _.each(callbacks, function(cb) { cb(notebook); });
        }, function(response) {
          $window.alert("Error attempting to " + data.operation + " notebook.");
        });
    };

    function receiveWindowMessage(e) {
      if (new URL(event.origin).hostname !== $location.host()) {
        throw "message received from unauthorized host " + event.origin.host;
      }
      if (!e.data.notebook) return; // could be a message for a different purpose
      saveNotebook(e.data);
    }

    $window.addEventListener('message', receiveWindowMessage, false);

    return {
      addNotebookCallback: function(projectId, cb) {
        saveNotebookCallbacks[projectId] = saveNotebookCallbacks[projectId] || [];
        saveNotebookCallbacks[projectId].push(cb);
      }
    };
  }]);
})(window.bunsen);
