;(function(angular, app) {
  var languages = {
    Html: { symbol: 'Ht', color: '#E3502B' },
    Latex: { symbol: 'La', color: '#FFFFFF', borderColor: '#3D4444', textColor: '#030303' },
    JavaScript: { symbol: 'Js', color: '#F0E8F0', textColor: '#4A4A4A' },
    Groovy: { symbol: 'Gr', color: '#6497A9' },
    IPython: { symbol: 'Py', color: '#EEBD48' },
    Python3: { symbol: 'Py', color: '#EEBD48' },
    Matlab: { symbol: 'Mt', color: '#6497A9' },
    R: { symbol: 'R', color: '#8495BB' },
    Scala: { symbol: 'Sc', color: '#B41703' },
    Clojure: { symbol: 'Cj', color: '#5881d8' },
    Kdb: { symbol: 'K', color: '#005e99' },
    Java: { symbol: 'Jv', color: '#EB0000' },
    Julia: { symbol: 'Jl', color: '#6CAC5E' },
    IRuby: { symbol: 'Rb', color: '#AF1712' },
    Node: { symbol: 'N', color: '#8EC453' }
  };

  app.directive('languageIcon', function() {
    return {
      restrict: 'E',
      template: templates.language_icon,
      scope: {
        lang: '='
      },
      link: function(scope, element, attrs) {
        _.extend(scope, _.defaults(languages[scope.lang], {
          borderColor: 'transparent'
        }));
      }
    }
  });
})(angular, window.bunsen);
