!(function(app) {

  function buildQuery(scope) {
    var query = {
      offset: (scope.currentPage - 1) * scope.itemsPerPage,
      limit: scope.itemsPerPage
    };

    if (scope.vendorScope !== void(0) && scope.vendorScope.length > 0) {
      query.vendorIDs = encodeURIComponent(scope.vendorScope.join(","));
    }

    if (scope.categoryPath !== void(0)) {
      query.categoryPath = encodeURIComponent(scope.categoryPath);
    }

    if (scope.tagScope !== void(0) && scope.tagScope.length > 0) {
      query.tagIDs = encodeURIComponent(scope.tagScope.join(','));
    }

    if (scope.typeScope !== void(0) && scope.typeScope.length > 0) {
      query.formats = encodeURIComponent(scope.typeScope.join(','));
    }

    if (scope.searchTerm !== void(0) && scope.searchTerm.length > 0) {
      query.searchTerm = encodeURIComponent(scope.searchTerm);
    }

    if (scope.searchScope !== void(0) && scope.searchScope.length > 0) {
      query.searchScope = encodeURIComponent(scope.searchScope);
    }

    return query;
  }

  app.factory('DataSetsFactory', ['TimeoutRestangular', function(TimeoutRestangular) {
    return {
      getDataSet: function(id) {
        return TimeoutRestangular().one('data_sets', id).get();
      },

      getDataSets: function(scope, abort) {
        return TimeoutRestangular(abort).one('data_sets')
        .get(buildQuery(scope));
      }
    };
  }]);
})(window.bunsen);
