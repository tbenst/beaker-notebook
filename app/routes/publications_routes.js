module.exports = function(app) {
  var PublicationsController = app.Controllers.PublicationsController;

  app.get('/api/publications/:id', PublicationsController.get);
  app.post('/api/publications', PublicationsController.create);
};
