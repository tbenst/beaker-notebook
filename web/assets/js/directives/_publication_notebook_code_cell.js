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
        };

        $scope.getOutputResult = function() {
          return $scope.cell.output.result;
        };

        $scope.getOutputDisplayType = function() {
          if ($scope.cell.output === undefined)
              return "Text";
          var type = $scope.cell.output.selectedType;
          // if BeakerDisplay or UpdatableEvaluationResult, use the inner type instead
          if (type === "BeakerDisplay") {
            var result = $scope.getOutputResult();
            type = result ? result.innertype : "Hidden";
          }
          return type;
        };

        // to be used in bkOutputDisplay
        $scope.outputDisplayModel = {
          getCellModel: function() {
            var result = $scope.getOutputResult();
            if (result && result.type === "BeakerDisplay") {
              return result.object;
            } else if (result && result.type === "UpdatableEvaluationResult") {
                return result.payload;
            } else {
              return result;
            }
          },
          getDumpState: function() {
            return $scope.cell.output.state;
          },
          resetShareMenuItems: function(newItems) {
            // do nothing...
          },
        };

      },
      template: templates['publications/publication_cell_code_output']
    }
  });
})(angular, window.bunsen);
