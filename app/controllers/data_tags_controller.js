module.exports = function(app) {
  var DataTag  = app.Models.DataTag;

  return {
    index: function(req, res, next) {
      DataTag.findAll().then(function(datatags) {
        res.json(datatags);
      }).catch(next);
    }
  }
}
