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
})(angular);
