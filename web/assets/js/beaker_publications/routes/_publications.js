;(function(angular, app, templates) {
  app.config(['$stateProvider', function setRoutes($stateProvider) {
    $stateProvider
      .state('publications', {
        abstract: true,
        views: {
          root: {
            controller: 'publicationsRoot',
            template: templates['beaker_publications/publications_root']
          }
        }
      })
      .state('publications.items', {
        url: '/publications?category_id',
        views: {
          "app@publications": {
            controller: 'publicationsList',
            template: templates['beaker_publications/publications_list']
          },
          "nav@publications": {
            controller: 'publicationsNav',
            template: templates['beaker_publications/publications_nav']
          },
        }
      })
      .state('publications.items.item', {
        url: '/:id',
        views: {
          "app@publications": {
            controller: 'publication',
            template: templates['beaker_publications/publication']
          }
        }
      });
  }]);
})(angular, window.bunsen, templates);
