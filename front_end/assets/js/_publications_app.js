!(function(angular) {
  window.bunsen = angular.module('publications',
    ['ui.router',
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
     'hljs',
     'hc.marked',
     'ui.grid',
     'ui.grid.autoResize'
    ], ['RestangularProvider', function(RestangularProvider) {
      RestangularProvider.setBaseUrl('/publications/v1');
    }]);

  window.bunsen.run(['$templateCache', function($templateCache){
    $templateCache.put('publication_cell_markdown', templates['beaker_publications/publication_cell_markdown']())
    $templateCache.put('publication_cell_code', templates['beaker_publications/publication_cell_code']())
    $templateCache.put('publication_cell_text', templates['beaker_publications/publication_cell_text']())
    $templateCache.put('publication_cell_section', templates['beaker_publications/publication_cell_section']())
    $templateCache.put('publication_output_html', templates['beaker_publications/publication_output_html']())
    $templateCache.put('publication_output_table', templates['beaker_publications/publication_output_table']())
    $templateCache.put('publication_output_raw', templates['beaker_publications/publication_output_raw']())
    $templateCache.put('publication_output_empty', templates['beaker_publications/publication_output_empty']())
    $templateCache.put('publication_output_error', templates['beaker_publications/publication_output_error']())
    $templateCache.put('publication_output_latex', templates['beaker_publications/publication_output_latex']())
  }])
})(angular);
