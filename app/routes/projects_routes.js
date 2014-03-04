module.exports = function(app) {

  var ProjectsController = app.Controllers.ProjectsController;

  app.param('project_id', ProjectsController.projectIdParam);

  app.get('/api/users/:user_id/projects', ProjectsController.index);
  app.post('/api/users/:user_id/projects', ProjectsController.create);
  app.get('/api/users/:user_id/projects/:project_id', ProjectsController.get);
  app.put('/api/users/:user_id/projects/:project_id', ProjectsController.update);
  app.del('/api/users/:user_id/projects/:project_id', ProjectsController.destroy);
};
