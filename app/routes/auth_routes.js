module.exports = function(app) {
  var AuthController = app.Controllers.AuthController;

  app.post('/api/authenticate', AuthController.authenticate);
  app.post('/api/sign_up', AuthController.signUp);
  app.post('/api/forgot_password', AuthController.forgotPassword);
  app.post('/api/change_password', AuthController.changePassword);
  app.post('/api/sign_out', AuthController.signOut);
}
