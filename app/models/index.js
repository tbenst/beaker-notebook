knex = require('knex');

module.exports.init = function(app, configPath) {
  var configPath = configPath || '../config.js';

  app.Models = app.Models || {};

  var fs      = require('fs'),
    path      = require('path'),
    Bookshelf = require('bookshelf'),
    _         = require('lodash-contrib'),
    config    = {};

  try {
    config = require(configPath)[process.env["NODE_ENV"] || "development"];
  } catch(e) {
    throw new Error('Error reading config from '+configPath)
  }

  var DB = app.DB || Bookshelf.initialize(knex(config));

  //When creating relationships bookshelf adds pivot keys
  //The pivot keys return incorrectly after being formatted and parsed so we should just ignore them
  var re = new RegExp("^(pivot)", "i");
  DB.Model = DB.Model.extend({
    format: function(attrs) {
      return _.reduce(attrs, function(memo, val, key) {
        if (!re.test(key)) {
          memo[_.snakeCase(key)] = val;
        }
        return memo;
      }, {});
    },

    parse: function(attrs) {
      return _.reduce(attrs, function(memo, val, key) {
        if (!re.test(key)) {
          memo[_.camelCase(key)] = val;
        }
        return memo;
      }, {});
    }

  });


  function hasTimestamps(model) {
    return model.extend({
      hasTimestamps: true
    });
  }

  fs.readdirSync(__dirname)
    .filter(function(file) {
      return (file.indexOf('.') !== 0) && (file !== 'index.js')
    })
    .forEach(function(file) {
      var model = require(path.join(__dirname, file))(DB, app)
      app.Models[model.name] = hasTimestamps(model.model);
    });

  app.DB = DB;
  app.config = config;

  return app;
};
