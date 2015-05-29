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
      template: templates['publications/publication_cell']
    }
  }]);

  app.directive('publicationCellSection', function() {
    return {
      scope: {
        cell: "="
      },
      restrict: "E",
      template: templates['publications/publication_cell_section']
    }
  });

  app.directive('publicationCellMarkdown', function() {
    return {
      scope: {
        cell: "="
      },
      restrict: "E",
      template: templates['publications/publication_cell_markdown']
    }
  });

  app.directive('publicationCellText', function() {
    return {
      scope: {
        cell: "="
      },
      restrict: "E",
      template: templates['publications/publication_cell_text']
    }
  });

  app.directive('publicationLatex', function() {
    return {
      scope: {
        cell: "="
      },
      restrict: "E",
      link: function(scope, el) {
        katex.render(scope.cell.output.result.object,
          el[0].firstChild
        );
      },
      template: templates['publications/publication_cell_latex']
    }
  });
})(angular, window.bunsen);
