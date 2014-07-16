module.exports = function(app) {
  var NotebooksController = app.Controllers.NotebooksController;

  app.param('notebook_id', NotebooksController.notebookIdParam);

  app.get('/api/notebooks', NotebooksController.index);
  app.get('/api/projects/:project_id/notebooks', NotebooksController.byProject);
  app.post('/api/projects/:project_id/notebooks', NotebooksController.create);
  app.post('/api/projects/:project_id/notebooks/import', NotebooksController.import);
  app.get('/api/notebooks/:notebook_id', NotebooksController.get);
  app.get('/api/notebooks/:notebook_id/contents', NotebooksController.notebookContents);
  app.put('/api/notebooks/:notebook_id', NotebooksController.update);
  app.del('/api/notebooks/:notebook_id', NotebooksController.destroy);
};
