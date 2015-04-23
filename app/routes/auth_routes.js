module.exports = function(app) {
  var AuthController = app.Controllers.AuthController;

  app.post('/api/forgot_password', AuthController.forgotPassword);
  app.post('/api/change_password', AuthController.changePassword);
}
