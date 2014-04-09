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

      F.DataSets.getCount($scope.marketPlace).then(function(count) {
        $scope.marketPlace.totalItems = count;
      });
    }

    function clearSearch() {
      var deleteList = ['categoryID', 'vendorScope', 'typeScope', 'tagScope', 'searchTerm', 'searchScope'];
      _.each(deleteList, function(i) {
        delete $scope.marketPlace[i];
      });
    }

    function newSearch(preserve) {
      clearSearch();
      _.extend($scope.marketPlace, preserve);
      $state.go('marketPlace.items');
      getDataSets();
    }

    $scope.onTreeSelection = function(node) {
      newSearch({categoryID: node.id});
      $scope.marketPlace.currentCategory = node;
    }

    $scope.searchByTag = function(tag) {
      newSearch({tagScope: [tag.id.toString()]});
    };

    $scope.isTagSelected = function(tag) {
      return _.contains($scope.marketPlace.tagScope, tag.id.toString());
    };

    F.Categories.then(function(treeData) {
      $scope.treeData = treeData;
    });

    $scope.$watch('marketPlace.searchTerm', function(v) {
      if (v !== void(0) && v !== '') {
        newSearch({searchTerm: $scope.marketPlace.searchTerm});
      }
    });
  }]);

})(angular, window.bunsen);
