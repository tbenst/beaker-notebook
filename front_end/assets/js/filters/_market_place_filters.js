!(function(angular, app) {

  angular.module('marketPlaceFilters', [])
    .filter('names', function() {
      return function(inputArray) {
        return _.map(inputArray, function(i) {
          return i.name;
        }).join(", ");
      };
    });

})(angular, window.bunsen);

