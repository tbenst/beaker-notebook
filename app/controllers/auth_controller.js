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
      } else if (req.signedCookies.session && req.signedCookies.session.id !== undefined) {
        req.user = new User(_.pick(req.signedCookies.session, 'id', 'role'));
        next();
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
