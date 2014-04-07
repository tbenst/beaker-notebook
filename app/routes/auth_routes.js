module.exports = function(app) {
  var AuthController = app.Controllers.AuthController;

  app.post('/api/authenticate', AuthController.authenticate);
}
