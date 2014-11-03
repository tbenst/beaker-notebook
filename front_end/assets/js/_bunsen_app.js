!(function(angular) {
  window.bunsen = angular.module('bunsen',
    ['ui.router',
     'ui.bootstrap',
     'restangular',
     'treeControl',
     'marketPlaceFilters',
     'truncate',
     'ngStorage',
     'beakerNotebook',
     'angularFileUpload',
     'stopEvent',
     'filterMarketPlace',
     'sticky',
     'hiddenUpload',
     'truncate',
     'underscore.string',
     'angularSpinner',
     'ngSanitize',
     'hljs',
     'hc.marked'
    ], ['RestangularProvider', function(RestangularProvider) {
      RestangularProvider.setBaseUrl('/api');
    }]);

  window.bunsen.run(['$templateCache', function($templateCache){
    $templateCache.put('publication_cell_markdown', templates['publications/publication_cell_markdown']())
    $templateCache.put('publication_cell_code',     templates['publications/publication_cell_code']())
    $templateCache.put('publication_cell_text',     templates['publications/publication_cell_text']())
    $templateCache.put('publication_cell_section',  templates['publications/publication_cell_section']())
    $templateCache.put('publication_output_obj',    templates['publications/publication_output_obj']())
    $templateCache.put('publication_output_raw',    templates['publications/publication_output_raw']())
    $templateCache.put('publication_output_empty',    templates['publications/publication_output_raw']())
  }])
})(angular);
