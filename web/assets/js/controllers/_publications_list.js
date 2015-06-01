;(function(app) {
  app.controller('publicationsList', [
    '$scope',
    '$stateParams',
    'Factories',
    '$q',
    'TrackingService',
    function(
      $scope,
      $stateParams,
      Factories,
      $q,
      TrackingService) {

      var F = Factories;
      var categoryID = $stateParams.category_id;
      var lastPromiseTime;

      function loadPublications() {
        TrackingService.mark('PublicationListLoad');
        var currentPromiseTime = Date.now();
        lastPromiseTime = currentPromiseTime;
        var query = {
              limit: $scope.publications.itemsPerPage,
              category_id: categoryID,
              offset: Math.max(($scope.publications.currentPage - 1) * $scope.publications.itemsPerPage, 0)
            };

        if ($scope.publications.search) {
          query.searchTerm = $scope.publications.search.toLowerCase();
        }

        F.Publications.getPublicationCount(query).then(function(quantity) {
          $scope.publications.quantity = quantity;
        });

        return F.Publications.getPublications(query)
        .then(function(publications) {
          return $q.all(_.map(publications, function(p) {
            return F.Users.getUser(p['author-id'])
            .then(function(u) {
              return _.extend(p, {author: u});
            })
            .catch(function() {
              return p;
            })
          }));
        })
        .then(function(publications) {
          if (currentPromiseTime >= lastPromiseTime) {
            $scope.publications.list = publications;
          }
          TrackingService.mark('PublicationListLoaded');
          TrackingService.measure('BaselinePublicationListLoad', 'PublicationListLoad', 'PublicationListLoaded');
        });
      }

      function changePage(newValue, oldValue) {
        if (newValue === oldValue) {return;}
        loadPublications().then(function() {
          window.scrollTo(0,0);
        });
      }

      $scope.publications.itemsPerPage = 10;
      $scope.publications.maxSize = 5;
      $scope.publications.currentCategory = categoryID;

      if (!$scope.publications.currentPage) {
        $scope.publications.currentPage = 1;
      }

      F.PublicationCategories.getCategory(categoryID).then(function(category) {
        $scope.publications.category = (categoryID !== null) ? category : null;
      });

      loadPublications();

      $scope.$watch('publications.currentPage', changePage);
      $scope.$watch('publications.search', loadPublications);
    }
  ]);
})(window.bunsen);
