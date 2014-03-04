module.exports.init = function(app) {
  app.Models = app.Models || {};

  var fs = require('fs'),
    path = require('path'),
    Sequelize = require('sequelize'),
    _ = require('lodash');

  try {
    config = require('../config/config.json');
  } catch(e) {
    throw new Error('Error reading Sequelize config from /config/config.json')
  }

  if (config[app.get('env')]) {
    config = config[app.get('env')];
  } else {
    throw new Error("'" + app.get('env') + "'" + "environment not defined in /config/config.json")
  }

  var sequelize = new Sequelize(config['database'], config['username'], config['password'], {dialect: "postgres"});

  fs.readdirSync(__dirname)
    .filter(function(file) {
      return (file.indexOf('.') !== 0) && (file !== 'index.js')
    })
    .forEach(function(file) {
      var model = sequelize.import(path.join(__dirname, file));
      app.Models[model.name] = model;
    });

  Object.keys(app.Models).forEach(function(modelName) {
    if ('associate' in app.Models[modelName]) {
      app.Models[modelName].associate(app.Models);
    }
  });

  app.sequelize = sequelize;
  app.Sequelize = Sequelize;

  return app;
};
