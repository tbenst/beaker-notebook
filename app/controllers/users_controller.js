var _ = require("lodash");

module.exports = function(app) {
  return {
    subscribe: function(req, res, next) {
      req.user.addSubscription(req.dataSet).then(function(){
        res.json(req.user);
      }).catch(next);
    },

    unsubscribe: function(req, res, next) {
      req.user.removeSubscription(req.dataSet).then(function(){
        res.json(req.user);
      }).catch(next);
    }
  }
}
