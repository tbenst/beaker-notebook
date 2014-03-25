!(function(app) {

  app.controller('application', function($scope, VendorsFactory) {
    $scope.marketPlace  = {};
    $scope.projects     = {};

    $scope.vendorName = function(item) {
      var vendor = _.findWhere($scope.marketPlace.vendors, {id: item.vendorId});
      return vendor ? vendor.name : '';
    };
  });

})(window.bunsen);
