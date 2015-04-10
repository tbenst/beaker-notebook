var _  = require('lodash');
var url = require('url');
var Qs = require('qs');

module.exports = function(app) {
  var DataSet = app.Models.DataSet;
  var Category = app.Models.Category;
  var DataPreview = app.Models.DataPreview;
  var DataTag = app.Models.DataTag;

  function getOptions(req) {
    return _.defaults({
        from: req.query.offset,
        size: req.query.limit
      }, {
        from: 0,
        size: 10
      });
  }

  return {
    index: function(req, res, next) {
      var urlParts = url.parse(req.url, true);
      params = Qs.parse(urlParts.query);

      DataSet.findMatching(params, getOptions(req))
      .then(res.json.bind(res))
      .catch(next);
    },

    get: function(req, res, next) {
      new DataSet({index: req.params.index, id: req.params.data_set_id})
      .fetchFromElastic()
      .then(res.json.bind(res))
      .catch(next);
    }
  };
};
