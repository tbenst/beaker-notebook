;(function(app) {
  app.service('AuthService', [
    '$state',
    '$sessionStorage',
    'Factories',
    function(
      $state,
      $sessionStorage,
      Factories) {

      return {
        setUserIfLoggedIn: function() {
          return Factories.Users.getUser()
          .then(function(user) {
            $sessionStorage.user = _.pick(user, 'name', 'id', 'role');
          })
        },
        isUserAdmin: function() {
          if($sessionStorage.user.role < 1) {
            $state.go('projects.items');
          }
        }
      }
  }]);
})(window.bunsen);
