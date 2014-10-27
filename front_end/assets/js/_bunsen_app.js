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
     'hljs'
    ], ['RestangularProvider', function(RestangularProvider) {
      RestangularProvider.setBaseUrl('/api');
    }]);

  window.bunsen.run(['$templateCache', function($templateCache){
    $templateCache.put('publication_cell_markdown', templates['publication_cell_markdown']())
    $templateCache.put('publication_cell_code',     templates['publication_cell_code']())
    $templateCache.put('publication_cell_text',     templates['publication_cell_text']())
    $templateCache.put('publication_cell_section',  templates['publication_cell_section']())
  }])
})(angular);
