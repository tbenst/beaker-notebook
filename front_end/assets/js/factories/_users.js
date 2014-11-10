;(function(angular, app) {
  app.factory('UsersFactory', ['Restangular', function(Restangular) {
    var R = Restangular;

    return {
      getUser: function() {
        return R.one('users').customGET('current');
      },

      getContributors: function() {
        return R.all('contributors').getList();
      }
    };
  }]);
})(angular, window.bunsen);
