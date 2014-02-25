module.exports.init = function(app) {
  module.exports.DataSetsController = require('./data_sets_controller.js')(app);

  return app;
}
