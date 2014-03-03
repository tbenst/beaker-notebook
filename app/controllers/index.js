module.exports.init = function(app) {
  module.exports.DataSetsController = require('./data_sets_controller.js')(app);
  module.exports.ProjectsController = require('./projects_controller.js')(app);
  module.exports.UsersController    = require('./users_controller.js')(app);

  return app;
};
