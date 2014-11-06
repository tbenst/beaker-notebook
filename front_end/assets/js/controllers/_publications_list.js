;(function(app) {
  app.controller('publicationsList', [
    '$scope',
    '$stateParams',
    'Factories',
    function($scope, $stateParams, Factories) {
      var F = Factories;
      var categoryID = $stateParams.category_id;

      F.Publications.getPublications($stateParams).then(function(publications) {
        $scope.publications.currentCategory = categoryID;
        $scope.publications.list = publications;
        $scope.publications.quantity = publications.length;
      });

      F.PublicationCategories.getCategory(categoryID).then(function(category) {
        $scope.publications.category = (categoryID !== null) ? category : null;
      });
    }
  ]);
})(window.bunsen);
