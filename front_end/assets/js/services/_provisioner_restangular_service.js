;(function(app) {
  app.service('ProvisionerRestangular', [
    'Restangular',
    function(R) {
        return R.withConfig(function(config){
          config.setBaseUrl('provisioner/v1');
        });
      }
  ]);
})(window.bunsen);
