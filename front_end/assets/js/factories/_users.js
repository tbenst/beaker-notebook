;(function(angular, app) {
  app.factory('UsersFactory', ['Restangular', 'UsersRestangular', function(Restangular, UsersRestangular) {
    var R = Restangular;

    return {
      getCurrentUser: function() {
        return UsersRestangular.one('user').get();
      },
      update: function(attrs) {
        return UsersRestangular.one('user').customPUT(attrs);
      },

      getContributors: function() {
        return R.all('contributors').getList();
      },
      getContributorsByCat: function(categoryId) {
        return R.all('contributors').customGET(categoryId);
      },
      getUser: function(id) {
        return UsersRestangular.one('users', id).get();
      }
    };
  }]);
})(angular, window.bunsen);
