var _ = require('lodash');

module.exports = function(app) {
  var User = app.Models.User;

  return {
    authenticate: function (req, res, next) {
      // This a temporary sign up solution meant to be reverted
      // when the real sign up page is added
      User.findOrCreate(req.body)
        .then(function(user) {
          var u = _.pick(user.attributes, 'id', 'name', 'email');
          res.json(_.extend(u, {token: user.id}));
        })
        .catch(next);
    },

    authorize: function(req, res, next) {
      if (req.path === '/api/authenticate' || req.path === '/api/sign_up' || req.path.indexOf("seed/") !== -1) {
        next();
      } else {
        new User({id: req.get('Authorization')})
          .fetch()
          .then(function(user) {
            if (user) {
              req.user = user;
            } else {
              res.statusCode = 403;
            }
          })
          .done(next, next);
      }
    },

    signUp: function(req, res, next) {
      User.signUp(req.body)
        .then(function(user) {
          if(user) {
            var u = _.pick(user.attributes, 'id', 'name', 'email');
            res.json(_.extend(u, {token: user.id}));
          } else {
            res.statusCode = 422;
          }
        })
        .catch(next);
    }
  }
}
