!(function(angular, app) {
  app.controller('marketItem', [
    '$scope',
    '$rootScope',
    '$state',
    'Factories',
    'Restangular',
    '$sessionStorage',
    'DataFormatService',
    function(
      $scope,
      $rootScope,
      $state,
      Factories,
      Restangular,
      $sessionStorage,
      DataFormatService) {

    var R = Restangular;
    var F = Factories;
    var DFS = DataFormatService;

    $scope.item = {};

    F.DataSets.getDataSet($state.params.index, $state.params.id).then(function(d) {
      $scope.item = Restangular.stripRestangular(d);
      $scope.subscribed = _.contains(d.subscriberIds, $sessionStorage.currentUser.id);
      if ($scope.item.csvPreview) {
        $scope.item.tabView = 'table';
        $scope.tableDataPreview = DFS.buildTable($scope.item);
      }
      else if ($scope.item.dataPreviews !== undefined ) {
        $scope.item.tabView = 'thumbnail';
      }
    });

    if (_.contains($rootScope.referrer.fromState.name, 'subscriptions')) {
      $scope.referrerList = 'subscriptions.items';
    } else {
      $scope.referrerList = 'marketPlace.items';
    }

    $scope.searchByVendor = function(vendor) {
      $scope.newSearch({vendorScope: [vendor]});
    };

    function restangularSubscription() {
      return R.all('subscriptions').one($state.params.index, $state.params.id);
    }

    $scope.unsubscribe = function() {
      restangularSubscription().remove().then(function(d) {
        $scope.subscribed = false;
      });
    }

    $scope.subscribe = function() {
      restangularSubscription().put().then(function(d) {
        $scope.subscribed = true;
      });
    }
  }]);
})(angular, window.bunsen);
