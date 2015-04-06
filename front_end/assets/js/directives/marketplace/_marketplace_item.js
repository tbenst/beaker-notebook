;(function(angular, app) {
  app.directive('marketplaceItem', function() {
    return {
      scope: {
        item: '='
      },
      restrict: 'E',
      template: templates['directives/marketplace_item'],
      controller: ['$scope', '$sessionStorage', function($scope, $sessionStorage) {
        if ($sessionStorage.user && $sessionStorage.user.role == 1) {
          $scope.isAdmin = true;
        }
      }]
    };
  });
})(angular, window.bunsen);
