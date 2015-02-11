!(function(angular) {
  window.bunsen = angular.module('bunsen',
    ['ui.router',
     'ui.bootstrap',
     'restangular',
     'treeControl',
     'marketPlaceFilters',
     'truncate',
     'ngStorage',
     'ngCookies',
     'beakerNotebook',
     'angularFileUpload',
     'stopEvent',
     'filterMarketPlace',
     'sticky',
     'hiddenUpload',
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
      RestangularProvider.setBaseUrl('/api');
    }]);

  window.bunsen.run(['$templateCache', function($templateCache){
    $templateCache.put('publication_cell_markdown', templates['publications/publication_cell_markdown']())
    $templateCache.put('publication_cell_code',     templates['publications/publication_cell_code']())
    $templateCache.put('publication_cell_text',     templates['publications/publication_cell_text']())
    $templateCache.put('publication_cell_section',  templates['publications/publication_cell_section']())
    $templateCache.put('publication_output_html',    templates['publications/publication_output_html']())
    $templateCache.put('publication_output_table',    templates['publications/publication_output_table']())
    $templateCache.put('publication_output_raw',    templates['publications/publication_output_raw']())
    $templateCache.put('publication_output_empty',    templates['publications/publication_output_empty']())
    $templateCache.put('publication_output_error',    templates['publications/publication_output_error']())
    $templateCache.put('publication_output_latex',    templates['publications/publication_output_latex']())
  }])
})(angular);
