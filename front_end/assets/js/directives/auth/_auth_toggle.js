;(function(angular, app) {
  app.directive('authToggle', function() {
    return {
      restrict: "E",
      template: templates['auth/auth_toggle'],
      scope: {},
      link: function($scope, elm, attrs) {

        $scope.state = attrs.defaultState || 'signUp';

        $scope.switchState = function(state) {
          $scope.state = state;
        };

        $scope.isState = function(varArgs) {
          return _.some(varArgs, function(arg) {
            return $scope.state == arg;
          });
        };
      }
    };
  });
})(angular, window.bunsen);
