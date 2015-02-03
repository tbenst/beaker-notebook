;(function(angular, app) {
  app.controller('vendors', [
    '$scope',
    '$state',
    'Factories',
    function(
      $scope,
      $state,
      F) {
        $scope.vendor = {};
        $scope.loading = false;

        $scope.cancel = function() {
          $state.go('admin.index');
        };

        $scope.createVendor = function(isValid) {
          if (!isValid) return;

          $scope.loading = true;
          F.Vendors.create($scope.vendor).then(function(vendor) {
            $scope.vendor = vendor;
            $scope.message = "Vendor Created";
          })
          .catch(function(err) {
            $scope.message = "Error: " + err.data;
          })
          .finally(function() {
            $scope.loading = false;
          });
        };
  }]);
})(angular, window.bunsen);
