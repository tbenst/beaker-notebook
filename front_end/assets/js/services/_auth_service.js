;(function(app) {
  app.service('AuthService', [
    '$sessionStorage',
    'Factories',
    function(
      $sessionStorage,
      Factories) {

      return {
        setUserIfLoggedIn: function() {
          return Factories.Users.getUser()
          .then(function(user) {
            $sessionStorage.user = _.pick(user, 'name', 'id')
          })
        }
      }
  }]);
})(window.bunsen);
