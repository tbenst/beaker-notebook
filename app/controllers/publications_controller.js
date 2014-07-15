module.exports = function(app) {
  var Publication = app.Models.Publication;
      Notebook = app.Models.Notebook;

  return {
    create: function(req, res, next) {
      Notebook.forge({ id: req.body.id, userId: req.user.id })
      .fetch({ require: true })
      .then(function(notebook) {
        return notebook.save({ description: req.body.description }, { patch: true });
      })
      .then(function(notebook) {
        return notebook.getData().then(function(data) {
          return Publication.forge({
            notebook_id: req.body.id,
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
