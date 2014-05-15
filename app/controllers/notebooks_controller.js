var path      = require('path');
var _         = require("lodash");
var nodefn    = require("when/node/function")
var readFile  = nodefn.lift(require("fs").readFile)

var RecordNotUniqueError = require("../lib/record_not_unique_error");

module.exports = function(app) {
  var Notebook = app.Models.Notebook;
  return {
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
        data: JSON.parse(req.body.data)
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
      Notebook.load({
        projectId: req.project.id,
        name: req.params.notebook_name
      })
      .then(res.json.bind(res))
      .catch(next);
    },

    notebookContents: function(req, res, next) {
      Notebook.load({
        projectId: req.project.id,
        name: req.params.notebook_name
      })
      .then(function(data) {
        res.json(data.data);
      })
      .catch(next);
    },

    update: function(req, res, next) {
      Notebook.forge({
        projectId: req.project.id,
        name: req.params.notebook_name,
      })
      .fetch()
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
        projectId: +req.body.projectId,
        name: req.body.notebookName
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
        projectId: req.query.projectId,
        name: req.query.notebookName
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
