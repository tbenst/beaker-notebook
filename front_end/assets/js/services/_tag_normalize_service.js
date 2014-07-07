;(function(app) {
  app.service('TagNormalizeService', function() {
    return {
      normalizeTypes: function(types, modelName, $scope) {
        return _.map(types, function(v) {
          return {
            "name": v,
            "value": v,
            "model": modelName
          }
        });
      },
      normalizeVendors: function(vendors, modelName, $scope) {
        return _.map(vendors, function(vendorID) {
          return {
            "name": _.findWhere($scope.marketPlace.vendors, {id: +vendorID}).name,
            "value": vendorID,
            "model": modelName
          }
        });
      },
      normalizeTags: function(tags, modelName, $scope) {
        return _.map(tags, function(tagID) {
          return {
            "name": _.findWhere($scope.marketPlace.relatedTags, {id: +tagID}).name,
            "value": tagID,
            "model": modelName
          }
        });
      }
    }
  });
})(window.bunsen);
