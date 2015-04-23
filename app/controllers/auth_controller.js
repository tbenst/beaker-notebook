var _ = require('lodash');
var PasswordResetException = require('../lib/password_reset_exception');
var RecordNotUniqueError = require('../lib/record_not_unique_error');

module.exports = function(app) {
  var User = app.Models.User;
  var FPR  = app.Models.ForgotPasswordRequests;

  return {
    authorize: function(req, res, next) {
      if (app.shouldSkip(req.path, 'authorize')) {
        next();
      } else if (req.signedCookies.user !== undefined) {
        User.forge({id: req.signedCookies.user})
          .fetch()
          .then(function(user) {
            if (user) {
              req.user = user;
            } else {
              res.statusCode = 403;
            }
          })
          .done(next, next);
      } else {
        res.send(403);
      }
    },

    forgotPassword: function(req, res, next) {
      FPR.sendRequest(req.body)
        .then(function() {
          res.status(200).end();
        })
        .catch(function(err) {
          if (err.name == "PasswordResetException") {
            res.status(404).send(err.message);
          } else {
            res.status(500).send(err);
          }
        });
    },

    changePassword: function(req, res, next) {
      User.changePassword(req.body)
        .then(function() {
          res.status(200).end();
        })
        .catch(function(err) {
          if (err.name == "PasswordResetException"){
            res.status(403).send(err.message);
          } else {
            res.status(500).send(err.message);
          }
        });
    }
  }
}
