var path      = require('path');
var _         = require("lodash");
var nodefn    = require("when/node/function")
var readFile  = nodefn.lift(require("fs").readFile)

var RecordNotUniqueError = require("../lib/record_not_unique_error");

module.exports = function(app) {
  var Notebook = app.Models.Notebook;
  return {
    notebookIdParam: function(req, res, next, id) {
      req.user.notebooks()
      .query()
      .where('id', req.params.notebook_id)
      .then(function(record) {
        if (!record || !record[0]) {
          throw new Error('Notebook not found');
        }
        req.notebook = Notebook.forge(record[0]);
      })
      .done(next, next);
    },

    byProject: function(req, res, next) {
      Notebook.list({projectId: req.project.id})
      .then(res.json.bind(res))
      .catch(next);
    },

    index: function(req, res, next) {
      req.user.notebooks()
      .fetch()
      .then(res.json.bind(res))
      .catch(next);
    },

    create: function(req, res, next) {
      var notebookContents = req.body.data ?
        JSON.parse(req.body.data) :
        require("../fixtures/base_notebook");
      Notebook.forge({
        projectId: req.project.id,
        userId: req.user.id,
        name: req.body.name,
        data: notebookContents
      })
      .save()
      .then(_.bind(res.json, res))
      .catch(next);
    },

    import: function(req, res, next) {
      readFile(req.files.file.path, 'utf8')
      .then(function(data) {
        return Notebook.forge({
          userId: req.user.id,
          projectId: req.project.id,
          name: path.basename(req.files.file.originalFilename, '.bkr'),
          data: JSON.parse(data)
        })
        .save()
      })
      .then(function() {
        res.json(200);
      })
      .catch(function(e) {
        if (e instanceof SyntaxError) {
          return res.status(422).json({
            error: 'Could not import notebook "' + req.files.file.originalFilename + '". Beaker notebooks must contain valid JSON.'
          });
        }
        return next(e);
      });
    },

    get: function(req, res, next) {
      req.notebook.withData()
      .then(function(notebook) {
        notebook.load('publication')
        .then(res.json.bind(res))
        .catch(next);
      });
    },

    notebookContents: function(req, res, next) {
      req.notebook.withData()
      .then(function(data) {
        res.json(data.attributes.data);
      })
      .catch(next);
    },

    update: function(req, res, next) {
      var attrs = _.pick(req.body, 'open', 'name', 'data', 'projectId');
      if (attrs.data) attrs.data = JSON.parse(attrs.data);
      if (attrs.open) attrs.openedAt = new Date();

      return req.notebook.saveUnique(attrs, {patch: true})
      .then(function(notebook) {
        res.json(_.omit(notebook, 'data'));
      })
      .catch(function(e) {
        if (e instanceof RecordNotUniqueError) {
          return res.status(409).json({ error: 'That name is taken by another notebook in this project.' });
        }
        return next(e);
      });
    },

    destroy: function(req, res, next) {
      req.notebook.destroy()
      .then(res.json.bind(res))
      .catch(next);
    }
  };
};
