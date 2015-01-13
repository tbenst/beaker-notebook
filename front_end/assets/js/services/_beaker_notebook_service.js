;(function(app) {
  app.service('BeakerNotebookService', [
    '$location',
    'UrlGeneratorService',
    'Restangular',
    '$rootScope',
    'Beaker',
    '$sce',
    '$q',
    function(
      $location,
      UrlGeneratorService,
      Restangular,
      $rootScope,
      Beaker,
      $sce,
      $q) {
    return {
      getFrameMeta: function(notebook) {
        return {
          id: notebook.id,
          location: notebook.location,
          frameId: 'beaker-frame-' + notebook.id,
          frameSelector: '#beaker-frame-' + notebook.id,
          frame: document.querySelector('#beaker-frame-' + notebook.id)
        };
      },
      renderFrame: function(notebook, height, hide) {
        var meta   = this.getFrameMeta(notebook);
        var cached = meta.frame;
        meta.height = height;
        meta.hide = hide;

        if (cached && !hide) {
          cached.style.display = "block";
        } else {
          document.getElementById('beaker-container')
            .insertAdjacentHTML('beforeend', templates.notebook_iframe(meta));
        }
      },
      hideFrame: function(notebook) {
        var frame = this.getFrameMeta(notebook).frame;
        if (frame) {
          frame.style.display = "none";
        }
      },
      loadOpened: function(notebooks) {
        var self = this;

        return Beaker.whenReady().then(function(url) {
          _.each(notebooks, function(notebook) {
            notebook.location = $sce.trustAsResourceUrl(self.notebookLocation(url, notebook.projectId, notebook.id));
            $rootScope.cachedNotebooks[notebook.id] = notebook;
            self.renderFrame(notebook, 1000, true);
          });
        });
      },
      notebookLocation: function(url, projectId, notebookId) {
        var notebookPath = Restangular.one('notebooks', notebookId).one('contents').getRestangularUrl();
        var notebookUrl  = $location.protocol() + "://" + $location.host();

        if ($location.port() && $location.port() != 80) {
          notebookUrl += ':' + $location.port();
        }
        notebookUrl += notebookPath;

        return this.beakerUrl(url, "edit/" + notebookId, {
          uri: notebookUrl,
          projectId: projectId
        });
      },
      beakerUrl: function(url, subPath, params) {
        return url + "#/" +
          subPath + "?" +
          UrlGeneratorService.toParams(
            _.extend(params, {
              bunsenUiUrl: $location.absUrl().split("#")[0]
            })
          );
      }
    };
  }]);
})(window.bunsen);
