!(function(angular, app) {
  function buildQuery($scope) {
    var query = {};

    if ($scope.vendorScope !== void(0) && $scope.vendorScope.length > 0) {
      query.vendorIDs = encodeURIComponent($scope.vendorScope.join(","));
    }

    if ($scope.categoryID !== void(0)) {
      query.categoryID = encodeURIComponent($scope.categoryID);
    }

    if ($scope.tagScope !== void(0) && $scope.tagScope.length > 0) {
      query.tagIDs = encodeURIComponent($scope.tagScope.join(','));
    }

    return query;
  }

  app.controller('marketPlace', ['$scope', 'Restangular', function($scope, Restangular) {
    Restangular.one('vendors').getList().then(function(d) {
      $scope.vendors = d;
    });

    Restangular.one('data_tags').getList().then(function(d) {
      $scope.tags = d;
    });

    $scope.$watch('vendorScope', function(value) {
      Restangular.one('data_sets').getList("", buildQuery($scope)).then(function(d) {
        $scope.data = d;
      })
    });

    $scope.$watch('tagScope', function(value) {
      Restangular.one('data_sets').getList("", buildQuery($scope)).then(function(d) {
        $scope.data = d;
      })

    });  }]);
})(angular, window.bunsen);
