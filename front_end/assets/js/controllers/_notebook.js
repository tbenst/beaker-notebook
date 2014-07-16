!(function(angular, app) {
  app.controller('notebook', ['$scope', '$state', '$sce', 'Factories', 'BeakerUrlGeneratorService', 'Restangular', '$sessionStorage', '$location', 'Notebooks', 'WindowMessageService', function($scope, $state, $sce, Factories, BeakerUrlGeneratorService, Restangular, $sessionStorage, $location, Notebooks, WindowMessageService) {
    var F = Factories;

    $scope.projects.search = '';

    F.Notebooks.getNotebook($state.params.notebook_id).then(function(notebook) {
      var userId = $sessionStorage.currentUser.id
      var notebookLocation = BeakerUrlGeneratorService.fromParams({
        uri: Restangular.one('notebooks', notebook.id).one('contents').getRestangularUrl(),
        userId: userId,
        projectId: notebook.projectId,
        notebookId: notebook.id
      });

      $scope.notebookLocation = $sce.trustAsResourceUrl(notebookLocation);
      $scope.notebook = notebook;

      Notebooks.update({id: notebook.id, open: true});
    });

    $scope.$watchCollection('projects.list', function() {
      $scope.project = _.find($scope.projects.list, {id: parseInt($state.params.id)});
    });
  }]);
} (angular, window.bunsen));
