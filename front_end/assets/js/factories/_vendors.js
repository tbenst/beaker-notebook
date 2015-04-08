;(function(angular, app) {
  app.factory('VendorsFactory', ['Restangular', 'MarketplaceRestangular', function(R, MR) {

    return {
      getVendor: function(vendorId) {
        return R.one('vendors', vendorId).get();
      },

      getVendors: function() {
        return R.all('vendors').getList();
      },

      getMarketplaceVendors: function() {
        return MR.all('vendors').getList();
      },

      update: function(attrs) {
        return R.one('vendors', attrs.id).customPUT(attrs);
      },

      destroy: function(id) {
        return R.one('vendors', id).remove();
      },

      create: function(attrs) {
        return R.all('vendors').post(attrs);
      }
    };
  }]);
})(angular, window.bunsen);
