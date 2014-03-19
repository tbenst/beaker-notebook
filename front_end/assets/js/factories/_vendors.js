!(function(app) {

  app.factory('VendorsFactory', function(CachedRestangular) {
    return CachedRestangular.one('vendors').getList();
  });

})(window.bunsen);
