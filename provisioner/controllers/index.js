module.exports.init = function(app) {
  app.Controllers = {
    InstancesController: require('./instances_controller.js')(app)
  };

  return app;
};
