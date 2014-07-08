;(function(angular, app) {
  app.directive('notice', function() {
    return {
      restrict: 'E',
      template: templates['directives/notice'],
      scope: {
        message: '='
      },
      link: function(scope) {
        scope.dismiss = function() {
          scope.message = '';
        };
      }
    }
  });
})(angular, window.bunsen);
