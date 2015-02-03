;(function(angular, app) {
  app.factory('RatingsFactory', ['Restangular', function(Restangular) {
    var R = Restangular;

    return {
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
