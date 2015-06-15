;(function(app) {

  function buildQuery(scope) {
    var query = {
      from: (scope.currentPage - 1) * scope.itemsPerPage,
      limit: scope.itemsPerPage
    };

    if (scope.searchTerm !== void(0) && scope.searchTerm.length > 0) {
      query.searchTerm = scope.searchTerm;
    }

    if (scope.searchScope !== void(0) && scope.searchScope.length > 0) {
      query.searchScope = scope.searchScope;
    }

    if (scope.categoryPath !== void(0)) {
      query['category-path'] = scope.categoryPath;
    }

    _.chain(scope.filters).keys().each(function(f) {
      var s = scope[f + 'Scope'];
      if (s !== void(0) && s.length > 0) {
        query[f] = s;
      }
    });

    return query;
  }

  function formatDate(set, attr) {
    if (set[attr]) {
      set[attr] = moment(set[attr]).format('YYYY-MM-DD');
    }
  }

  function formatDataset(set) {
    var dateAttrs = [
      'startDate',
      'releaseDate',
      'lastUpdated',
      'createdAt',
      'metaDataChanged'
    ];

    _.each(dateAttrs, _.partial(formatDate, set));

    return set;
  }

  app.factory('DataSetsFactory', [
      'TimeoutRestangular',
      'MarketplaceRestangular',
      function(
        TimeoutRestangular,
        MarketplaceRestangular) {
        return {
          getDataSet: function(index, id) {
            return MarketplaceRestangular
            .one('indices', index)
            .one('datasets', id).get()
            .then(function(results) {
              return formatDataset(results.data);
            });
          },
          updateDataSet: function(dataset) {
            return MarketplaceRestangular
            .one('indices', dataset.index)
            .customPUT(
                MarketplaceRestangular.stripRestangular(dataset),
                'datasets/' + dataset.id);
          },
          createDataSet: function(dataset) {
            // we need to do this because it is an
            // object with a key of 0, not an array.
            dataset.categories = [dataset.categories[0]];

            return MarketplaceRestangular
            .one('indices', dataset.index)
            .post('datasets', _.omit(dataset, 'index'));
          },
          getDataSets: function(scope) {
            return MarketplaceRestangular
            .one('indices', scope.currentCategory.index)
            .one('datasets')
            .get(buildQuery(scope))
            .then(function(datasets) {
              return datasets.data;
            })
            .then(function(datasets) {
              return _.extend(datasets, {
                data: _.map(datasets.data, formatDataset)
              });
            });
          }
        };
      }
  ]);
})(window.bunsen);
