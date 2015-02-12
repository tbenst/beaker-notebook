var _ = require('lodash');

module.exports = function(req, res, next) {
  if(!req.user.isAdmin()) {
    res.status(403).send('You do not have permission');
  } else {
    next();
  }
};
