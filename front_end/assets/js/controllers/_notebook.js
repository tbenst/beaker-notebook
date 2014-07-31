!(function(angular, app) {
  app.controller('notebook', ['$scope', '$state', '$sce', 'Factories', 'BeakerUrlGeneratorService', 'Restangular', '$compile', '$sessionStorage', '$location', 'Notebooks', 'WindowMessageService', function($scope, $state, $sce, Factories, BeakerUrlGeneratorService, Restangular, $compile, $sessionStorage, $location, Notebooks, WindowMessageService) {
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

    $scope.publish = function() {
      F.Notebooks.publish($scope.notebook).then(function(notebook) {
        $scope.notebook = notebook;
        $scope.$emit('closeModal');
      });
    };

    $scope.cancelPublish = function() {
      $scope.$emit('closeModal');
    };

    $scope.destroyPublication = function() {
      F.Publications.destroy($scope.notebook.publication).then(function(notebook) {
        $scope.notebook = notebook;
      });
    };

    $scope.openPublishModal = function() {
      $scope.$emit('openModal', $compile(templates.publish_notebook_modal())($scope), { width: '400px' });
    };

    $scope.$watchCollection('projects.list', function() {
      $scope.project = _.find($scope.projects.list, {id: parseInt($state.params.id)});
    });

    $scope.$watch('notebook', function(newVal) {
      if (!newVal) return;

      $scope.published = !_.isEmpty($scope.notebook.publication);
    });
  }]);
} (angular, window.bunsen));
