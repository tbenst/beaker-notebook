module.exports = function(app) {
  var PublicationsController = app.Controllers.PublicationsController;

  app.get('/api/publications', PublicationsController.index);
  app.get('/api/publications/:id', PublicationsController.get);
  app.put('/api/publications/:id', PublicationsController.update);
  app.del('/api/publications/:id', PublicationsController.destroy);
  app.post('/api/publications', PublicationsController.create);
  app.post('/api/publications/:id/copy', PublicationsController.copy);
};
