;(function(angular, app) {
  app.factory('PublicationsFactory', ['Restangular', function(Restangular) {
    var R = Restangular;

    return {
      getPublications: function(params) {
        return R.all('publications').getList(params);
      },

      getPublication: function(publicationId) {
        return R.one('publications', publicationId).get();
      },

      copy: function(id, options) {
        return R.one('publications', id).post('copy', options);
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
