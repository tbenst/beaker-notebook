!(function(angular, app) {

  app.controller('categories', ['$scope', '$state', 'Restangular', 'DataSetsFactory', function($scope, $state, Restangular, DataSetsFactory) {
    $scope.treeOptions = {
      nodeChildren: "children",
      dirSelectable: true,
    }

    $scope.onTreeSelection = function(node) {
      $scope.categoryID = node.id;

      DataSetsFactory.getItems($scope).then(function(d) {
        $scope.marketPlace.data = d;
      });
    }

    Restangular.one('categories').getList().then(function(treeData) {
      $scope.treeData = treeData;
    });
  }]);

})(angular, window.bunsen);
