var _ = require('lodash');

module.exports = function(app) {
  var DataSet = app.Models.DataSet,
      Rating = app.Models.Rating;

  return {
    authorize: function(req, res, next) {
      var rateableIdArr = req.body.rateableId.split('-');

      if (rateableIdArr[0] !== 'data_sets') return next();
      return new DataSet({index: rateableIdArr[1], id: rateableIdArr[2]})
      .fetchFromElastic()
      .then(function(d) {
        if ( !_.contains(d.subscriberIds, req.user.id)) return res.send(403);
        next();
      })
      .catch(next);
    },

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
