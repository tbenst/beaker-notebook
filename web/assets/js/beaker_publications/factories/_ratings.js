;(function(angular, app) {
  app.factory('RatingsFactory', ['Restangular', function(R) {
    return {
      createRating: function(publicationId, params) {
        return R.one('publications', publicationId).all('ratings').post(params);
      },

      averageRating: function(publicationId) {
        return R.one('publications', publicationId).one('ratings').get();
      },

      userRating: function(publicationId) {
        return R.one('publications', publicationId).one('rating').get();
      }
    };
  }]);
})(angular, window.bunsen);
