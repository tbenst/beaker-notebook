var _ = require("lodash")

module.exports = function(app) {
  var Project = app.Models.Project,
      User = app.Models.User;

  return {
    projectIdParam: function(req, res, next, id) {
      req.user.projects()
      .query()
      .where("id", "=", req.params.project_id)
      .then(function(projects) {
        if (!projects || !projects[0]) {
          throw new Error('Project not found');
        }
        req.project = Project.forge(projects[0]);
      })
      .done(next, next);
    },

    index: function(req, res, next) {
      Project.findMatching({
        userId: req.user.id,
        filterBy: decodeURIComponent(req.query.filterBy || '')
      })
      .then(res.json.bind(res))
      .catch(next);
    },

    create: function(req, res, next) {
      Project.forge(
        _.extend({},
          _.pick(req.body, "name", "description"),
          {"ownerId": req.user.get('id')}
        )
      )
      .save()
      .then(function(project) {
        res.json(project);
      })
      .catch(next);
    },

    get: function(req, res, next) {
      req.project.withNotebooks()
        .then(res.json.bind(res))
        .catch(next);
    },

    update: function(req, res, next) {
      req.project.save(_.pick(req.body,
        'name', 'description'
      ), {patch: true})
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
