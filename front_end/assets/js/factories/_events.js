;(function(angular, app) {
  app.factory('EventsFactory', [
    "Restangular",
    function(R) {
      return R.withConfig(function(config) {
        config.setBaseUrl('');
      });
  }]);
})(angular, window.bunsen);
