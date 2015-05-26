;(function(angular, app) {
  app.factory('VendorsFactory', ['Restangular', 'MarketplaceRestangular', function(R, MR) {

    return {
      getVendor: function(vendorId) {
        return R.one('vendors', vendorId).get();
      },

      getVendors: function() {
        return MR.all('vendors').getList();
      },

      getMarketplaceVendors: function() {
        return MR.all('vendors').getList();
      },

      update: function(attrs) {
        return R.one('vendors', attrs.id).customPUT(attrs);
      },

      destroy: function(id) {
        return MR.one('vendor', id).remove();
      },

      create: function(attrs) {
        return MR.all('vendors').post(attrs);
      }
    };
  }]);
})(angular, window.bunsen);
