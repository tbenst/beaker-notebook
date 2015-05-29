;(function(app) {
  app.service('NotebookRestangular', [
    'Restangular',
    function(R) {
        return R.withConfig(function(config){
          config.setBaseUrl('notebook/v1');
        });
      }
  ]);
})(window.bunsen);
