var _ = require("lodash");

module.exports = function(app) {
  var userParams = ['name', 'email', 'id'];

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
      res.json(_.pick(req.user.attributes, userParams))
    },

    update: function (req, res, next) {
      var attrs = _(req.body)
        .pick(userParams.concat('currentPassword', 'newPassword'))
        .omit('id')
        .value();

      req.user.update(attrs)
        .then(function (user) {
          res.json(_.pick(user.attributes, userParams));
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
