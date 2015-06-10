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
      },
      template: templates['directives/beakernotebook'],
      link: function(scope, element) {

        function clearActiveNotebook() {
          scope.beakerSessionId = void 0;
          scope.beakerNotebook = void 0;
          scope.openFromUri = void 0;
        }

        scope.isFullscreen = FullscreenState.isFullscreen;

        var closeListener = $rootScope.$on('activeNotebookClosed', clearActiveNotebook);

        // when switching notebooks, remove active notebook from the
        // page before new one renders
        var stateListener = $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
          if (toState.name == "projects.items.item.notebook"
              && scope.beakerSessionId !== void(0)
              && scope.beakerSessionId !== toParams.notebook_id) {
            clearActiveNotebook();
          }
        });

        $rootScope.$on('notebookReadyToRender', function(e, notebookDetails) {
          scope.beakerSessionId = notebookDetails.beakerSessionId;
          scope.beakerNotebook = notebookDetails.beakerNotebook;
          scope.openFromUri = notebookDetails.openFromUri;
        });

        element.on('$destroy', function() {
          closeListener();
          stateListener();
        });
      }
    }
  }]);
})(angular);
