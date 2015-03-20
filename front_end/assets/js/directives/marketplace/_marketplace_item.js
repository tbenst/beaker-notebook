;(function(angular, app) {
  app.directive('marketplaceItem', function() {
    return {
      scope: {
        item: '='
      },
      restrict: "E",
      template: templates['directives/marketplace_item']
    };
  });
})(angular, window.bunsen);
