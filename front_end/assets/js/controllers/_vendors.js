;(function(angular, app) {
  app.controller('vendors', [
    '$scope',
    '$state',
    'Factories',
    '$q',
    function(
      $scope,
      $state,
      F,
      $q) {
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
          .catch(errorMessage)
          .finally(function() {
            $scope.loading = false;
            $scope.vendor.name = null;
          });
        };

        $scope.deleteVendors = function() {
          $q.all(_.map($scope.vendors, function(vendor) {
            if(vendor.delete)
              return F.Vendors.destroy(vendor.id);
          }))
          .then(getVendors)
          .catch(errorMessage);
        };

        function getVendors() {
          F.Vendors.getVendors().then(function(vendors) {
            $scope.vendors = vendors;
          });
        };

        function errorMessage(err) {
          $scope.message = "Error: " + err.statusText;
        };
  }]);
})(angular, window.bunsen);
