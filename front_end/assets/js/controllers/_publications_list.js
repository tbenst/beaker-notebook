;(function(app) {
  app.controller('publicationsList', ['$scope', 'Factories', function($scope, Factories) {
    var F = Factories;

    $scope.publications = {};

    F.Publications.getPublications().then(function(publications) {
      $scope.publications.list = publications;
    });
  }]);
})(window.bunsen);
