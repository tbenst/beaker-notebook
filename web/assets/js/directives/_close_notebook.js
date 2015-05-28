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
            Notebooks.closeNotebook(v);
          });
          element.on('$destroy', function() {
            element.unbind('click');
          });
        });
      }
    }
  }]);
})(window.bunsen);
