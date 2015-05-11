;(function(angular, app) {
  app.factory('RatingsFactory', ['Restangular', function(R) {
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
        return R.all('ratings').post(params);
      },

      averageRating: function(params) {
        return R.one('ratings').customGET('average', params);
      },

      userRating: function(params) {
        return R.one('ratings').customGET('user_rating', params);
      }
    };
  }]);
})(angular, window.bunsen);
