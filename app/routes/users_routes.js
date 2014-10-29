module.exports = function(app) {
  var UsersController = app.Controllers.UsersController;

  app.put('/api/subscriptions/:index/:data_set_id', UsersController.subscribe);
  app.del('/api/subscriptions/:index/:data_set_id', UsersController.unsubscribe);
};
