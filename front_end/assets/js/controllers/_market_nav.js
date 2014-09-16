!(function(angular, app) {

  app.controller('marketNav', ['$scope', '$state', 'Factories', '$localStorage', function($scope, $state, Factories, $localStorage) {
    var F = Factories;
    $scope.marketPlace.treeOptions = {
      equality: function(a, b) {
        return a && b && a.path == b.path;
      }
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

    $scope.treeOptions = {
      nodeChildren: "children"
    }

    $scope.onTreeSelection = function(node) {
      if (node) {
        $localStorage.lastCatalog = node.path.substring(0, 3);
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

    F.Categories.getCategories({limit: 3}).then(function(treeData) {
      $scope.treeData = treeData;
    });

    $scope.$watch('marketPlace.searchTerm', function(v) {
      if (v !== void(0)) {
        $scope.newSearch({searchTerm: $scope.marketPlace.searchTerm});
      }
    });
  }]);

})(angular, window.bunsen);
