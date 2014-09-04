!(function(angular, app) {

  app.controller('marketNav', ['$scope', '$state', 'Factories', function($scope, $state, Factories) {
    var F = Factories;

    $scope.treeOptions = {
      nodeChildren: "children"
    }

    $scope.onTreeSelection = function(node) {
      $scope.newSearch({categoryPath: node.path});
    }

    $scope.searchByTag = function(tag) {
      $scope.newSearch({tagScope: [tag.id.toString()]});
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
        $scope.newSearch({searchTerm: $scope.marketPlace.searchTerm});
      }
    });
  }]);

})(angular, window.bunsen);
