;(function(app) {
  app.service('TagNormalizeService', function() {
    return {
      normalizeFilter: function(filterChoices, modelName, filters) {
        var someHas = function(filters, key) {
          return _.some(filters, function(f) {
            return _.has(f, key);
          });
        };

        return _.map(filterChoices, function(v) {
          var filter = {
            'name': v,
            'model': modelName
          };

          if (someHas(filters, 'id')) {
            var vendor = _.where(filters, {'id': v})[0];
            _.extend(filter, {'id': vendor.id, 'name': vendor.name});
          }
          return filter;
        });
      }
    };
  });
})(window.bunsen);
