var _  = require('lodash');

module.exports = function(app) {

  var DataSet = app.Models.DataSet,
      Category = app.Models.Category,
      DataPreview = app.Models.DataPreview,
      DataTag = app.Models.DataTag;

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
        include: [
          {model: Category, as: 'categories'},
          {model: DataPreview, as: 'DataPreviews'},
          {model: DataTag, as: "DataTags"
        ]
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

    formatIndex: function(req, res, next) {
      DataSet.findAll({
        attributes: [DataSet.sequelize.fn('DISTINCT', DataSet.sequelize.col('format'))],
        order: 'format ASC'
      }).then(function(formats) {
        res.json(_.pluck(formats, "format"));
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
