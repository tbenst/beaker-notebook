var _ = require("lodash");

module.exports = function(app) {
  return {
    index: function(req, res, next) {
      res.json(req.user.getRecentNotebooks());
    }
  }
}
