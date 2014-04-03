var _ = require('lodash');

module.exports.init = function(app) {

  require('./data_sets_routes.js')(app);
  require('./categories_routes.js')(app);
  require('./projects_routes.js')(app);
  require('./users_routes.js')(app);
  require('./notebook_routes.js')(app);
  require('./vendor_routes.js')(app);
  require('./tag_routes.js')(app);

  return app;
};
