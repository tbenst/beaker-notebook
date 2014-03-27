!(function(angular, app) {

  app.controller('marketNav', ['$scope', '$state', 'DataSetsFactory', 'RelatedTagsFactory', 'CategoriesFactory', function($scope, $state, DataSetsFactory, RelatedTagsFactory, CategoriesFactory) {
    $scope.treeOptions = {
      nodeChildren: "children",
      dirSelectable: true,
    }

    function getDataSets() {
      $scope.marketPlace.currentPage = 1;

      DataSetsFactory.getDataSets($scope.marketPlace).then(function(d) {
        $scope.marketPlace.data = d;
      });

      RelatedTagsFactory.getTags($scope.marketPlace).then(function(tags) {
        $scope.marketPlace.relatedTags = tags;
      });
    }

    $scope.onTreeSelection = function(node) {
      $state.go('marketPlace.items');
      $scope.marketPlace.categoryID = node.id;

      getDataSets();
    }

    function clearSearch() {
      _.each(['categoryID', 'vendorScope', 'typeScope', 'tagScope'], function(s) {
        delete $scope.marketPlace[s];
      });
    }

    $scope.searchByTag = function(tag) {
      $state.go('marketPlace.items');
      clearSearch();
      $scope.marketPlace.tagScope = [tag.id.toString()];

      getDataSets();
    };

    $scope.isTagSelected = function(tag) {
      return _.contains($scope.marketPlace.tagScope, tag.id.toString());
    };

    CategoriesFactory.then(function(treeData) {
      $scope.treeData = treeData;
    });
  }]);

})(angular, window.bunsen);
