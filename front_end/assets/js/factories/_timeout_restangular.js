!(function(app) {
  app.factory('TimeoutRestangular', ['Restangular', function(Restangular) {
    return function(aborter) {
      return Restangular.withConfig(function(RestangularConfigurer) {
        if (aborter) {
          RestangularConfigurer.setDefaultHttpFields({timeout: aborter.promise});
        }
      });
    }
  }]);
})(window.bunsen);
