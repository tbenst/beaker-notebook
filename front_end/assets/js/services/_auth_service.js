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
        researcherRedirect: function() {
          if(!_.has($sessionStorage.user, 'role') || $sessionStorage.user.role == 0) {
            $state.go('projects.items');
          }
        }
      }
  }]);
})(window.bunsen);
