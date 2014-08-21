var _  = require('lodash');

module.exports = function(app) {
  var DataSet = app.Models.DataSet,
      Category = app.Models.Category,
      DataPreview = app.Models.DataPreview,
      DataTag = app.Models.DataTag;

  function getOptions(req) {
    return _.defaults({
        from: req.query.offset,
        size: req.query.limit
      },{
        from: 0,
        size: 10
      });
  };

  return {
    idParam: function(req, res, next, id) {
      new DataSet({id: req.params.data_set_id})
        .fetch({withRelated: ['categories', 'dataPreviews', 'dataTags']})
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
      new DataSet({title: req.params.title}).save()
        .then(function(dataSet) {
          res.json(dataSet);
        })
        .catch(next);
    },

    get: function(req, res, next) {
      req.dataSet.load('users')
        .then(function(dataSet) {
          return dataSet.withRelated();
        })
        .then(res.json.bind(res))
        .catch(next);
    },

    update: function(req, res, next) {
      req.dataSet.save(_.pick(req.body, 'title', 'vendor', 'description', 'url'), {patch: true})
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
