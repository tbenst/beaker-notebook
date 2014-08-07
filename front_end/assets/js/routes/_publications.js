;(function(angular, app, templates) {
  app.config(['$stateProvider', function setRoutes($stateProvider) {
    $stateProvider
      .state('publications', {
        abstract: true,
        views: {
          root: {
            controller: function() {}, // no-op
            template: templates.publications_root
          }
        }
      })
      .state('publications.items', {
        url: '/publications',
        views: {
          "app@publications": {
            controller: 'publicationsList',
            template: templates.publications_list
          },
          "nav@publications": {
            controller: function() {},
            template: templates.publications_nav
          },
        }
      })
      .state('publications.items.item', {
        url: '/:id',
        views: {
          "app@publications": {
            controller: 'publication',
            template: templates.publication
          }
        }
      });
  }]);
})(angular, window.bunsen, templates);
