module.exports = function(app) {

  var InstancesController = app.Controllers.InstancesController;

  app.post('/beaker/instances', InstancesController.create);
  app.get('/beaker/instances/:id', InstancesController.get);
  app.put('/beaker/instances/:id', InstancesController.update);
};
