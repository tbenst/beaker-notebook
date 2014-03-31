!(function(app) {

  app.factory('VendorsFactory', ['CachedRestangular', function(CachedRestangular) {
    return CachedRestangular.one('vendors').getList();
  }]);

})(window.bunsen);
