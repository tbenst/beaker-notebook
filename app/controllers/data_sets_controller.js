var _  = require('lodash');

module.exports = function(app) {

  var DataSet = app.Models.DataSet,
      Category = app.Models.Category;

  function getOptions(req) {
    return _.defaults({
        offset: req.query.offset,
        limit: req.query.limit
      },{
        offset: 0,
        limit: 10
      });
  };

  return {
    idParam: function(req, res, next, id) {
      DataSet.find({
        where: {id: req.params.data_set_id},
        include: [{model: Category, as: 'categories'}]
      })
        .then(function(dataSet) {
          if (!dataSet) throw new Error('DataSet not found');
          req.dataSet = dataSet;
        })
        .done(next, next);
    },

    index: function(req, res, next) {
      DataSet.findMatching(req.query, getOptions(req)).then(function(dataSets) {
        res.json(dataSets);
      }).catch(next);
    },

    create: function(req, res, next) {
      DataSet.create({title: req.params.title})
        .then(function(dataSet) {
          res.json(dataSet);
        })
        .catch(next);
    },

    get: function(req, res, next) {
      req.dataSet.getUsers().then(function(users) {
        req.dataSet['dataValues'].users = users;
        res.json(req.dataSet);
      }).catch(next);
    },

    update: function(req, res, next) {
      req.dataSet.updateAttributes(req.body, ['title', 'vendor', 'description', 'url'])
        .then(function(dataSet) {
          res.json(dataSet);
        })
        .catch(next);
    },

    destroy: function(req, res, next) {
      req.dataSet.destroy()
        .then(function() {
          res.json(dataSet);
        })
        .catch(next);
    }
  };
};
