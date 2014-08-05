module.exports = function(app) {

  var BeakerInstancesController = app.Controllers.BeakerInstancesController;

  app.get('/api/beaker', BeakerInstancesController.get);
  app.post('/api/beaker', BeakerInstancesController.create);
};
