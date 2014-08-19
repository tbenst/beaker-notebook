module.exports = function(app) {

  var ProjectsController = app.Controllers.ProjectsController;

  app.param('project_id', ProjectsController.projectIdParam);

  app.get('/api/projects', ProjectsController.index);
  app.post('/api/projects', ProjectsController.create);
  app.put('/api/projects/:project_id', ProjectsController.update);
  app.del('/api/projects/:project_id', ProjectsController.destroy);
};
