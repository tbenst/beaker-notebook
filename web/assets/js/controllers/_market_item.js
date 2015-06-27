;(function(angular, app) {
  app.controller('marketItem', [
    '$scope',
    '$rootScope',
    '$state',
    'Factories',
    'Restangular',
    '$sessionStorage',
    'DataFormatService',
    'MarketplaceRestangular',
    'AuthService',
    function(
      $scope,
      $rootScope,
      $state,
      Factories,
      Restangular,
      $sessionStorage,
      DataFormatService,
      MarketplaceRestangular,
      AuthService) {

      var R = Restangular;
      var F = Factories;
      var DFS = DataFormatService;
      var MR = MarketplaceRestangular;

      $scope.item = {};

      if (AuthService.isUserAdmin()) {
        $scope.isAdmin = true;
      }

      var unbindWatcher = $scope.$watch('user', function(v) {
        if (v) {
          getItemWithRatings();
          unbindWatcher();
        }
      });

      function getItemWithRatings() {
        $scope.ratingAttrs = {
          catalogId: $state.params.catalogId,
          id: $state.params.id.toString()
        };

        F.DataSets.getDataSet($state.params.catalogId, $state.params.id).then(function(d) {
          $scope.item = Restangular.stripRestangular(d);
          $scope.subscribed = _.contains(d.subscriberIds, $sessionStorage.user.id);
          if ($scope.item.csvPreview) {
            $scope.item.tabView = 'table';
            $scope.tableDataPreview = DFS.buildTable($scope.item);
          } else if ($scope.item.dataPreviews !== undefined) {
            $scope.item.tabView = 'thumbnail';
          }

          F.Ratings.averageRating($scope.ratingAttrs)
          .then(function(count) {
            _.extend($scope.item, {averageRating: parseFloat(count)});
          });

          F.Ratings.userRating($scope.ratingAttrs)
          .then(function(rate) {
            _.extend($scope.item, {userRating: rate});
          });
        });
      }

      if ($rootScope.referrer.fromState.name.indexOf('subscriptions') >= 0) {
        $scope.referrerList = 'subscriptions.items';
      } else {
        $scope.referrerList = 'marketPlace.items';
      }

      $scope.searchByVendor = function(vendor) {
        $scope.newSearch({vendorScope: [vendor]});
      };

      function restangularSubscription() {
        return MR.all('subscriptions').one($state.params.catalogId, $state.params.id);
      }

      $scope.unsubscribe = function() {
        restangularSubscription().remove().then(function(d) {
          $scope.subscribed = false;
        });
      };

      $scope.subscribe = function() {
        restangularSubscription().put().then(function(d) {
          $scope.subscribed = true;
        });
      };
    }]);
})(angular, window.bunsen);
