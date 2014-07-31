module.exports = function(app) {
  var Publication = app.Models.Publication,
      Notebook = app.Models.Notebook;

  return {
    index: function(req, res, next) {
      Publication.forge()
      .fetchAll({ withRelated: 'notebook' })
      .then(res.json.bind(res))
      .catch(next);
    },

    get: function(req, res, next) {
      Publication.forge({ id: req.params.id })
      .fetch({ withRelated: 'notebook' })
      .then(res.json.bind(res))
      .catch(next);
    },

    create: function(req, res, next) {
      Notebook.forge({ id: req.body.id, userId: req.user.id })
      .fetch({ require: true })
      .then(function(notebook) {
        return notebook.save({ description: req.body.description }, { patch: true });
      })
      .then(function(notebook) {
        return notebook.getData().then(function(data) {
          return Publication.forge({
            notebookId: req.body.id,
            contents: data,
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
    }
  }
};
