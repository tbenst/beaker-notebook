module.exports = function(app) {
  var Subscription = app.Models.Subscription;

  return {
    index: function(req, res, next) {
      req.user.subscriptionsWithDatasets()
      .then(res.json.bind(res))
      .catch(next);
    },
  };
};
