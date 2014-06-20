;(function(app) {
  app.directive('confirm', ['$rootScope', '$compile', function($rootScope, $compile) {
    return {
      restrict: 'A',
      scope: {
        onConfirm: '&'
      },
      link: function(scope, element, attrs) {
        scope.message = attrs.confirm;

        scope.accept = function() {
          scope.onConfirm.apply();
          $rootScope.$broadcast('closeModal');
        };

        scope.cancel = function() {
          $rootScope.$broadcast('closeModal');
        };

        element.on('click', function() {
          $rootScope.$apply(function() {
            // This event modifies a $scope that controls modal visibility,
            // so needs to be called inside .$apply
            $rootScope.$broadcast('openModal', $compile(templates.dialog_confirm())(scope));
          });
        });

        element.on('$destroy', function() {
          element.off('click');
        })
      }
    }
  }]);
})(window.bunsen);
