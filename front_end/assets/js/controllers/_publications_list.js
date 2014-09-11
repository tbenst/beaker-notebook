;(function(app) {
  app.controller('publicationsList', [
    '$scope',
    '$stateParams',
    'Factories',
    function($scope, $stateParams, Factories) {
      var F = Factories;

      F.Publications.getPublications($stateParams).then(function(publications) {
        $scope.publications.currentCategory = $stateParams.category_id;
        $scope.publications.list = publications;
      });
    }
  ]);
})(window.bunsen);
