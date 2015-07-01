;(function(angular, app) {
  app.factory('UsersFactory', [
      'NotebookRestangular',
      'UsersRestangular',
      function(
        NR,
        UsersRestangular) {

    return {
      getCurrentUser: function() {
        return UsersRestangular.one('user').get();
      },
      update: function(attrs) {
        return UsersRestangular.one('user').customPUT(attrs);
      },

      getContributors: function() {
        return NR.all('contributors').getList();
      },
      getContributorsByCat: function(categoryId) {
        return NR.one('categories', categoryId).one('contributors').get();
      },
      getUser: function(id) {
        return UsersRestangular.one('users', id).get();
      },
      resetPassword: function(attrs) {
        return UsersRestangular.all('password').post(attrs);
      },
      changePassword: function(attrs) {
        return UsersRestangular.one('password').customPUT(attrs);
      },
    };
  }]);
})(angular, window.bunsen);
