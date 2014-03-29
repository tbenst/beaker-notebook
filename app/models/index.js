module.exports.init = function(app) {
  app.Models = app.Models || {};

  var fs      = require('fs'),
    path      = require('path'),
    Bookshelf = require('bookshelf'),
    _         = require('lodash'),
    config    = {};

  try {
    config = require('../config.js');
  } catch(e) {
    throw new Error('Error reading config from config.js')
  }

  config = config[app.get('env')] || config["development"];

  var DB = Bookshelf.initialize(config.database);

  fs.readdirSync(__dirname)
    .filter(function(file) {
      return (file.indexOf('.') !== 0) && (file !== 'index.js')
    })
    .forEach(function(file) {
      var model = sequelize.import(path.join(__dirname, file));
      app.Models[model.name] = model;
    });

  app.DB = DB;

  return app;
};
