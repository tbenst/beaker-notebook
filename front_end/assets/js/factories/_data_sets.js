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

  app.factory('DataSetsFactory', ['Restangular', function(Restangular) {
    return {
      getDataSet: function(id) {
        return Restangular.one('data_sets', id).get();
      },

      getDataSets: function(scope, abort) {
        return Restangular.one('data_sets')
        .withHttpConfig({timeout: abort.promise})
        .getList("", buildQuery(scope));
      },

      getCount: function(scope, abort) {
        return Restangular.one('data_sets').one("count")
        .withHttpConfig({timeout: abort.promise})
        .get(buildQuery(scope))
        .then(function(d) {
          return +d[0].matchingCount;
        });
      }
    };
  }]);

  app.factory('RelatedTagsFactory', ['Restangular', function(Restangular) {
    return {
      getTags: function(scope, abort) {
        return Restangular.one('data_sets')
        .withHttpConfig({timeout: abort.promise})
        .getList("tags", buildQuery(scope));
      }
    };
  }]);

  app.factory('FormatsFactory', ['Restangular', function(Restangular) {
    return {
      getFormats: function(scope, abort) {
        return Restangular.one('data_sets')
        .withHttpConfig({timeout: abort.promise})
        .getList('formats', buildQuery(scope));
      }
    };
  }]);

  app.factory('VendorsFactory', ['Restangular', function(Restangular) {
    return {
      getVendors: function(scope, abort) {
        return Restangular.one('data_sets')
        .withHttpConfig({timeout: abort.promise})
        .getList('vendors', buildQuery(scope));
      }
    };
  }]);

})(window.bunsen);
