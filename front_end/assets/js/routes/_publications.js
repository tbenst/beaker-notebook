;(function(angular, app, templates) {
  app.config(['$stateProvider', function setRoutes($stateProvider) {
    $stateProvider
      .state('publications', {
        abstract: true,
        views: {
          root: {
            controller: function() {}, // no-op
            template: templates['publications/publications_root']
          }
        }
      })
      .state('publications.items', {
        url: '/publications?category_id',
        views: {
          "app@publications": {
            controller: 'publicationsList',
            template: templates['publications/publications_list']
          },
          "nav@publications": {
            controller: 'publicationsNav',
            template: templates['publications/publications_nav']
          },
        }
      })
      .state('publications.items.item', {
        url: '/:id',
        views: {
          "app@publications": {
            controller: 'publication',
            template: templates['publications/publication']
          }
        }
      });
  }]);
})(angular, window.bunsen, templates);
