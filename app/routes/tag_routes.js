module.exports = function(app) {
  var DataTags = app.Controllers.DataTagsController;

  app.get('/api/data_tags', DataTags.index);
};
