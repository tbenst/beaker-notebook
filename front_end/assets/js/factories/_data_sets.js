!(function(app) {

  app.factory('DataSetsFactory', function(Restangular) {
    function buildQuery(scope) {
      var query = {};

      if (scope.vendorScope !== void(0) && scope.vendorScope.length > 0) {
        query.vendorIDs = encodeURIComponent(scope.vendorScope.join(","));
      }

      if (scope.categoryID !== void(0)) {
        query.categoryID = encodeURIComponent(scope.categoryID);
      }

      if (scope.tagScope !== void(0) && scope.tagScope.length > 0) {
        query.tagIDs = encodeURIComponent(scope.tagScope.join(','));
      }

      if (scope.typeScope !== void(0) && scope.typeScope.length > 0) {
        query.formats = encodeURIComponent(scope.typeScope.join(','));
      }

      return query;
    }

    return {
      getItems: function(scope) {
        return Restangular.one('data_sets').getList("", buildQuery(scope));
      }
    };
  });

})(window.bunsen);
