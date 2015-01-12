;(function(angular) {
  angular.module("beakerNotebook", [])
  .directive('beakernotebook', ['BeakerNotebookService', function(BeakerNotebookService) {
    return {
      restrict: 'E',
      scope: {
        notebook: "=",
        height: "@"
      },
      link: function(scope, element) {
        scope.$watch("notebook.current.location", function(location) {
          if (location == void 0) return;

          BeakerNotebookService.renderFrame(scope.notebook.current, scope.height);

          element.on('$destroy', function() {
            BeakerNotebookService.hideFrame(scope.notebook.current);
          });

        }, true)
      }
    }
  }]);
})(angular);
