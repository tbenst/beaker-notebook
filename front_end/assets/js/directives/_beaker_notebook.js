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
        scope.$watch("notebook", function(nu, old) {
          if (nu == void 0) {
            return ;
          }

          BeakerNotebookService.renderFrame(scope.notebook.current, scope.height);

          element.on('$destroy', function() {
            BeakerNotebookService.hideFrame(scope.notebook.current);
          });

        }, true)
      }
    }
  }]);
})(angular);
