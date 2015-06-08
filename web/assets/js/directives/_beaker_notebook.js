;(function(angular) {
  angular.module("beakerNotebook", [])
    .directive('beakernotebook', [
      '$rootScope',
      'BeakerNotebookService',
      'FullscreenState',
      function($rootScope,
               BeakerNotebookService,
               FullscreenState) {

    return {
      restrict: 'E',
      scope: {
        notebook: "=",
        height: "@"
      },
      template: templates['directives/beakernotebook'],
      link: function(scope, element) {

        scope.isFullscreen = FullscreenState.isFullscreen;

        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
          if (toState.name == "projects.items.item.notebook"
              && scope.beakerSessionId !== void(0)
              && scope.beakerSessionId !== toParams.notebook_id) {
            // remove notebook from the page before new one renders
            scope.beakerSessionId = void(0);
            scope.beakerNotebook = void(0);
            scope.openFromUri = void(0);
          }
        });

        $rootScope.$on('notebookReadyToRender', function(e, notebookDetails) {
          scope.beakerSessionId = notebookDetails.beakerSessionId;
          scope.beakerNotebook = notebookDetails.beakerNotebook;
          scope.openFromUri = notebookDetails.openFromUri;
        });
      }
    }
  }]);
})(angular);
