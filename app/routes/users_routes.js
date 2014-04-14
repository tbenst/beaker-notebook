module.exports = function(app) {
  var UsersController = app.Controllers.UsersController;

  app.put('/api/subscriptions/:data_set_id', UsersController.subscribe);
  app.del('/api/subscriptions/:data_set_id', UsersController.unsubscribe);
};
