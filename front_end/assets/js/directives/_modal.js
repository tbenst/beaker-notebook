;(function(angular, app) {
  app.directive('modal', function() {
    return {
      restrict: 'E',
      template: templates.modal,
      controller: ['$scope', '$element', function($scope, $element) {
        $scope.modalShown = false;

        $scope.$on('openModal', function(e, content) {
          $element.find('section').empty().append(content);
          $scope.modalShown = true;
        });

        $scope.$on('closeModal', function(e) {
          $scope.modalShown = false;
        });
      }]
    }
  });
})(angular, window.bunsen);
