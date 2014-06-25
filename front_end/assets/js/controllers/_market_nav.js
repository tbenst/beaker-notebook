!(function(angular, app) {

  app.controller('marketNav', ['$scope', '$state', 'Factories', function($scope, $state, Factories) {
    var F = Factories;

    $scope.treeOptions = {
      nodeChildren: "children"
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
    }

    $scope.onTreeSelection = function(node) {
      newSearch({categoryID: node.id});
    }

    $scope.searchByTag = function(tag) {
      newSearch({tagScope: [tag.id.toString()]});
    };

    $scope.isTagSelected = function(tag) {
      return _.contains($scope.marketPlace.tagScope, tag.id.toString());
    };

    $scope.checkRelatedSetHeight = function() {
      var relatedTags = $scope.marketPlace.relatedTags;
      var relatedTagsToDisplay = 6;

      if(relatedTags != undefined) {
        return relatedTags.length >= relatedTagsToDisplay;
      }
    }

    F.Categories.getCategories().then(function(treeData) {
      $scope.treeData = treeData;
    });

    $scope.$watch('marketPlace.searchTerm', function(v) {
      if (v !== void(0)) {
        newSearch({searchTerm: $scope.marketPlace.searchTerm});
      }
    });
  }]);

})(angular, window.bunsen);
