!(function(app) {

  function buildQuery(scope) {
    var query = {
      offset: (scope.currentPage - 1) * scope.itemsPerPage,
      limit: scope.itemsPerPage
    };

    if (scope.searchTerm !== void(0) && scope.searchTerm.length > 0) {
      query.searchTerm = scope.searchTerm;
    }

    if (scope.searchScope !== void(0) && scope.searchScope.length > 0) {
      query.searchScope = scope.searchScope;
    }

    if (scope.categoryPath !== void(0)) {
      query.categoryPath = scope.categoryPath;
    }

    _(scope.filters).keys().each(function(f) {
      var s = scope[f + 'Scope'];
      if (s !== void(0) && s.length > 0) {
        query[f] = s;
      }
    })

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
