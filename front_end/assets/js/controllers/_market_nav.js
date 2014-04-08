!(function(angular, app) {

  app.controller('marketNav', ['$scope', '$state', 'Factories', function($scope, $state, Factories) {
    var F = Factories;

    $scope.treeOptions = {
      nodeChildren: "children",
      dirSelectable: true,
    }

    function getDataSets() {
      $scope.marketPlace.currentPage = 1;

      F.DataSets.getDataSets($scope.marketPlace).then(function(d) {
        $scope.marketPlace.data = d;
      });

      F.RelatedTags.getTags($scope.marketPlace).then(function(tags) {
        $scope.marketPlace.relatedTags = tags;
      });
    }

    $scope.onTreeSelection = function(node) {
      $state.go('marketPlace.items');
      clearSearch();
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

    F.Categories.then(function(treeData) {
      $scope.treeData = treeData;
    });
  }]);

})(angular, window.bunsen);
