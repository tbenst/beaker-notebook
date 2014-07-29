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

      destroy: function(publication) {
        var notebookId = publication.notebookId;

        return R.one('publications', publication.id).remove().then(function() {
          return R.one('notebooks', notebookId).get();
        });
      }
    };
  }]);
})(angular, window.bunsen);
