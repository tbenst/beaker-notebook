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

    if (scope.categoryId !== void(0)) {
      query['category-id'] = scope.categoryId;
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
          getDataSet: function(catalog, id) {
            return MarketplaceRestangular
            .one('catalogs', catalog)
            .one('datasets', id).get()
            .then(function(results) {
              return formatDataset(results.data);
            });
          },
          updateDataSet: function(dataset) {
            return MarketplaceRestangular
            .one('catalogs', dataset.catalog['public-id'])
            .customPUT(
                MarketplaceRestangular.stripRestangular(dataset),
                'datasets/' + dataset.id);
          },
          createDataSet: function(dataset) {
            return MarketplaceRestangular
            .one('catalogs', dataset.catalog['public-id'])
            .post('datasets', _.omit(dataset, 'catalog'));
          },
          getDataSets: function(scope) {
            return MarketplaceRestangular
            .one('catalogs', scope.currentCategory.catalog['public-id'])
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
