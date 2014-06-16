;(function(app) {
  app.directive('closeNotebook', ['Notebooks', function(Notebooks) {
    return {
      restrict: 'A',
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
