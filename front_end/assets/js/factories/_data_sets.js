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

    return query;
  }

  app.factory('DataSetsFactory', ['Restangular', function(Restangular) {
    return {
      getDataSet: function(id) {
        return Restangular.one('data_sets', id).get();
      },

      getDataSets: function(scope) {
        return Restangular.one('data_sets').getList("", buildQuery(scope));
      },

      getCount: function(scope) {
        return Restangular.one('data_sets').one("count").get(buildQuery(scope))
          .then(function(d) {
            return +d[0].matchingCount;
          });
      }
    };
  }]);

  app.factory('RelatedTagsFactory', ['Restangular', function(Restangular) {
    return {
      getTags: function(scope) {
        return Restangular.one('data_sets').getList("tags", buildQuery(scope));
      }
    };
  }]);

  app.factory('FormatsFactory', ['Restangular', function(Restangular) {
    return {
      getFormats: function() {
        return Restangular.one('data_sets').getList('formats');
      }
    };
  }]);

})(window.bunsen);
