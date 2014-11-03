;(function(angular, app) {
  parsePublication = function(publication) {
    if (publication == void(0)) {
      return {}
    }

    try {
      return JSON.parse(publication);
    } catch (e) {
      console.warn
      &&
      console.warn("Unable to Parse Publication Notebook Contents");
      return {}
    }
  }

  app.directive('publicationNotebook', function() {
    return {
      restrict: 'E',
      scope: {
        publication: '='
      },
      template: templates['publications/publication_notebook'],
      link: function(scope, elm) {
        scope.$watch('publication', function(nu, old) {
          if (nu != old) {
            scope.cells = parsePublication(nu.contents).cells;
          }
        })
      }
    }
  });
})(angular, window.bunsen);
