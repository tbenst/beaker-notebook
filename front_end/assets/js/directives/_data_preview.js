;(function(angular, app) {
  app.directive('datasheetPreview', function() {
    return {
      restrict: 'E',
      scope: {
        item:  "=",
        table: "="
      },
      template: templates.data_previews,
      controller: ['$scope', function($scope) {
        $scope.hasPreviews = function () {
          if (!$scope.item.dataPreviews) {
            return false
          }
          return $scope.item.dataPreviews.length || $scope.item.csvPreview !== null
        }
        $scope.isActive = function (tab) {
          return $scope.item.tabView === tab;
        }
      }]
    }
  });
})(angular, window.bunsen);
