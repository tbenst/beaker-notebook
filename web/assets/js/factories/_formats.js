;(function(app) {
  app.factory('FormatsFactory', ['MarketplaceRestangular', function(MR) {
    return {
      getFormats: function() {
        return MR.all('formats').getList();
      }
    };
  }]);
})(window.bunsen);
