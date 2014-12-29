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
        if(performance.getEntriesByName(from).length && performance.getEntriesByName(to).length) {
          performance.measure(name, from, to);
          var measurement = performance.getEntriesByName(name);
          console.log(measurement);
        }
      }
    };
  }]);
})(window.bunsen);
