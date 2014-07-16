;(function(app) {
  app.service('BeakerUrlGeneratorService', ['$location', 'UrlGeneratorService', function($location, UrlGeneratorService) {
    var uiUrl = $location.absUrl().split("#")[0];

    return {
      fromParams: function(params) {
        return window.BUNSEN_SERVICES.beaker + "#/" + "open?" +
          UrlGeneratorService.toParams(_.extend(params, {bunsenUiUrl: uiUrl}));
      }
    }
  }]);
})(window.bunsen);
