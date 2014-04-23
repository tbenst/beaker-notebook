module.exports = function(app) {
  var RecentNotebooksController = app.Controllers.RecentNotebooksController;

  app.post('/api/recent_notebooks', RecentNotebooksController.create);
  app.get('/api/recent_notebooks', RecentNotebooksController.index);
}
