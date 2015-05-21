;(function(angular, app) {
  app.factory('ProjectsFactory', ["NotebookRestangular", function(NotebookRestangular) {
    var R = NotebookRestangular;

    return {
      deleteProject: function(id) {
        return R.one('projects', id).remove();
      },

      getProject: function(id) {
        return R.one('projects', id).get();
      },

      getProjects: function(scope, filterBy) {
        var query = {};

        if (filterBy !== void(0) && filterBy.length){
          query.filterBy = encodeURIComponent(filterBy);
        }

        return R.all('projects').getList(query)
      },

      createProject: function(projects) {

        function lastProjectNum() {
          var numbers = _.chain(projects).map(function(p) {
            var match = p.name.match(/^Project (\d+)/)
            if (match) {return +match[1]}
          }).compact().push(0).value();
          return Math.max.apply(Math, numbers) + 1;
        }

        return this.create({name: "Project " + lastProjectNum()}, projects);
      },

      create: function(attrs, projects) {
        return R.all('projects').post(attrs)
                .then(function(p) {
                  if (projects) {
                    projects.push(p);
                  }
                  return p
                });
      },

      update: function(publicId, attrs) {
        return R.one('projects', publicId).customPUT(attrs);
      },

    }
  }]);
})(angular, window.bunsen);
