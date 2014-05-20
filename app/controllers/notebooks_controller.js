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

    index: function(req, res, next) {
      Notebook.list({projectId: req.project.id})
      .then(res.json.bind(res))
      .catch(next);
    },

    create: function(req, res, next) {
      Notebook.forge({
        projectId: req.project.id,
        userId: req.user.id,
        name: req.body.name,
        data: req.body.data || require("../fixtures/base_notebook")
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
      .catch(next);
    },

    get: function(req, res, next) {
      req.notebook.withData()
        .then(res.json.bind(res))
        .catch(next);
    },

    notebookContents: function(req, res, next) {
      req.notebook.withData()
      .then(function(data) {
        res.json(data.attributes.data);
      })
      .catch(next);
    },

    update: function(req, res, next) {
      req.notebook.withData()
      .then(function(notebook) {
        var attrs = _.pick(req.body, 'data', 'projectId');
        if (attrs.data) {
          attrs.data = JSON.parse(attrs.data);
        }
        return notebook.saveUnique(attrs, {patch: true});
      })
      .then(function() {
        res.send(200);
      })
      .catch(function(e) {
        if (e instanceof RecordNotUniqueError) {
          res.status(409);
        }
        return next(e);
      })
    },

    openNotebooks: function(req, res, next) {
      Notebook.getOpen({userId: req.user.id})
      .then(res.json.bind(res))
      .catch(next);
    },

    openNotebook: function(req, res, next) {
      Notebook.forge({
        userId: +req.user.id,
        id: req.body.notebookId
      })
      .fetch()
      .then(function(notebook) {
        return notebook.save({
          "open": true
        }, {patch: true}).then(function() {
          Notebook.getOpen({userId: req.user.id})
          .then(res.json.bind(res));
        });
      })
      .catch(next);
    },

    closeNotebook: function(req, res, next) {
      app.Models.Notebook.forge({
        userId: req.user.id,
        id: req.query.notebookId
      })
      .fetch()
      .then(function(notebook) {
        return notebook.save({
          "open": false
        }, {patch: true})
      })
      .then(function() {
        return Notebook.getOpen({userId: req.user.id})
      })
      .then(res.json.bind(res))
      .catch(next);
    }
  };
};
