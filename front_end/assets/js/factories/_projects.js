;(function(angular, app) {
  app.factory('ProjectsFactory', ["Restangular", function(Restangular) {
    var R = Restangular;

    return {
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
