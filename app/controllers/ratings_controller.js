var _ = require('lodash');

module.exports = function(app) {
  var Rating = app.Models.Rating;

  return {
    createOrUpdate: function(req, res, next) {
      var rating = Rating.forge({
        userId: req.user.id,
        rateableId: req.body.rateableId
      });

      rating
      .fetch()
      .then(function(extantRating) {
        if (extantRating) {
          var r = extantRating.save({score: req.body.score}, {patch: true});
        } else {
          var r = rating.save({score: req.body.score});
        }
        r.then(res.json.bind(res));
      })
      .catch(next);
    },

    average: function(req, res, next) {
      Rating.getAverage(req.query)
      .then(res.json.bind(res))
      .catch(next);
    },

    userRating: function(req, res, next) {
      Rating.forge({
        user_id: req.user.id,
        rateable_id: req.query.rateableId
      })
      .fetch()
      .then(function(rating) {
        res.json(rating ? rating.get('score') : 0);
      })
      .catch(next);
    }
  };
};
