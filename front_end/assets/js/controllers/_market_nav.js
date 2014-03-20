!(function(angular, app) {

  app.controller('marketNav', ['$scope', '$state', 'Restangular', 'DataSetsFactory', 'RelatedTagsFactory', function($scope, $state, Restangular, DataSetsFactory, RelatedTagsFactory) {
    $scope.treeOptions = {
      nodeChildren: "children",
      dirSelectable: true,
    }

    $scope.onTreeSelection = function(node) {
      $state.go('marketPlace');
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
