var path = require('path');

module.exports = function(app) {
  var Notebook = app.Models.Notebook;
  return {
    index: function(req, res, next) {
      app.Models.Notebook.list({userId: req.user.id, projectId: req.project.id})
        .then(res.json.bind(res))
        .catch(next);
    },

    create: function(req, res, next) {
      app.Models.Notebook.forge({userId: req.user.id,
        projectId: req.project.id,
        name: req.body.name,
        data: JSON.parse(req.body.data)
      }).save().then(function() {
        res.json(200);
      })
        .catch(next);
    },

    import: function(req, res, next) {
      new Notebook({userId: req.user.id,
        projectId: req.project.id,
        name: path.basename(req.files.file.originalFilename, '.bkr'),
        path: req.files.file.path
      }).save()
        .then(function() {
          res.json(200);
        })
        .catch(next);
    },

    get: function(req, res, next) {
      app.Models.Notebook.load({userId: req.user.id,
        projectId: req.project.id,
        name: req.params.notebook_name
      })
      .then(res.json.bind(res))
      .catch(next);
    },

    notebookContents: function(req, res, next) {
      app.Models.Notebook.load({userId: req.user.id,
        projectId: req.project.id,
        name: req.params.notebook_name
      })
        .then(function(data) {
          res.json(data.data);
        })
        .catch(next);
    },

    update: function(req, res, next) {
      app.Models.Notebook.update({userId: req.user.id,
        projectId: req.project.id,
        name: req.params.notebook_name,
        data: JSON.parse(req.query.data)
      })
        .then(function() {
          res.json(200);
        })
        .catch(next);
    }
  };
};
