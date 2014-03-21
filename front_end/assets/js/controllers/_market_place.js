!(function(angular, app) {

  app.controller('marketPlace', ['$scope', 'Restangular', 'VendorsFactory', 'DataSetsFactory', 'RelatedTagsFactory', 'TagNormalizeService', function($scope, Restangular, VendorsFactory, DataSetsFactory, RelatedTagsFactory, TagNormalizeService) {
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
      DataSetsFactory.getItems($scope.marketPlace).then(function(d) {
        $scope.marketPlace.data = d;
      });

      RelatedTagsFactory.getItems($scope.marketPlace).then(function(tags) {
        $scope.marketPlace.relatedTags = tags;
      });

      $scope.currentFilters = getSelectedFilters();
    }

    Restangular.one('data_tags').getList().then(function(d) {
      $scope.tags = d;
    });

    Restangular.one('data_sets').getList("formats").then(function(d) {
      $scope.formats = d;
    });

    VendorsFactory.then(function(v) {
      $scope.marketPlace.vendors = v;
    });

    $scope.$watch('marketPlace.typeScope', getDataSets);
    $scope.$watch('marketPlace.vendorScope', getDataSets);
    $scope.$watch('marketPlace.tagScope', getDataSets);
  }]);

})(angular, window.bunsen);
