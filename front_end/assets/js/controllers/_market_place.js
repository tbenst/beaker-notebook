!(function(angular, app) {

  app.controller('marketPlace', ['$scope', 'Restangular', 'VendorsFactory', 'DataSetsFactory', function($scope, Restangular, VendorsFactory, DataSetsFactory) {

    function getDataSets() {
      DataSetsFactory.getItems($scope).then(function(d) {
        $scope.marketPlace.data = d;
      });
    }

    Restangular.one('data_tags').getList().then(function(d) {
      $scope.tags = d;
    });

    VendorsFactory.then(function(v) {
      $scope.marketPlace.vendors = v;
    });

    $scope.$watch('vendorScope', getDataSets);
    $scope.$watch('tagScope', getDataSets);
  }]);

})(angular, window.bunsen);
