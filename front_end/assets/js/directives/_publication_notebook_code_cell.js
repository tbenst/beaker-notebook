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
      template: templates['publications/publication_cell_code']
    }
  });

  app.directive('publicationCellCodeOutput', function() {
    return {
      scope: {
        cell: "="
      },
      restrict: "E",
      controller: function($scope) {
        $scope.getOutputType = function(cell) {
          // Handle case when there is
          // no output to the published cell.
          if (cell.output.result == void 0) {
            return "publication_output_empty"
          }

          switch (cell.output.result.innertype || cell.output.result.type) {
            case "Progress":
              return "publication_output_empty";
            case "Error":
              return "publication_output_error";
            case "Html":
              return "publication_output_html";
            case "TableDisplay":
              return "publication_output_table";
            case "Latex":
              return "publication_output_latex";
            default:
              return "publication_output_raw";
          }
        }
      },
      template: templates['publications/publication_cell_code_output']
    }
  });
})(angular, window.bunsen);
