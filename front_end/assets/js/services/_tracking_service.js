;(function(app) {
  app.service('TrackingService', [
    'Factories',
    function(F) {
    return {
      mark: function(name) {
        performance.mark(name);
        var mark = performance.getEntriesByName(name);
        console.log(mark);
      },
      measure: function(name, from, to) {
        var measurement = performance.measure(name, from, to);
        console.log(measurement);
      }
    };
  }]);
})(window.bunsen);
