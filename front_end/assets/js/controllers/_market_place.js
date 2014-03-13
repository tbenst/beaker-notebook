!(function(angular, app) {
  app.controller('marketPlace', ['$scope', 'Restangular', function($scope, Restangular) {
    Restangular.one('data_sets').getList().then(function(d) {
      $scope.data = d;
    });

    $scope.treeOptions = {
      nodeChildren: "children",
      dirSelectable: true,
    }

    $scope.onTreeSelection = function(node) {
      $scope.categoryFilterBy = node.category;

      Restangular.one('categories', node.id).getList('data_sets').then(function(d) {
        $scope.data = d;
      });
    }

    $scope.categoryFilter = function() {
      return true;
    }

    Restangular.one('categories').getList().then(function(treeData) {
      $scope.treeData = treeData;
    });
  }]);
})(angular, window.bunsen);
