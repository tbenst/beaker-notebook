!(function(app) {

  app.factory('CachedRestangular', ['Restangular', function(Restangular) {
    return Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setDefaultHttpFields({cache: true});
    });
  }]);

})(window.bunsen);
