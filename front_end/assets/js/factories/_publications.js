;(function(angular, app) {
  app.factory('PublicationsFactory', ['Restangular', function(Restangular) {
    var R = Restangular;

    return {
      getPublications: function() {
        return R.all('publications').getList();
      },

      getPublication: function(publicationId) {
        return R.one('publications', publicationId).get();
      },
    };
  }]);
})(angular, window.bunsen);
