;(function(angular, app) {
  app.factory('PublicationsFactory', ['Restangular', function(Restangular) {
    var R = Restangular;

    return {
      getPublications: function(params) {
        return R.all('publications').getList(params);
      },

      getPublicationCount: function(categoryId) {
        return R.one('publication_count').customGET('', {category_id: categoryId});
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
