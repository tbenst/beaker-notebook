;(function(angular, app) {

  app.controller('marketNav', [
    '$scope',
    '$state',
    'Factories',
    '$localStorage',
    'TrackingService',
    function(
      $scope,
      $state,
      Factories,
      $localStorage,
      TrackingService) {

      var F = Factories;

      $scope.marketPlace.treeOptions = {
        equality: function(a, b) {
          return a && b && a['public-id'] == b['public-id']
        },
        nodeChildren: 'children',
        onLabelClick: 'both',
        allowMultiple: false
      };

      $scope.onTreeExpansion = function(node, expanded) {
        if (expanded) {
          F.Categories.getCategories({root: node['public-id'], limit: 2}).then(function(categories) {
            _.each(node.children, function(category) {
              var child = _.find(categories[0].children, function(categoryChild) {
                return categoryChild['public-id'] == category['public-id'];
              });
              category.children = child.children;
            });
          });
        } else {
          _.each(node.children, function(category) {
            delete category.children;
          });
        }
      };

      function getRootCategory(node) {
        if (node.parent) {
          return getRootCategory(node.parent);
        } else {
          return node;
        }
      }

      $scope.onTreeSelection = function(node) {
        if (node) {
          $localStorage.lastRootCategoryId = getRootCategory(node)['public-id'];
          $localStorage.lastCatalogId = node.catalog['public-id'];
          $scope.newSearch({categoryId: node['public-id']});
        }
      };

      $scope.searchByTag = function(tag) {
        $scope.newSearch({
          tagsScope: [tag],
          categoryId: $scope.marketPlace.categoryId
        });
      };

      $scope.checkRelatedSetHeight = function() {
        var dataTags = $scope.marketPlace.relatedTags;
        var dataTagsToDisplay = 6;

        if (dataTags !== undefined) {
          return dataTags.length >= dataTagsToDisplay;
        }
      };

      F.Categories.getCategories({limit: 3}).then(function(treeData) {
        $scope.treeData = treeData;

        if (!$scope.marketPlace.currentCategory) {
          $scope.marketPlace.currentCategory = treeData[0];
          $scope.marketPlace.categoryId = treeData[0]['public-id'];
        }
      });

      $scope.$watch('marketPlace.searchTerm', function(v) {
        if (v !== void(0)) {
          TrackingService.mark('UnfilteredMarketPlaceSearch');
          $scope.newSearch({
            searchTerm: $scope.marketPlace.searchTerm,
            categoryId: $scope.marketPlace.categoryId
          })
        }
      });
    }]);

})(angular, window.bunsen);
