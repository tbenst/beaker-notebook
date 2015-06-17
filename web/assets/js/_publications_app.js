!(function(angular) {
  window.bunsen = angular.module('publications',
    ['beaker',
     'ui.router',
     'ui.bootstrap',
     'restangular',
     'truncate',
     'ngStorage',
     'ngCookies',
     'angularFileUpload',
     'sticky',
     'truncate',
     'underscore.string',
     'angularSpinner',
     'angular-humanize',
     'ngSanitize',
     'beakerNotebook',
     'hljs',
     'ui.gravatar',
     'publicationFilters',
     'hc.marked'
    ], ['RestangularProvider', function(RestangularProvider) {
      RestangularProvider.setBaseUrl('/notebook/v1');
    }]);

  window.bunsen.run(['$templateCache', function($templateCache) {
    $templateCache.put('publication_cell_markdown', templates['publications/publication_cell_markdown']());
    $templateCache.put('publication_cell_code', templates['publications/publication_cell_code']());
    $templateCache.put('publication_cell_text', templates['publications/publication_cell_text']());
    $templateCache.put('publication_cell_section', templates['publications/publication_cell_section']());
  }]);
})(angular);
