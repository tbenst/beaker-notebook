;(function(angular, app) {
  app.directive('modal', function() {
    return {
      restrict: 'E',
      template: templates.modal,
      link: function(scope, element) {
        scope.modalShown = false;

        scope.$on('openModal', function(e, content, options) {
          scope.width = options && options.width;
          scope.class = options && options.class;
          angular.element(element).find('section').empty().append(content);
          scope.modalShown = true;
        });

        scope.$on('closeModal', function(e) {
          scope.modalShown = false;
        });
      }
    }
  });
})(angular, window.bunsen);
