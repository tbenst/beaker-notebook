module.exports = function(app) {
  var PublicationCategory = app.Models.PublicationCategory;

  return {
    categoryIdParam: function(req, res, next, id) {
      PublicationCategory.forge({id: id})
      .fetch()
      .then(function(record) {
        if (!record) throw new Error('Publication Category not found ');
        req.category = record
      })
      .done(next, next);
    },
    index: function(req, res, next) {
      PublicationCategory.fetchAll()
      .then(res.json.bind(res))
      .catch(next);
    },
    get: function(req, res, next) {
      res.json(req.category);
    }
  }
};
