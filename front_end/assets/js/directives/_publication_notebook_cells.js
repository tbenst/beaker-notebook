;(function(angular, app) {
  app.directive('publicationCell', ['$compile', function($compile) {
    return {
      restrict: "E",
      scope: {
        cell: "="
      },
      controller: function($scope) {
        $scope.getCellTypeUrl = function() {
          return "publication_cell_"+$scope.cell.type;
        }
      },
      template: templates.publication_cell
    }
  }]);

  app.directive('publicationCellSection', function() {
    return {
      scope: {
        cell: "="
      },
      restrict: "E",
      template: templates.publication_cell_section
    }
  });

  app.directive('publicationCellMarkdown', function() {
    return {
      scope: {
        cell: "="
      },
      restrict: "E",
      template: templates.publication_cell_markdown
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

  app.directive('publicationCellText', function() {
    return {
      scope: {
        cell: "="
      },
      restrict: "E",
      template: templates.publication_cell_text,
    }
  });
})(angular, window.bunsen);
