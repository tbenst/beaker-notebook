;(function(app) {
  app.directive('closeNotebook', [
    'Notebooks',
    '$rootScope',
    '$compile',
    function(
      Notebooks,
      $rootScope,
      $compile) {

    return {
      restrict: 'A',
      scope: {},
      link : function(scope, element, attrs) {
        attrs.$observe("closeNotebook", function(v) {
          if (!v.length) return;
          element.bind('click', function() {
            if ($rootScope.cachedNotebooks[v] !== undefined &&  $rootScope.cachedNotebooks[v].current.edited) {
              $rootScope.$apply(function() {
                // This event modifies a $scope that controls modal visibility,
                // so needs to be called inside .$apply
                scope.notebookId = v;
                $rootScope.$broadcast('openModal', $compile(templates.close_notebook_modal())(scope));
              });
            } else {
              Notebooks.closeNotebook(v);
            }
          });
          element.on('$destroy', function() {
            element.unbind('click');
          });
        });
      }
    }
  }]);
})(window.bunsen);
