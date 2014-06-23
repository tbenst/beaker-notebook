;(function(app) {
  app.directive('notebookMove', ['Factories', function(Factories) {
    var F = Factories;

    return {
      restrict: 'A',
      template: templates['directives/notebook_move'],
      scope: {
        projectId: '=',
        notebook: '=',
        projects: '=',
        onMove: '&',
        onError: '&'
      },

      link: function(scope, element, attrs) {
        function filterProjects() {
          scope.otherProjects = _.reject(scope.projects, function(p) {
            return p.id === scope.projectId
          });
        }

        scope.$watch('projects', filterProjects);

        scope.moveTo = function(options) {
          F.Notebooks.update({
            id: scope.notebook.id,
            projectId: options.projectId
          })
          .then(function() {
            scope.open = false;
            scope.onMove();
          }, function(e) {
            if (e.status == 409) {
              scope.onError({
                notebook: scope.notebook.name,
                project: options.projectName
              });
            }
          })
        }
      }
    }
  }]);
})(window.bunsen);
