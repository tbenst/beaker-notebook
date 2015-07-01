;(function(angular, app) {

  app.controller('marketPlace', [
    '$q',
    '$scope',
    'Factories',
    'TagNormalizeService',
    '$localStorage',
    'TrackingService',
    function(
      $q,
      $scope,
      Factories,
      TagNormalizeService,
      $localStorage,
      TrackingService) {

      var F = Factories;

      if (!$scope.marketPlace.currentCategory && $localStorage.lastRootCategoryId && $localStorage.lastCatalogId) {
        $scope.marketPlace.currentCategory = {
          'public-id': $localStorage.lastRootCategoryId,
          catalog: {
            'public-id': $localStorage.lastCatalogId,
          }
        };
        $scope.marketPlace.categoryId = $localStorage.lastRootCategoryId;
      }

      $scope.removeFilter = function(filter) {
        var removeIndex;
        var evaluatedModel = $scope.$eval(filter.model);
        if (_.has(filter, 'id')) {
          removeIndex = evaluatedModel.indexOf(filter.id);
        } else {
          removeIndex = evaluatedModel.indexOf(filter.name);
        }

        if (removeIndex != -1) {
          evaluatedModel.splice(removeIndex, 1);
        }

        getDataSets();
      };

      function getSelectedFilters() {
        var TS = TagNormalizeService;

        // condense all search filters into a flat list
        var scopes = _.chain($scope.marketPlace.filters).keys().map(function(f) {
          var filterScope = f + 'Scope';
          return TS.normalizeFilter($scope.marketPlace[filterScope], 'marketPlace.' + filterScope, $scope.marketPlace.filters[f]);
        })
        .value();

        return Array.prototype.concat.apply([], scopes);
      }

      function checkDataSets(newValue, oldValue) {
        if ($scope.marketPlace.data) {
          return;
        }

        getDataSets();
      }

      var previousRequestsAborter;

      function getDataSets() {
        if (previousRequestsAborter) {previousRequestsAborter.resolve();}
        previousRequestsAborter = $q.defer();

        F.DataSets.getDataSets($scope.marketPlace, previousRequestsAborter).then(function(d) {
          _.extend($scope.marketPlace, d);
          $scope.marketPlace.relatedTags = _.difference($scope.marketPlace.filters.tags, $scope.marketPlace.tagsScope);
          TrackingService.mark('MarketPlaceResults');
          TrackingService.measure('BaselineMarketPlaceSearch', 'UnfilteredMarketPlaceSearch', 'MarketPlaceResults');
          TrackingService.measure('BaselineMarketPlaceFilteredSearch', 'FilteredMarketPlaceSearch', 'MarketPlaceResults');
        })
        .then(function() {
          $scope.currentFilters = getSelectedFilters();
        });
      }

      function changePage(newValue, oldValue) {
        if (newValue === oldValue) {
          return;
        }

        F.DataSets.getDataSets($scope.marketPlace).then(function(d) {
          _.extend($scope.marketPlace, d);
          window.scrollTo(0, 0);
        });
      }

      function resetDataSets(observedChange) {
        if (observedChange === undefined) {
          return;
        }
        $scope.marketPlace.currentPage = 1;
        getDataSets();
      }

      // init pagination
      $scope.marketPlace.itemsPerPage = 10;
      $scope.marketPlace.maxSize = 5;

      // bootstrap data if first visiting
      if (!$scope.marketPlace.currentPage) {
        $scope.marketPlace.currentPage = 1;
      }

      function filters() {
        return _.keys($scope.marketPlace.filters);
      }

      $scope.$watch('marketPlace.currentPage', changePage);
      $scope.$watch('marketPlace.searchTerm', resetDataSets);
      $scope.$watch('marketPlace.searchScope', function(searchTerm) {
        TrackingService.mark('FilteredMarketPlaceSearch');
        resetDataSets(searchTerm);
      });
      $scope.$watch('marketPlace.currentCategory', checkDataSets);
      $scope.$watch(filters, watchFilterScopes, true);

      var watchers = [];
      function unbindWatchers() {
        _.invoke(watchers, 'call');
        watchers = [];
      }

      function watchFilterScopes() {
        unbindWatchers();
        _.chain($scope.marketPlace.filters).keys().each(function(f) {
          watchers.push($scope.$watchCollection('marketPlace.' + f + 'Scope', resetDataSets));
        });
      }
    }]);

})(angular, window.bunsen);
