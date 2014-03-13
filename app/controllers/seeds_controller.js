var W       = require('when');
var _       = require('lodash');
module.exports = function(app) {

  return {
    clear: function(req, res, next) {
      var modelNames = _(app.Models).keys().filter(function(key) {
        return !!app.Models[key].tableName;
      });

      W.map(modelNames, function(modelName) {
        return app.Models[modelName].destroy(null, {truncate: true});
      }).then(function() {
        res.send(200);
      })
      .catch(next);
    },

    create: function(req, res, next) {
      W.map(req.body, function(modelData) {
        return app.Models[req.params.model].create(modelData);
      }).then(function(newModels) {
        res.send(200, _.pluck(newModels, 'dataValues'));
      })
      .catch(next);
    }
  };
};
