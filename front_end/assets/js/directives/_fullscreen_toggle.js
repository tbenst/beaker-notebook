;(function(angular, app) {
  app.directive('fullscreenToggle', [
    'Sticky',
    'FullscreenState',
    'UserPreferences',
    function(
      Sticky,
      FullscreenState,
      UserPreferences) {
    return {
      restrict: 'E',
      template: templates['fullscreen_toggle'],
      scope: {},
      controller: ['$scope', function($scope) {
        $scope.isFullscreen = FullscreenState.isFullscreen;

        $scope.toggleFullscreen = function() {
          UserPreferences.set('fullscreenView', !$scope.isFullscreen());
          FullscreenState.toggleFullscreen(!$scope.isFullscreen());
          Sticky.reflow();
        };
      }]
    };
  }]);
})(angular, window.bunsen);
