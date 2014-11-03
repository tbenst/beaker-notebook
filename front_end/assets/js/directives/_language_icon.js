;(function(angular, app) {
  var languages = {
    Html: { symbol: 'Ht', color: '#E54F1F' },
    Latex: { symbol: 'La', color: 'white', borderColor: '#4C5353', textColor: 'black' },
    IPython: { symbol: 'Py', color: '#EFBE3A' },
    JavaScript: { symbol: 'JS', color: '#F0DD44', textColor: '#464549' },
    Node: { symbol: 'N', color: '#8CC64B' },
    R: { symbol: 'R', color: '#8394BD' },
    Julia: { symbol: 'Ju', color: '#6CAD5A' },
    Ruby: { symbol: 'Ru', color: '#B11400' },
    Groovy: { symbol: 'Gr', color: '#6297AA' }
  };

  app.directive('languageIcon', function() {
    return {
      restrict: 'E',
      template: templates.language_icon,
      scope: {
        lang: '='
      },
      link: function(scope, element, attrs) {
        _.extend(scope, languages[scope.lang]);
      }
    }
  });
})(angular, window.bunsen);
