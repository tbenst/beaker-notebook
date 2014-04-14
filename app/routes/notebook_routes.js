module.exports = function(app) {

  var NotebooksController = app.Controllers.NotebooksController;

  app.get('/api/projects/:project_id/notebooks', NotebooksController.index);
  app.post('/api/projects/:project_id/notebooks', NotebooksController.create);
  app.get('/api/projects/:project_id/notebooks/:notebook_name', NotebooksController.get);
  app.get('/api/projects/:project_id/notebooks/:notebook_name/contents', NotebooksController.notebookContents);
  app.put('/api/projects/:project_id/notebooks/:notebook_name', NotebooksController.update);
};
