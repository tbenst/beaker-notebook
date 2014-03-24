!(function(angular, app) {

  app.controller('marketNav', ['$scope', '$state', 'Restangular', 'DataSetsFactory', 'RelatedTagsFactory', function($scope, $state, Restangular, DataSetsFactory, RelatedTagsFactory) {
    $scope.treeOptions = {
      nodeChildren: "children",
      dirSelectable: true,
    }

    function getDataSets() {
      $scope.marketPlace.currentPage = 1;

      DataSetsFactory.getItems($scope.marketPlace).then(function(d) {
        $scope.marketPlace.data = d;
      });

      RelatedTagsFactory.getItems($scope.marketPlace).then(function(tags) {
        $scope.marketPlace.relatedTags = tags;
      });
    }

    $scope.onTreeSelection = function(node) {
      $state.go('marketPlace');
      $scope.marketPlace.categoryID = node.id;

      getDataSets();
    }

    function clearSearch() {
      _.each(['categoryID', 'vendorScope', 'typeScope', 'tagScope'], function(s) {
        delete $scope.marketPlace[s];
      });
    }

    $scope.searchByTag = function(tag) {
      $state.go('marketPlace');
      clearSearch();
      $scope.marketPlace.tagScope = [tag.id.toString()];

      getDataSets();
    };

    $scope.isTagSelected = function(tag) {
      return _.contains($scope.marketPlace.tagScope, tag.id.toString());
    };

    Restangular.one('categories').getList().then(function(treeData) {
      $scope.treeData = treeData;
    });
  }]);

})(angular, window.bunsen);
