;(function(app) {
  app.service('TagNormalizeService', function() {
    return {
      normalizeFilter: function(filterValues, modelName, $scope) {
        return _.map(filterValues, function(v) {
          return {
            "name": v,
            "model": modelName
          }
        });
      }
    }
  });
})(window.bunsen);
