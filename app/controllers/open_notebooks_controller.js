var _ = require('lodash');

module.exports = function(App) {
  var OpenNotebook = App.Models.OpenNotebook;

  function getOpenNotebooks(req, res) {
    return req.user.openNotebooks().query()
    .then(res.json.bind(res));
  }

  return {
    index: function(req, res, next) {
      getOpenNotebooks.apply(this, arguments)
      .catch(next);
    },

    close: function(req, res, next) {
      OpenNotebook.forge({
        userId: req.user.id,
        projectId: req.query.projectId,
        notebookName: req.query.notebookName
      })
      .fetch().then(function(openNotebook) {
        if (openNotebook !== null) {
          return openNotebook.destroy();
        }
      })
      .then(_.partial(getOpenNotebooks, req, res))
      .catch(next);
    },

    add: function(req, res, next) {
      var notebook = OpenNotebook.forge({
        userId: req.user.id,
        projectId: req.body.projectId,
        notebookName: req.body.notebookName
      });

      notebook.fetch().then(function(n) {
        if (n !== null) {
          return getOpenNotebooks(req, res);
        } else {
          return notebook.save().then(_.partial(getOpenNotebooks, req, res));
        }
      }).catch(next);
    }
  }
};
