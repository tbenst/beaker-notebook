module.exports = function(app) {
  var NotebooksController = app.Controllers.NotebooksController;

  app.param('notebook_id', NotebooksController.notebookIdParam);

  app.get('/api/projects/:project_id/notebooks', NotebooksController.index);
  app.post('/api/projects/:project_id/notebooks', NotebooksController.create);
  app.post('/api/projects/:project_id/notebooks/import', NotebooksController.import);
  app.get('/api/notebooks/:notebook_id', NotebooksController.get);
  app.get('/api/notebooks/:notebook_id/contents', NotebooksController.notebookContents);
  app.put('/api/notebooks/:notebook_id', NotebooksController.update);

  app.get("/api/open_notebooks", NotebooksController.openNotebooks);
  app.get("/api/recent_notebooks", NotebooksController.recentNotebooks);
  app.post("/api/open_notebook", NotebooksController.openNotebook);
  app.del("/api/open_notebook", NotebooksController.closeNotebook);
};
