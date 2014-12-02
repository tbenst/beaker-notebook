var _ = require('lodash');
var PasswordResetException = require('../lib/password_reset_exception');

module.exports = function(app) {
  var User = app.Models.User;
  var FPR  = app.Models.ForgotPasswordRequests;

  return {
    authenticate: function (req, res, next) {
      User.signIn(req.body)
        .then(function(user) {
          if(user) {
            req.session.user = user.id;
            res.json(user);
          } else {
            res.statusCode = 403;
          }
        })
        .catch(next);
    },

    authorize: function(req, res, next) {
      if (app.shouldSkip(req.path, 'authorize')) {
        next();
      } else if (req.session.user !== undefined) {
        User.forge({id: req.session.user})
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

    signUp: function(req, res, next) {
      User.signUp(req.body)
        .then(function(user) {
          if(user) {
            req.session.user = user.id;
            res.json(user);
          } else {
            res.statusCode = 422;
          }
        })
        .catch(next);
    },

    forgotPassword: function(req, res, next) {
      FPR.sendRequest(req.body)
        .then(function() {
          res.status(200).end();
        })
        .catch(function(err) {
          if (err instanceof PasswordResetException) {
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
          if (err instanceof PasswordResetException){
            res.status(403).send(err.message);
          } else {
            res.status(500).send(err.message);
          }
        });
    },

    signOut: function(req, res, next) {
      req.session = null;
      res.status(200).end();
    }
  }
}
