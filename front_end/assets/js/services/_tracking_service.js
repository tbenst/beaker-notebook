;(function(app) {

  function beautifyName(name) {
    return name.match(/[A-Z][a-z]+/g).join(" ");
  }

  function msToSeconds(time) {
    return time / 1000;
  }

  function buildPostData(measurement) {
    return {
      host: "bunsen",
      service: "http req",
      metric: msToSeconds(measurement.duration),
      state: "ok",
      description: beautifyName(measurement.name) + " took " + msToSeconds(measurement.duration) + ".",
      tags: ['http', 'librato']
    };
  }

  app.service('TrackingService', [
    'Factories',
    function(F) {
    return {
      mark: function(name) {
        performance.clearMarks(name);
        performance.mark(name);
        var mark = performance.getEntriesByName(name)[0];
      },

      measure: function(name, from, to) {
        if(performance.getEntriesByName(from).length && performance.getEntriesByName(to).length) {
          performance.measure(name, from, to);
          var measurement = performance.getEntriesByName(name)[0];

          F.Events.one('events').customPOST(buildPostData(measurement));
        }
      }
    };
  }]);
})(window.bunsen);
