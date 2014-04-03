module.exports.init = function(app, configPath) {
  var configPath = configPath || '../config.js';

  app.Models = app.Models || {};

  var fs      = require('fs'),
    path      = require('path'),
    Bookshelf = require('bookshelf'),
    _         = require('lodash'),
    config    = {};

  try {
    config = require(configPath);
  } catch(e) {
    throw new Error('Error reading config from '+configPath)
  }

  config = config[app.get('env')] || config["development"];

  var DB = Bookshelf.initialize(config.database);

  fs.readdirSync(__dirname)
    .filter(function(file) {
      return (file.indexOf('.') !== 0) && (file !== 'index.js')
    })
    .forEach(function(file) {
      var model = require(path.join(__dirname, file))(DB, app)
      app.Models[model.name] = model.model;
    });

  app.DB = DB;

  return app;
};
