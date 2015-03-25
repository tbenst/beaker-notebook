var _ = require('lodash');
var PasswordResetException = require('../lib/password_reset_exception');
var RecordNotUniqueError = require('../lib/record_not_unique_error');

module.exports = function(app) {
  var User = app.Models.User;
  var FPR  = app.Models.ForgotPasswordRequests;

  function sendUser(res, user, expDate) {
    var defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 31);

    // composite session store with for the user id and the user role
    // allowing for all of the services to access this info with the shared secret.
    res.cookie('session', {id: user.id, role: user.get('role')}, {signed: true, expires: expDate||defaultDate});

    //TODO remove the user cookie
    res.cookie('user', user.id, {signed: true, expires: expDate||defaultDate});
    res.cookie('beakerauth', user.get('beakerPassword'), {expires: defaultDate});
    res.json(user);
  }

  return {
    setUserCookie: sendUser,
    authenticate: function (req, res, next) {
     User.signIn(req.body)
        .then(function(user) {
          return user.getOrCreateBeakerToken()
          .then(function() {
            if(user) {
              sendUser(res, user);
            } else {
              res.statusCode = 403;
            }
          })
        })
        .catch(next);
    },

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
        res.clearCookie('user');
        res.send(403);
      }
    },

    signUp: function(req, res, next) {
      var expDate = new Date();
      expDate.setDate(expDate.getDate() + 31);

      User.forge(_.pick(req.body, 'name', 'email', 'password'))
      .save()
      .then(function(user) {
        return user.getOrCreateBeakerToken()
        .then(function() {
          if(user) {
            sendUser(res, user, expDate);
          }
        })
      })
      .catch(function(err) {
        if (err.name == "RecordNotUniqueError") {
          return res.status(409).send(err);
        }

        next(err);
      });
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
    },

    signOut: function(req, res, next) {
      res.clearCookie('user');
      res.status(200).end();
    }
  }
}
