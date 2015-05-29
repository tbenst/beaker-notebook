;(function(angular, app) {

  app.directive('publicationHero', function() {
    return {
      restrict: "E",
      scope: {
        publications: '='
      },
      template: templates['beaker_publications/publications_category_hero']
    }
  });

})(angular, window.bunsen);
