;(function(app) {
  app.service('UsersRestangular', [
    'Restangular',
    function(R) {
        return R.withConfig(function(config) {
          config.setBaseUrl('user/v1');
        });
      }
  ]);
})(window.bunsen);
