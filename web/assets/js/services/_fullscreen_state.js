;(function(app) {
  app.service('FullscreenState', function() {
    var isFullscreen = false;
    return {
      isFullscreen: function() {
        return isFullscreen;
      },
      toggleFullscreen: function(state) {
        isFullscreen = state;
      }
    };
  });
})(window.bunsen);
