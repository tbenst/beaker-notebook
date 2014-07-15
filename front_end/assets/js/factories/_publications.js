;(function(angular, app) {
  app.factory('PublicationsFactory', ['Restangular', function(Restangular) {
    var R = Restangular;

    return {
      getPublication: function(publicationId) {
        return R.one('publications', publicationId).get();
      },
    };
  }]);
})(angular, window.bunsen);
