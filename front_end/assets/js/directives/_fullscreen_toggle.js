;(function(angular, app) {
  app.directive('fullscreenToggle', ['FullscreenState', function(FullscreenState) {
    return {
      restrict: 'E',
      template: templates['fullscreen_toggle'],
      scope: {},
      controller: ['$scope', function($scope) {
        $scope.isFullscreen = FullscreenState.isFullscreen;

        $scope.toggleFullscreen = function() {
          FullscreenState.toggleFullscreen(!$scope.isFullscreen());
        };
      }]
    };
  }]);
})(angular, window.bunsen);
