module.exports.init = function(app) {
  require('./instances_routes.js')(app);
  return app;
};
