!(function(angular, app) {

  app.controller('marketNav', ['$scope', '$state', 'Factories', function($scope, $state, Factories) {
    var F = Factories;
    $scope.marketPlace.treeOptions = {
      equality: function(a, b) {
        return a && b && a.path == b.path;
      }
    }

    $scope.treeOptions = {
      nodeChildren: "children"
    }

    $scope.onTreeSelection = function(node) {
      if (node) {
        $scope.newSearch({categoryPath: node.path});
      }
    }

    $scope.searchByTag = function(tag) {
      $scope.newSearch({dataTagsScope: [tag]});
    };

    $scope.isTagSelected = function(tag) {
      return _.contains($scope.marketPlace.tagsScope, tag);
    };

    $scope.checkRelatedSetHeight = function() {
      var dataTags = $scope.marketPlace.tags;
      var dataTagsToDisplay = 6;

      if(dataTags != undefined) {
        return dataTags.length >= dataTagsToDisplay;
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
