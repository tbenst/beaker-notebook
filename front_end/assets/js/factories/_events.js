;(function(angular, app) {
  app.factory('EventsFactory', [
    "Restangular",
    function(R) {
    return {
      create: function(attrs) {
        return R.one('events').post(attrs);
      },
    };
  }]);
})(angular, window.bunsen);
