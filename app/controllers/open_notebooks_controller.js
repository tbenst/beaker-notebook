module.exports = function(App) {
  var OpenNotebook = App.Models.OpenNotebook;

  return {
    index: function(req, res, next) {
      req.user.openNotebooks().query().then(res.json.bind(res))
      .catch(next);
    },

    close: function(req, res, next) {
      OpenNotebook.forge({
        userId: req.user.id,
        projectId: req.query.projectId,
        notebookName: req.query.notebookName
      }).fetch().then(function(openNotebook) {
        return openNotebook.destroy().then(res.json.bind(res));
      }).catch(next);
    },

    add: function(req, res, next) {
      var notebook = OpenNotebook.forge({
        userId: req.user.id,
        projectId: req.body.projectId,
        notebookName: req.body.notebookName
      });

      notebook.fetch().then(function(n) {
        if (n !== null) {
          return res.json(n);
        } else {
          return notebook.save().then(res.json.bind(res));
        }
      }).catch(next);
    }
  }
};
