!(function(angular, app) {

  app.controller('marketPlace', ['$scope', 'Restangular', 'VendorsFactory', 'DataSetsFactory', 'RelatedTagsFactory', function($scope, Restangular, VendorsFactory, DataSetsFactory, RelatedTagsFactory) {

    function getDataSets() {
      DataSetsFactory.getItems($scope.marketPlace).then(function(d) {
        $scope.marketPlace.data = d;
      });

      RelatedTagsFactory.getItems($scope.marketPlace).then(function(tags) {
        $scope.marketPlace.relatedTags = tags;
      });
    }

    Restangular.one('data_tags').getList().then(function(d) {
      $scope.tags = d;
    });

    Restangular.one('data_sets').getList("formats").then(function(d) {
      $scope.formats = d;
    });

    VendorsFactory.then(function(v) {
      $scope.marketPlace.vendors = v;
    });

    $scope.$watch('marketPlace.typeScope', getDataSets);
    $scope.$watch('marketPlace.vendorScope', getDataSets);
    $scope.$watch('marketPlace.tagScope', getDataSets);
  }]);

})(angular, window.bunsen);
