;(function(app) {
  app.factory('TagsFactory', [
    'MarketplaceRestangular',
    function(MR) {
      return {
        getTags: function() {
          return MR.all('tags').getList();
        },
      };
    }]);
})(window.bunsen);
