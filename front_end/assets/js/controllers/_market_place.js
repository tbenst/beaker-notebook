!(function(angular, app) {

  app.controller('marketPlace', ['$scope', 'Factories', 'TagNormalizeService', '$filter', function($scope, Factories, TagNormalizeService, $filter) {
    var F = Factories;

    $scope.removeFilter = function(value, model) {
      _.remove($scope.$eval(model), function(v) {
        return v === value;
      });

      getDataSets();
    }

    function getSelectedFilters() {
      var TS = TagNormalizeService;

      // condense all search filters into a flat list
      return Array.prototype.concat(
        TS.normalizeTypes($scope.marketPlace.typeScope, 'marketPlace.typeScope', $scope),
        TS.normalizeVendors($scope.marketPlace.vendorScope, 'marketPlace.vendorScope', $scope),
        TS.normalizeTags($scope.marketPlace.tagScope, 'marketPlace.tagScope', $scope)
      );
    }

    function getDataSets() {
      F.DataSets.getDataSets($scope.marketPlace).then(function(d) {
        $scope.marketPlace.data = d;
      });

      F.DataSets.getCount($scope.marketPlace).then(function(count) {
        $scope.marketPlace.totalItems = count;
        $scope.resultCount = $scope.marketPlace.totalItems;
      });

      F.RelatedTags.getTags($scope.marketPlace).then(function(tags) {
        $scope.marketPlace.relatedTags = tags;
      });

      $scope.currentFilters = getSelectedFilters();
    }

    function resetDataSets() {
      $scope.marketPlace.currentPage = 1;
      getDataSets();
    }

    function updateResultCount() {
      var d     = $scope.marketPlace.data;
      var total = $scope.marketPlace.totalItems;

      if ($scope.filterBy) {
        $scope.resultCount = $filter('filter')(d, $scope.filterBy).length;
      } else {
        $scope.resultCount = total;
      }
    }

    // init pagination
    $scope.marketPlace.currentPage = 1;
    $scope.marketPlace.itemsPerPage = 10;
    $scope.marketPlace.maxSize = 5;

    F.Tags.then(function(d) {
      $scope.tags = d;
    });

    F.Formats.getFormats().then(function(d) {
      $scope.formats = d;
    });

    F.Vendors.then(function(v) {
      $scope.marketPlace.vendors = v;
    });

    $scope.$watch('marketPlace.currentPage', getDataSets);
    $scope.$watch('marketPlace.typeScope', resetDataSets);
    $scope.$watch('marketPlace.vendorScope', resetDataSets);
    $scope.$watch('marketPlace.tagScope', resetDataSets);
    $scope.$watch('filterBy', updateResultCount);
  }]);

})(angular, window.bunsen);
