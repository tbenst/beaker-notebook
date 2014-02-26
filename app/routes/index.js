module.exports.init = function(app) {

  // DataSets
  var DataSetsController = app.Controllers.DataSetsController;

  app.param('data_set_id', DataSetsController.idParam);

  app.get('/api/data_sets', DataSetsController.index);
  app.post('/api/data_sets', DataSetsController.create);
  app.get('/api/data_sets/:data_set_id', DataSetsController.get);
  app.put('/api/data_sets/:data_set_id', DataSetsController.update);
  app.del('/api/data_sets/:data_set_id', DataSetsController.destroy);


  // Projects
  var ProjectsController = app.Controllers.ProjectsController;

  app.param('user_id', ProjectsController.userIdParam);
  app.param('project_id', ProjectsController.projectIdParam);

  app.get('/api/users/:user_id/projects', ProjectsController.index);
  app.post('/api/users/:user_id/projects', ProjectsController.create);
  app.get('/api/users/:user_id/projects/:project_id', ProjectsController.get);
  app.put('/api/users/:user_id/projects/:project_id', ProjectsController.update);
  app.del('/api/users/:user_id/projects/:project_id', ProjectsController.destroy);

  return app;
};
