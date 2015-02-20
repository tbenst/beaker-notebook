;(function(angular, app) {
  app.directive('editVendorModal', [
    '$compile',
    'Factories',
    '$rootScope',
    function($compile, F, $rootScope) {
    return {
      restrict: 'A',
      scope: {
        vendor: '='
      },
      link: function($scope, element) {
        element.on('click', function() {
          $scope.$apply(function() {
            $scope.vendorName = $scope.vendor.name;
            $scope.$emit('openModal', $compile(templates.edit_vendor())($scope));
          });
        });

        element.on('$destroy', function() {
          element.off('click');
        });

        $scope.update = function() {
          F.Vendors.update({ id: $scope.vendor.id, name: $scope.vendorName }).then(function(vendor) {
            $scope.vendor.name = vendor.name;
            $rootScope.$broadcast('closeModal');
            delete $scope.error;
          }).catch(function(response) {
            $scope.error = response.data.error;
          });
        };

        $scope.cancel = function() {
          $scope.vendorName = $scope.vendor.name;
          $rootScope.$broadcast('closeModal');
        };
      }
    }
  }]);
})(angular, window.bunsen);
