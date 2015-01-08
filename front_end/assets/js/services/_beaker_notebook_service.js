;(function(app) {
  app.service('BeakerNotebookService', function() {
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
      renderFrame: function(notebook, height) {
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
          frame.style.display = "none";
          document.getElementById('beaker-container').appendChild(frame);
        }
      },
      hideFrame: function(notebook) {
        var frame = this.getFrameMeta(notebook).frame;
        if (frame) {
          frame.style.display = "none";
        }
      }
    };
  });
})(window.bunsen);
