;(function(angular, app) {

  angular.module('publicationFilters', [])
    .filter('bodyToString', function() {
      return function(body) {
        if (_.isArray(body)) {
          return body.join("\n");
        }
        return body;
      };
    });

})(angular, window.bunsen);
