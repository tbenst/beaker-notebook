!(function(angular, app) {

  app.controller('marketNav', ['$scope', '$state', 'Factories', '$localStorage', function($scope, $state, Factories, $localStorage) {
    var F = Factories;

    // Catalogs are top-level categories, so the catalog path of any category
    // is going to be the first two segments of the dot-divided path
    function extractCatalogPath(categoryPath) {
      return categoryPath.split('.').slice(0,2).join('.');
    }

    $scope.marketPlace.treeOptions = {
      equality: function(a, b) {
        return a && b && a.index == b.index && a.path == b.path;
      },
      nodeChildren: "children",
      onLabelClick: "both",
      allowMultiple: false
    }

    $scope.onTreeExpansion = function (node, expanded) {
      if(expanded) {
        F.Categories.getCategories({root: node.path, limit: 2}).then(function (categories) {
          _.each(node.children, function(category){
            var child = _.find(categories[0].children, {id: category.id});
            category.children = child.children ;
          })
        })
      } else{
        _.each(node.children, function (category) {
          delete category.children
        })
      }
    }

    $scope.onTreeSelection = function(node) {
      if (node) {
        $localStorage.lastCatalogPath = extractCatalogPath(node.path);
        $localStorage.lastIndex = node.index;
        $scope.newSearch({categoryPath: node.path});
      }
    }

    $scope.searchByTag = function(tag) {
      $scope.newSearch({
        tagsScope: [tag],
        categoryPath: extractCatalogPath($scope.marketPlace.categoryPath)
      });
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

    F.Categories.getCategories({limit: 3}).then(function(treeData) {
      $scope.treeData = treeData;
    });

    $scope.$watch('marketPlace.searchTerm', function(v) {
      if (v !== void(0)) {
        $scope.newSearch({
          searchTerm: $scope.marketPlace.searchTerm,
          categoryPath: extractCatalogPath($scope.marketPlace.categoryPath)});
      }
    });
  }]);

})(angular, window.bunsen);
