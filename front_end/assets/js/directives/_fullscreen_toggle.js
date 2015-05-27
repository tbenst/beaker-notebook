;(function(angular, app) {
  app.directive('fullscreenToggle', ['FullscreenState', 'UserPreferences', function(FullscreenState, UserPreferences) {
    return {
      restrict: 'E',
      template: templates['fullscreen_toggle'],
      scope: {},
      controller: ['$scope', function($scope) {
        $scope.isFullscreen = FullscreenState.isFullscreen;

        $scope.toggleFullscreen = function() {
          UserPreferences.set('fullscreenView', !$scope.isFullscreen());
          FullscreenState.toggleFullscreen(!$scope.isFullscreen());
        };
      }]
    };
  }]);
})(angular, window.bunsen);
