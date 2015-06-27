;(function(angular, app) {
  app.factory('RatingsFactory', ['MarketplaceRestangular', 'NotebookRestangular', function(MR, NR) {
    return {
      createPubRating: function(publicationId, params) {
        return NR.one('publications', publicationId).all('ratings').post(params);
      },

      averagePubRating: function(publicationId) {
        return NR.one('publications', publicationId).one('ratings').get();
      },

      userPubRating: function(publicationId) {
        return NR.one('publications', publicationId).one('rating').get();
      },

      createRating: function(params) {
        return MR
          .one('catalogs', params.catalogId)
          .one('datasets', params.id)
          .all('rating')
          .post(params);
      },

      averageRating: function(params) {
        return MR
          .one('catalogs', params.catalogId)
          .one('datasets', params.id)
          .one('average-rating').get()
          .then(function(result) {
            return result.data.average;
          });
      },

      userRating: function(params) {
        return MR
          .one('catalogs', params.catalogId)
          .one('datasets', params.id)
          .one('rating').get()
          .then(function(result) {
            return result.data.score;
          });
      }
    };
  }]);
})(angular, window.bunsen);
