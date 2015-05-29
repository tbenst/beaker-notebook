;(function(app) {
  app.service('LastViewed', [
    '$state',
    '$sessionStorage',
    function($state, $sessionStorage) {
      return {
        set: function(section) {
          $sessionStorage.lastViewed = $sessionStorage.lastViewed || {};

          return $sessionStorage.lastViewed[section] = {
            name: $state.current.name,
            params: $state.params
          };
        },
        get: function(section) {
          $sessionStorage.lastViewed = $sessionStorage.lastViewed || {};

          return $sessionStorage.lastViewed[section];
        },
        clear: function(section) {
          $sessionStorage.lastViewed = $sessionStorage.lastViewed || {};

          $sessionStorage.lastViewed[section] = null;
        }
      };
    }]);
})(window.bunsen);
