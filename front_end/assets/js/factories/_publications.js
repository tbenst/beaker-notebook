;(function(angular, app) {
  app.factory('PublicationsFactory', ['NotebookRestangular', function(R) {
    return {
      getPublications: function(params) {
        return R.all('publications').getList(params);
      },

      getPublicationCount: function(params) {
        return R.one('publications_count').customGET('', params)
        .then(function(d) {
          return d.count;
        });
      },

      getPublication: function(publicationId) {
        return R.one('publications', publicationId).get();
      },

      copy: function(id, options) {
        return R.one('publications', id).post('copy', options);
      },

      destroy: function(publicationId) {
        return R.one('publications', publicationId).remove();
      }
    };
  }]);
})(angular, window.bunsen);
