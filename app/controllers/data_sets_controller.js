var _  = require('lodash');
var url = require('url');
var Qs = require('qs');

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
    index: function(req, res, next) {
      var urlParts = url.parse(req.url, true);
      params = Qs.parse(urlParts.query);
      DataSet.findMatching(params, getOptions(req)).then(function(dataSets) {
        res.json(dataSets);
      }).catch(next);
    },

    get: function(req, res, next) {
      new DataSet({id: req.params.data_set_id})
      .fetchFromElastic()
      .then(res.json.bind(res))
      .catch(next);
    }
  };
};
