!(function(angular, app) {
  app.controller('marketItem', ['$scope', '$rootScope', '$state', 'Factories', 'Restangular', '$sessionStorage', 'DataFormatService', function($scope, $rootScope,$state, Factories, Restangular, $sessionStorage, DataFormatService) {
    var R = Restangular;
    var F = Factories;
    var DFS = DataFormatService;

    var toUTCDate = function(date){
      var utc = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),  date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
      return utc;
    };

    var millisToUTCDate = function(millis){
      return toUTCDate(new Date(millis));
    };

    $scope.item = {};

    F.DataSets.getDataSet($state.params.id).then(function(d) {
      $scope.item = d;
      $scope.subscribed = !!(_.findWhere(d.users, {id: $sessionStorage.currentUser.id}));
      if ($scope.item.csvPreview) {
        $scope.item.tabView = 'table';
        $scope.tableDataPreview = DFS.buildTable($scope.item);
      }
      else if ($scope.item.dataPreviews !== undefined ) {
        $scope.item.tabView = 'thumbnail';
      }

      $scope.item.startDate = millisToUTCDate($scope.item.startDate)
    });

    F.Vendors.getVendors({}).then(function(v) {
      $scope.marketPlace.vendors = v;
    });

    if (_.contains($rootScope.referrer.fromState.name, 'subscriptions')) {
      $scope.referrerList = 'subscriptions.items';
    } else {
      $scope.referrerList = 'marketPlace.items';
    }

    $scope.searchByVendor = function(id) {
      $scope.newSearch({vendorScope: [id.toString()]});
    };

    $scope.unsubscribe = function() {
       R.one('subscriptions', $state.params.id).remove().then(function(d) {
        $scope.subscribed = false;
       });
    }

    $scope.subscribe = function() {
       R.one('subscriptions', $state.params.id).put().then(function(d) {
        $scope.subscribed = true;
       });
    }
  }]);
})(angular, window.bunsen);
