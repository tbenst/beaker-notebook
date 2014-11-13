var RecordNotUniqueError = require("../lib/record_not_unique_error"),
    _ = require('lodash');

module.exports = function(app) {
  var Publication = app.Models.Publication,
      Notebook = app.Models.Notebook;

  return {
    index: function(req, res, next) {
      var searchParams = _.pick(req.query, ['category_id']);

      Publication.query({ where: searchParams })
      .fetchAll({ withRelated: 'author' })
      .then(function(publications) {
        _.each(publications.models, function(publication) {
          publication.set('languages', Publication.languages(publication.get('contents')));
        });
        res.json(publications);
      })
      .catch(next);
    },

    get: function(req, res, next) {
      Publication.withAuthor(req.params.id)
        .then(res.json.bind(res))
        .catch(next);
    },

    create: function(req, res, next) {
      Notebook.forge({ id: req.body.id, userId: req.user.id })
      .fetch({ require: true })
      .then(function(notebook) {
        return notebook.getData().then(function(data) {
          return Publication.forge({
            notebookId: req.body.id,
            userId: req.user.id,
            name: notebook.get('name'),
            contents: data,
            description: req.body.description,
            categoryId: req.body.categoryId
          })
          .save();
        });
      })
      .then(function(notebook) {
        Notebook.forge({ id: req.body.id })
        .fetch({ withRelated: 'publication' })
        .then(res.json.bind(res));
      })
      .catch(Notebook.NotFoundError, function() {
        return res.send(404);
      })
      .catch(next);
    },

    destroy: function(req, res, next) {
      req.user.publications()
      .query({where: {'publications.id': req.params.id}})
      .fetchOne()
      .then(function(publication) {
        return publication.destroy()
        .then(res.json.bind(res));
      })
      .catch(next);
    },

    copy: function(req, res, next) {
      req.user.projects()
      .query({where: {id: req.body.projectId}})
      .fetchOne({ require: true })
      .then(function(project) {
        return Publication.forge({ id: req.params.id })
        .fetch({ require: true })
        .then(function(publication) {
          return Notebook.forge({
            projectId: project.id,
            userId: req.user.id,
            name: req.body.name,
            data: JSON.parse(publication.get('contents'))
          })
          .save()
          .then(res.json.bind(res));
        })
      })
      .catch(app.Models.Project.NotFoundError, function() {
        return res.send(404);
      })
      .catch(function(e) {
        if (e instanceof RecordNotUniqueError) {
          return res.status(409).json({ error: 'That name is already taken by another notebook in that project' });
        }
        return next(e);
      })
    }
  }
};
