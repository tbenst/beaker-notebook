;(function(angular, app) {
  app.factory('RatingsFactory', ['Restangular', 'MarketplaceRestangular', function(R, MR) {
    return {
      createPubRating: function(params) {
        return R.all('ratings').post(params);
      },

      averagePubRating: function(params) {
        return R.one('ratings').customGET('average', params);
      },

      userPubRating: function(params) {
        return R.one('ratings').customGET('user_rating', params);
      },

      createRating: function(params) {
        return MR
          .one('indices', params.index)
          .one('datasets', params.id)
          .all('rating')
          .post(params);
      },

      averageRating: function(params) {
        return MR
          .one('indices', params.index)
          .one('datasets', params.id)
          .one('average-rating').get()
          .then(function(result) {
            return result.data.average;
          });
      },

      userRating: function(params) {
        return MR
          .one('indices', params.index)
          .one('datasets', params.id)
          .one('rating').get()
          .then(function(result) {
            return result.data.score;
          });
      }
    };
  }]);
})(angular, window.bunsen);
