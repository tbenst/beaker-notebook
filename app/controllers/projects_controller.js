module.exports = function(app) {

  var Project = app.Models.Project,
      User = app.Models.User;

  return {
    projectIdParam: function(req, res, next, id) {
      req.user.getProjects({where: {id: req.params.project_id}})
        .then(function(projects) {
          if (!projects || !projects[0]) {
            throw new Error('Project not found');
          }
          req.project = projects[0];
        })
        .done(next, next);
    },

    index: function(req, res, next) {
      Project.findMatching({
        userId: req.user.id,
        filterBy: req.query.filterBy
      }).then(function(projects) {
        res.json(projects);
      }).catch(next);
    },

    create: function(req, res, next) {
      Project.create(req.body, ['name', 'description'])
        .then(function(project) {
          return req.user.addProject(project);
        })
        .then(function(project) {
          res.json(project);
        })
        .catch(next);
    },

    get: function(req, res, next) {
      res.json(req.project);
    },

    update: function(req, res, next) {
      req.project.updateAttributes(req.body, ['name', 'description'])
        .then(function(project) {
          res.json(project);
        })
        .catch(next);
    },

    destroy: function(req, res, next) {
      req.project.destroy()
        .then(function(project) {
          res.json(project);
        })
        .catch(next);
    }
  };
};
