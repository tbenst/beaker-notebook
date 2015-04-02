!(function(app) {
  app.controller('application', [
    '$scope',
    '$state',
    function(
      $scope,
      $state) {
      $state.go('publications.items');
  }]);
})(window.bunsen);
