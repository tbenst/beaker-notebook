;(function(angular, app) {
  app.controller('vendors', [
    '$scope',
    '$state',
    'Factories',
    function(
      $scope,
      $state,
      F) {
        $scope.vendors = {};
        $scope.loading = false;

        getVendors();

        $scope.clear = function(form) {
          form.$setPristine();
        };

        $scope.createVendor = function(isValid) {
          if (!isValid) return;

          $scope.loading = true;
          F.Vendors.create($scope.vendor).then(function(vendor) {
            $scope.vendor = vendor;
            $scope.message = "Vendor Created";
            getVendors();
          })
          .catch(function(err) {
            $scope.message = "Error: " + err.data;
          })
          .finally(function() {
            $scope.loading = false;
            $scope.vendor.name = null;
          });
        };

        $scope.deleteVendor = function(vendor) {
          F.Vendors.destroy(vendor.id).then(getVendors);
        };

        function getVendors() {
          F.Vendors.getVendors().then(function(vendors) {
            $scope.vendors = vendors;
          });
        };
  }]);
})(angular, window.bunsen);
