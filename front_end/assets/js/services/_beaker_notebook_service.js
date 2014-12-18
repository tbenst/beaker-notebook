;(function(app) {
  app.service('BeakerNotebookService', [
    '$location',
    'UrlGeneratorService',
    'Restangular',
    '$rootScope',
    '$sce',
    function(
      $location,
      UrlGeneratorService,
      Restangular,
      $rootScope,
      $sce) {
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

        if (cached) {
          cached.style.display = "block";
        } else {
          var frame = document.createElement("iframe")
          frame.setAttribute('id', meta.frameId);
          frame.src = meta.location.toString();
          frame.setAttribute('height', height);
          frame.setAttribute('scrolling', 'no');
          frame.setAttribute('class', 'beaker');
          if(hide) {
            frame.style.display = "none";
          }
          document.getElementById('beaker-container').appendChild(frame);
        }
      },
      hideFrame: function(notebook) {
        var frame = this.getFrameMeta(notebook).frame;
        if (frame) {
          frame.style.display = "none";
        }
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
