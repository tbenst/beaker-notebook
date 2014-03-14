!(function(angular, app) {
  function buildQuery($scope) {
    var query = {};

    if ($scope.vendorScope !== void(0) && $scope.vendorScope.length > 0) {
      query.vendorIDs = encodeURIComponent($scope.vendorScope.join(","));
    }

    if ($scope.categoryID !== void(0)) {
      query.categoryID = encodeURIComponent($scope.categoryID);
    }

    return query;
  }

  app.controller('marketPlace', ['$scope', 'Restangular', function($scope, Restangular) {
    Restangular.one('vendors').getList().then(function(d) {
      $scope.vendors = d;
    });

    $scope.$watch('vendorScope', function(value) {
      Restangular.one('data_sets').getList("", buildQuery($scope)).then(function(d) {
        $scope.data = d;
      })
    });

    $scope.treeOptions = {
      nodeChildren: "children",
      dirSelectable: true,
    }

    $scope.onTreeSelection = function(node) {
      $scope.categoryID = node.id;

      Restangular.one('data_sets').getList("", buildQuery($scope)).then(function(d) {
        $scope.data = d;
      })
    }

    Restangular.one('categories').getList().then(function(treeData) {
      $scope.treeData = treeData;
    });
  }]);
})(angular, window.bunsen);
