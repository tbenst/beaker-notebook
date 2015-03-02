;(function(app) {

  function beautifyName(name) {
    return name.match(/[A-Z][a-z]+/g).join(" ");
  }

  function msToSeconds(time) {
    return time / 1000;
  }

  function buildPostData(measurement, serviceName) {
    return {
      host: "bunsen",
      service: serviceName,
      metric: msToSeconds(measurement.duration),
      state: "ok",
      description: beautifyName(measurement.name) + " took " + msToSeconds(measurement.duration) + ".",
      tags: ['http', 'librato']
    };
  }

  function clearMarks(name, from, to) {
    performance.clearMeasures(name);
    performance.clearMarks(from);
    performance.clearMarks(to);
  }

  app.service('TrackingService', [
    '$rootScope',
    'Beaker',
    'Factories',
    function(
      $rootScope,
      Beaker,
      F) {

    return {
      manageNotebookMarks: function(notebook) {
        var _this = this;
        return Beaker.getBeakerInstance().then(function(instance) {
          var markName = 'Load';
          if ( _($rootScope.cachedNotebooks).pluck('id').contains(notebook.id) ) markName += 'Cached';
          markName += instance === 'null' ? 'Unprovisioned' : 'Provisioned';
          markName += 'Notebook';
          _this.mark(markName);
        });
      },

      mark: function(name) {
        performance.clearMarks(name);
        performance.mark(name);
        var mark = performance.getEntriesByName(name)[0];
      },

      measure: function(name, from, to) {
        if(performance.getEntriesByName(from).length && performance.getEntriesByName(to).length) {
          performance.clearMeasures(name);
          performance.measure(name, from, to);
          var measurement = performance.getEntriesByName(name)[0];

          F.Events.one('events').customPOST(buildPostData(measurement, name));
          clearMarks(name, from, to);
        }
      },

      setNotebookState: function(bool) {
        creatingNotebook = bool;
      }
    };
  }]);
})(window.bunsen);
