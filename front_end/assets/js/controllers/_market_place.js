!(function(angular, app) {

  app.controller('marketPlace', ['$scope', 'VendorsFactory', 'DataSetsFactory', 'RelatedTagsFactory', 'TagNormalizeService', 'TagsFactory', 'FormatsFactory', function($scope, VendorsFactory, DataSetsFactory, RelatedTagsFactory, TagNormalizeService, TagsFactory, FormatsFactory) {
    $scope.isSelected = function(value, model){
      if (model === void(0)) {
        return false;
      }

      return ~model.indexOf(value+"");
    }

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
      DataSetsFactory.getDataSets($scope.marketPlace).then(function(d) {
        $scope.marketPlace.data = d;
      });

      DataSetsFactory.getCount($scope.marketPlace).then(function(count) {
        $scope.marketPlace.totalItems = count;
      });

      RelatedTagsFactory.getTags($scope.marketPlace).then(function(tags) {
        $scope.marketPlace.relatedTags = tags;
      });

      $scope.currentFilters = getSelectedFilters();
    }

    function resetDataSets() {
      $scope.marketPlace.currentPage = 1;
      getDataSets();
    }

    // init pagination
    $scope.marketPlace.currentPage = 1;
    $scope.marketPlace.itemsPerPage = 10;
    $scope.marketPlace.maxSize = 5;

    TagsFactory.then(function(d) {
      $scope.tags = d;
    });

    FormatsFactory.getFormats().then(function(d) {
      $scope.formats = d;
    });

    VendorsFactory.then(function(v) {
      $scope.marketPlace.vendors = v;
    });

    $scope.$watch('marketPlace.currentPage', getDataSets);
    $scope.$watch('marketPlace.typeScope', resetDataSets);
    $scope.$watch('marketPlace.vendorScope', resetDataSets);
    $scope.$watch('marketPlace.tagScope', resetDataSets);
  }]);

})(angular, window.bunsen);
