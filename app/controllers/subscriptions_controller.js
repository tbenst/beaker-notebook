module.exports = function(app) {
  var Subscription = app.Models.Subscription;

  return {
    index: function(req, res, next) {
      req.user.subscriptions()
      .fetch({ withRelated: 'dataSet' })
      .then(res.json.bind(res))
      .catch(next);
    },
  };
};
