module.exports = function(app) {
  var RatingsController = app.Controllers.RatingsController;

  app.post('/api/ratings', RatingsController.createOrUpdate);
  app.get('/api/ratings/average', RatingsController.average);
  app.get('/api/ratings/user_rating', RatingsController.userRating);
};
