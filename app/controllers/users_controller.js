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
    },

    addRecentNotebook: function(req, res, next) {
      req.user.addRecentNotebook(req.body.viewing).then(function(){
        res.json(_.extend(req.user.attributes, {
          // normalize recentNotebooks
          recentNotebooks: req.user.getRecentNotebooks()
        }));
      }).catch(next);
    },

    getRecentNotebooks: function(req, res, next) {
      res.json(req.user.getRecentNotebooks());
    }
  }
}
