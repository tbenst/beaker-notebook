module.exports = function(app) {
  var PublicationCategory = app.Models.PublicationCategory;

  return {
    index: function(req, res, next) {
      PublicationCategory.fetchAll()
      .then(res.json.bind(res))
      .catch(next);
    }
  }
};
