!(function(app) {

  function buildQuery(scope) {
    var query = {
      offset: (scope.currentPage - 1) * scope.itemsPerPage,
      limit: scope.itemsPerPage
    };

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
        .getList("", buildQuery(scope));
      },

      getCount: function(scope, abort) {
        return TimeoutRestangular(abort).one('data_sets').one("count")
        .get(buildQuery(scope))
        .then(function(d) {
          return +d[0].matchingCount;
        });
      }
    };
  }]);

  app.factory('RelatedTagsFactory', ['TimeoutRestangular', function(TimeoutRestangular) {
    return {
      getTags: function(scope, abort) {
        return TimeoutRestangular(abort).one('data_sets')
        .getList("tags", buildQuery(scope));
      }
    };
  }]);

  app.factory('FormatsFactory', ['TimeoutRestangular', function(TimeoutRestangular) {
    return {
      getFormats: function(scope, abort) {
        return TimeoutRestangular(abort).one('data_sets')
        .getList('formats', buildQuery(scope));
      }
    };
  }]);

  app.factory('VendorsFactory', ['TimeoutRestangular', function(TimeoutRestangular) {
    return {
      getVendors: function(scope, abort) {
        return TimeoutRestangular(abort).one('data_sets')
        .getList('vendors', buildQuery(scope));
      }
    };
  }]);

})(window.bunsen);
