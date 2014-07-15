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
          }
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
