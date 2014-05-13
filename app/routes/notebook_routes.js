module.exports = function(app) {
  var NotebooksController = app.Controllers.NotebooksController;

  app.get('/api/projects/:project_id/notebooks', NotebooksController.index);
  app.post('/api/projects/:project_id/notebooks', NotebooksController.create);
  app.post('/api/projects/:project_id/notebooks/import', NotebooksController.import);
  app.get('/api/projects/:project_id/notebooks/:notebook_name', NotebooksController.get);
  app.get('/api/projects/:project_id/notebooks/:notebook_name/contents', NotebooksController.notebookContents);
  app.put('/api/projects/:project_id/notebooks/:notebook_name', NotebooksController.update);

  app.get("/api/open_notebooks", NotebooksController.openNotebooks);
  app.post("/api/open_notebook", NotebooksController.openNotebook);
  app.del("/api/open_notebook", NotebooksController.closeNotebook);
};
