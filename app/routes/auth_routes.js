module.exports = function(app) {
  var AuthController = app.Controllers.AuthController;

  app.post('/api/session', AuthController.authenticate);
  app.del('/api/session', AuthController.signOut);
  app.post('/api/sign_up', AuthController.signUp);
  app.post('/api/forgot_password', AuthController.forgotPassword);
  app.post('/api/change_password', AuthController.changePassword);
}
