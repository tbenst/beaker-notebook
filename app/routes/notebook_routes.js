module.exports = function(app) {

  var NotebooksController = app.Controllers.NotebooksController;

  app.get('/api/users/:user_id/projects/:project_id/notebooks', NotebooksController.index);
  app.post('/api/users/:user_id/projects/:project_id/notebooks', NotebooksController.create);
  app.get('/api/users/:user_id/projects/:project_id/notebooks/:notebook_name', NotebooksController.get);
  app.put('/api/users/:user_id/projects/:project_id/notebooks/:notebook_name', NotebooksController.update);
};
