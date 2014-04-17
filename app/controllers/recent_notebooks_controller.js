var _ = require("lodash");

module.exports = function(app) {
  return {
    create: function(req, res, next) {
      req.user.addRecentNotebook(req.body.viewing).then(function(){
        res.json(_.extend(req.user.attributes, {
          // normalize recentNotebooks
          recentNotebooks: req.user.getRecentNotebooks()
        }));
      }).catch(next);
    },

    index: function(req, res, next) {
      res.json(req.user.getRecentNotebooks());
    }
  }
}
