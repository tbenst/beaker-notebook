!(function(angular, app) {
  app.controller('notebook', ['$scope', '$state', '$sce','Factories', 'UrlGeneratorService', '$sessionStorage', function($scope, $state, $sce, Factories, UrlGeneratorService, $sessionStorage) {
    var F = Factories;
    var frame;
    $scope.projects.search = '';
    $scope.projects.list = [];

    $scope.closeNotebook = function(projectId, notebookName) {
      F.Notebooks.close.apply(this, arguments).then(function(openNotebooks) {
        $scope.$parent.openNotebooks = openNotebooks;
        if (frame = document.querySelector("iframe[src='"+$scope.notebookLocation.toString()+"']")) {
          document.body.removeChild(frame);
        }
        $state.go('^');
      })
    }

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
      var userId    = $sessionStorage.currentUser.id
      var projectId = $scope.project.id;

      if (notebook.name) {
        $scope.notebookLocation = $sce.trustAsResourceUrl(notebookLocation(userId, projectId, notebook.name));
      } else {
        notebook = {name: "New Notebook"};
        $scope.notebookLocation  = $sce.trustAsResourceUrl(newNotebookLocation(userId, projectId));
      }

      F.Notebooks.open(projectId, notebook.name).then(function(openNotebooks) {
        $scope.$parent.openNotebooks = openNotebooks;
      });

      F.RecentNotebooks.add({
        notebookName: notebook.name,
        projectId: $state.params.id
      }).then(function(d) {
        $scope.$parent.recentNotebooks = d.recentNotebooks;
      })

      $scope.notebook = notebook;
    });
  }]);
} (angular, window.bunsen));
