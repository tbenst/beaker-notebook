;(function(app) {
  app.service('UserPreferences', [
    function() {
      return {
        set: function(key, value) {
          return localStorage.setItem(key, value);
        },
        get: function(key) {
          return JSON.parse(localStorage.getItem(key));
        }
      };
    }]);
})(window.bunsen);
