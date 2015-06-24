;(function(angular, app) {
  app.controller('publication-cell-latex-markdown', function($scope, $element, $attrs) {
    var contentAttribute = $scope.cell.type === 'section' ? 'title' : 'body';
    var body = $scope.cell[contentAttribute];
    if (_.isArray(body)) {
      body = body.join("\n");
    }
    var markdownFragment = $('<div>' + body + '</div>');
    renderMathInElement(markdownFragment[0], {
      delimiters: [
        {left: "$$", right: "$$", display: true},
        {left: "$", right:  "$", display: false},
        {left: "\\[", right: "\\]", display: true},
        {left: "\\(", right: "\\)", display: false}
      ]
    });
    $element.html(marked(markdownFragment.html(), {gfm: true}));
    markdownFragment.remove();
  });

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
