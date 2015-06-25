;(function(angular, app) {
  app.controller('categories', [
    '$scope',
    'Factories',
    function(
      $scope,
      Factories) {

      $scope.treeOptions = {
        equality: function(a, b) {
          return a && b && a['public-id'] == b['public-id']
        },
        nodeChildren: 'children',
        onLabelClick: 'expand',
        allowMultiple: false
      };

      $scope.expandedNodes = [];

      $scope.onTreeExpansion = function(node, expanded) {
        if (expanded) {
          Factories.Categories.getCategories({root: node['public-id'], limit: 2}).then(function(categories) {
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

      Factories.Categories.getCategories({limit: 3}).then(function(treeData) {
        $scope.treeData = treeData;
      });

      $scope.$on('treecontrol.open.node', function(e, node) {
        if (!_.contains($scope.expandedNodes, node)) {
          $scope.expandedNodes.push(node);
        }
      });
    }]
  );
})(angular, window.bunsen);
