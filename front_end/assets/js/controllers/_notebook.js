!(function(angular, app) {
  app.controller('notebook', ['$scope', '$state', '$sce','Factories', 'UrlGeneratorService', function($scope, $state, $sce, Factories, UrlGeneratorService) {
    var F = Factories;

    $scope.projects.search = '';
    $scope.projects.list = [];

    var beakerUrl = function(subPath, params) {
      return "http://" + window.location.hostname + ":8801/beaker/#/" +
        subPath + "?" + UrlGeneratorService.toParams(params);
    }

    var notebookLocation = function(userId, projectId, notebookName) {
      var bunsenUri = "http://" + window.location.hostname + ":3000/api/users/" +
        [userId, 'projects', projectId, 'notebooks', notebookName, 'contents'].
        join('/');

      return beakerUrl("open", {
        uri: bunsenUri,
        userId: userId,
        projectId: projectId,
        notebookName: notebookName
      });
    };

    var newNotebookLocation = function(userId, projectId) {
      return beakerUrl("session/new", {userId: userId, projectId: projectId});
    };

    F.Projects.getProject($state.params.id).then(function(project) {
      $scope.project = project;
    });

    F.Notebooks.getNotebook($state.params.id, $state.params.name).then(function(notebook) {

      var userId = $scope.project.parentResource.id;
      var projectId = $scope.project.id;

      if (notebook.name) {
        $scope.notebookLocation = $sce.trustAsResourceUrl(notebookLocation(userId, projectId, notebook.name));
      } else {
        notebook = {name: "New Notebook"};
        $scope.notebookLocation  = $sce.trustAsResourceUrl(newNotebookLocation(userId, projectId));
      }
      $scope.notebook = notebook;
    });
  }]);
} (angular, window.bunsen));
