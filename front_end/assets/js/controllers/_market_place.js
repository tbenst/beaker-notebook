!(function(angular, app) {

  app.controller('marketPlace', ['$q', '$scope', 'Factories', 'TagNormalizeService', function($q, $scope, Factories, TagNormalizeService) {
    var F = Factories;

    $scope.marketPlace.currentCategory = {path: "0.1"};

    $scope.removeFilter = function(value, model) {
      _.remove($scope.$eval(model), function(v) {
        return v === value;
      });

      getDataSets();
    }

    function getSelectedFilters() {
      var TS = TagNormalizeService;

      // condense all search filters into a flat list
      var scopes = _($scope.marketPlace.filters).keys().map(function(f) {
        var filterScope = f + 'Scope';
        return TS.normalizeFilter($scope.marketPlace[filterScope], 'marketPlace.' + filterScope, $scope)
      })
      .value();

      return Array.prototype.concat.apply([], scopes);
    }

    function checkDataSets(newValue, oldValue) { if (newValue !== oldValue) getDataSets(); }

    var previousRequestsAborter;

    function getDataSets() {
      if (previousRequestsAborter) {previousRequestsAborter.resolve()}
      previousRequestsAborter = $q.defer();

      F.DataSets.getDataSets($scope.marketPlace, previousRequestsAborter).then(function(d) {
        _.extend($scope.marketPlace, d);
      })
      .then(function() {
        $scope.currentFilters = getSelectedFilters();
      });
    }

    function changePage(newValue, oldValue) {
      if (newValue === oldValue) return;

      F.DataSets.getDataSets($scope.marketPlace).then(function(d) {
        _.extend($scope.marketPlace, d);
        window.scrollTo(0,0);
      });
    }

    function resetDataSets(observedChange) {
      if (observedChange === undefined) return;
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
    $scope.$watch('marketPlace.searchScope', resetDataSets);
    $scope.$watch('marketPlace.currentCategory', checkDataSets);
    $scope.$watch(filters, watchFilterScopes, true);

    var watchers = [];
    function unbindWatchers() {
      _.invoke(watchers, 'call');
      watchers = [];
    }

    function watchFilterScopes() {
      unbindWatchers();
      _($scope.marketPlace.filters).keys().each(function(f) {
        watchers.push($scope.$watchCollection('marketPlace.' + f + 'Scope', resetDataSets));
      })
    }
  }]);

})(angular, window.bunsen);
