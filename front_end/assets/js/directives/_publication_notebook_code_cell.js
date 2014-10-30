;(function(angular, app) {
  app.controller('publication-cell-code', function($scope) {
    $scope.toggleCollapsed = function(zone) {
      $scope.cell[zone] = $scope.cell[zone] || {};
      $scope.cell[zone].collapsed = !$scope.cell[zone].collapsed
    }
  });

  app.directive('publicationCellCode', function() {
    return {
      scope: {
        cell: "="
      },
      restrict: "E",
      template: templates.publication_cell_code
    }
  });
})(angular, window.bunsen);
