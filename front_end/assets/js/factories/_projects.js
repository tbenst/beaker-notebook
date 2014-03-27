;(function(angular, app) {
  app.factory('ProjectsFactory', ["Restangular", function(Restangular) {
    var R = Restangular;

    return {
      deleteProject: function(id) {
        return R.one('users', window.userID).one('projects', id).remove();
      },

      getProject: function(id) {
        return R.one('users', window.userID).one('projects', id).get();
      },

      getProjects: function(scope, filterBy) {
        var query = {};

        if (filterBy !== void(0) && filterBy.length){
          query.filterBy = encodeURIComponent(filterBy);
        }

        return R.one('users', window.userID)
                .getList('projects', query)
      },

      createProject: function(projects) {
        return R.one('users', window.userID)
                .all('projects').post({
                  name: "sample project " + Math.random()
                })
                .then(function(p) {
                  projects.push(p);
                });
      }

    }
  }]);
})(angular, window.bunsen);
