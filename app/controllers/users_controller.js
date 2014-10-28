var _ = require("lodash");

module.exports = function(app) {
  return {
    subscribe: function(req, res, next) {
      req.user.addSubscription(req.params.index, req.params.data_set_id)
        .then(function() {
          res.json(req.user);
        }).catch(next);
    },

    unsubscribe: function(req, res, next) {
      req.user.removeSubscription(req.params.index, req.params.data_set_id)
        .then(function() {
          res.json(req.user);
        }).catch(next);
    },

    get: function (req, res, next) {
      res.json(app.Models.User.sanitize(req.user))
    },

    update: function (req, res, next) {
      var attrs = _.pick(req.body, 'name', 'email', 'currentPassword', 'newPassword');
      req.user.update(attrs)
        .then(function (user) {
          res.json(user);
        })
        .catch(function (err) {
          var statusCode = 500;
          if (err.errors && err.errors.email) {
            err.message = err.errors.email.message;
            statusCode = 422;
          } else if (err.message == 'Wrong Password') {
            statusCode = 422;
          }
          res.status(statusCode).send(err.message);
        });
    }
  }
}
