;(function(angular, app) {
  app.directive('authToggle', function() {
    return {
      restrict: "E",
      template: templates['auth/auth_toggle'],
      scope: {},
      link: function($scope, elm, attrs) {
        switch (attrs.defaultState) {
          case 'signUp':
            $scope.signUp = true;
          break;
          case 'signIn':
            $scope.signUp = false;
          break;
          default:
            $scope.signUp = false;
        }
      }
    };
  });
})(angular, window.bunsen);
