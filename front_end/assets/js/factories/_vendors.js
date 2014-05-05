!(function(app) {

  app.factory('VendorsFactory', ['Restangular', function(Restangular) {
    return {
      getVendors: function() {
        return Restangular.one('vendors').getList();
      }
    }
  }]);

})(window.bunsen);
