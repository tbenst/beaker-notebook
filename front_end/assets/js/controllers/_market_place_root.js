!(function(app) {

  app.controller('marketPlaceRoot', ['$scope', 'VendorsFactory', function($scope, VendorsFactory) {
    $scope.marketPlace  = {};

    $scope.vendorName = function(item) {
      var vendor = _.findWhere($scope.marketPlace.vendors, {id: item.vendorId});
      return vendor ? vendor.name : '';
    };
  }]);

})(window.bunsen);
