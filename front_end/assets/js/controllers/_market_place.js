!(function(angular, app) {

  app.controller('marketPlace', ['$q', '$scope', 'Factories', 'TagNormalizeService', function($q, $scope, Factories, TagNormalizeService) {
    var F = Factories;

    $scope.isItemSelected = function(item, modelScope) {
      item = item.id || item;

      if(!_.isArray(modelScope)) {
        modelScope = $scope.$eval(modelScope);
      }

      if(modelScope) {
        return modelScope.indexOf(item) != -1;
      } else {
        return false;
      }
    }

    $scope.selectItem = function(item, itemStore) {
      var itemStoreName  = itemStore;

      itemStore   = $scope.$eval(itemStore) || [];
      var itemKey = item.id ? item.id : item;

      if(!$scope.isItemSelected(itemKey, itemStore)) {
        itemStore.push(itemKey);
      } else {
        var removeIndex = itemStore.indexOf(itemKey);
        if (removeIndex != -1) {
          itemStore.splice(removeIndex, 1);
        }
      }
      $scope.$eval(itemStoreName+"="+JSON.stringify(itemStore));
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

    function getDataSets(newValue, oldValue) {
      $q.all(
        F.DataSets.getDataSets($scope.marketPlace).then(function(d) {
          $scope.marketPlace.data = d;
        }),

        F.DataSets.getCount($scope.marketPlace).then(function(count) {
          $scope.marketPlace.totalItems = count;
        }),

        F.RelatedTags.getTags($scope.marketPlace).then(function(tags) {
          $scope.marketPlace.relatedTags = tags;
        })
      ).then(function() {
        $scope.currentFilters = getSelectedFilters();
      });
    }

    function resetDataSets(observedChange) {
      if (observedChange === undefined) return;
      $scope.marketPlace.currentPage = 1;
      getDataSets();
    }

    // init pagination
    $scope.marketPlace.currentPage = 1;
    $scope.marketPlace.itemsPerPage = 10;
    $scope.marketPlace.maxSize = 5;

    F.Formats.getFormats().then(function(d) {
      $scope.formats = d;
    });

    F.Vendors.getVendors().then(function(v) {
      $scope.marketPlace.vendors = v;
    });

    $scope.$watch('marketPlace.currentPage', getDataSets);
    $scope.$watchCollection('marketPlace.typeScope', resetDataSets);
    $scope.$watchCollection('marketPlace.vendorScope', resetDataSets);
    $scope.$watchCollection('marketPlace.tagScope', resetDataSets);
    $scope.$watch('marketPlace.searchScope', resetDataSets);
    $scope.$watch('marketPlace.currentCategory', getDataSets);
  }]);

})(angular, window.bunsen);
