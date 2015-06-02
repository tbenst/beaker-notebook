;(function(app) {
  app.service('TagNormalizeService', function() {
    return {
      normalizeFilter: function(filterChoices, modelName) {
        return _.map(filterChoices, function(v) {
          return {
            'name': v,
            'model': modelName
          };
        });
      }
    };
  });
})(window.bunsen);
