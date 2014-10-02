var _ = require("lodash");

module.exports = function(app) {
  return {
    subscribe: function(req, res, next) {
      req.user.addSubscription(req.params.data_set_id).then(function(){
        res.json(req.user);
      }).catch(next);
    },

    unsubscribe: function(req, res, next) {
      req.user.removeSubscription(req.params.data_set_id).then(function(){
        res.json(req.user);
      }).catch(next);
    }
  }
}
