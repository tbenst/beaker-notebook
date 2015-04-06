;(function(angular, app) {
  app.directive('marketplaceItem', function() {
    return {
      scope: {
        item: '='
      },
      restrict: 'E',
      template: templates['directives/marketplace_item'],
      controller: ['$scope', 'AuthService', function($scope, AuthService) {
        if (AuthService.isUserAdmin()) {
          $scope.isAdmin = true;
        }
      }]
    };
  });
})(angular, window.bunsen);
